import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useStores } from "../store";
import { observer } from "mobx-react";
import Button from "./Button";
import RenameTag from "./RenameTag";
import DeleteTag from "./DeleteTag";
import { CSSTransition } from "react-transition-group";
import Symbol from "./Symbol";
import { addDoc, doc, writeBatch } from "@firebase/firestore";
import { db } from "../firebase-config";
import { tagsCollectionRef } from "../App";

const Container = styled.div`
    width: 250px;
    border-right: 1px solid silver;
    background-color: whitesmoke;
    flex-shrink: 0;
    &.dialog-container-enter {
        width: 0;
    }
    &.dialog-container-enter-active {
        width: 250px;
        transition: 0.5s;
    }
    &.dialog-container-exit {
        width: 250px;
    }
    &.dialog-container-exit-active {
        width: 0;
        transition: 0.5s;
    }
`;

const SidebarTag = styled.div<{ active: boolean }>`
    padding: 3px 10px;
    cursor: pointer;
    background-color: ${(props) => (props.active ? "silver" : "transparent")};
    white-space: nowrap;
    display: flex;
    align-items: center;
    & .tag-name {
        flex: 1;
        padding-left: 5px;
    }
`;

const Toolbar = styled.div`
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 10px;
`;

const Sidebar = () => {
    const { bookmarkStore } = useStores();

    useEffect(() => {
        bookmarkStore.updateTotalsCounts();
    }, [bookmarkStore.bookmarks, bookmarkStore]);

    const batch = writeBatch(db);

    useEffect(() => {
        const syncTags = async () => {
            const flattenedTags = bookmarkStore.bookmarks.map((b) => b.tags).flat();
            const bookmarkTagSet = [...new Set(flattenedTags)];
            bookmarkTagSet.forEach(async (bookmarkTag) => {
                const tagExists = bookmarkStore.tagSet.findIndex((tag) => tag.name === bookmarkTag) > -1;
                if (!tagExists) {
                    await addDoc(tagsCollectionRef, {
                        name: bookmarkTag,
                        icon: "tag",
                        color: "grey",
                        count: 1
                    });
                }
            });
            bookmarkStore.tagSet.forEach((tag) => {
                const tagDoc = doc(db, "tags", tag.id);
                const count = bookmarkStore.getCount(tag.name);
                if (count > 0) {
                    batch.update(tagDoc, { count: count });
                } else {
                    batch.delete(tagDoc);
                }
            });
            await batch.commit();
        };
        syncTags();
    }, [bookmarkStore.bookmarks, bookmarkStore]);

    const noTagSelected =
        bookmarkStore.activeFilter === bookmarkStore.allItemsFilter ||
        bookmarkStore.activeFilter === bookmarkStore.taggedItemsFilter ||
        bookmarkStore.activeFilter === bookmarkStore.untaggedItemsFilter;

    const nodeRef = useRef(null);

    return (
        <CSSTransition
            nodeRef={nodeRef}
            in={bookmarkStore.sidebarVisible}
            unmountOnExit
            timeout={500}
            classNames="dialog-container"
        >
            <Container id="sidebar" ref={nodeRef}>
                <Toolbar>
                    <Button
                        symbol="tag"
                        onClick={bookmarkStore.showRenameTagDialog}
                        disabled={noTagSelected}
                        id="edit-tag-button"
                    />
                    <Button
                        symbol="delete"
                        onClick={bookmarkStore.showDeleteTagDialog}
                        disabled={noTagSelected}
                        id="delete-tag-button"
                    />
                </Toolbar>
                <RenameTag />
                <DeleteTag />
                <SidebarTag
                    active={bookmarkStore.activeFilter === bookmarkStore.allItemsFilter}
                    onClick={() => bookmarkStore.setActiveFilter(bookmarkStore.allItemsFilter)}
                >
                    <Symbol name="tag" color="grey" />
                    <div className="tag-name">All Items</div>
                    <div className="tag-count">({bookmarkStore.allItemsCount})</div>
                </SidebarTag>
                <SidebarTag
                    active={bookmarkStore.activeFilter === bookmarkStore.taggedItemsFilter}
                    onClick={() => bookmarkStore.setActiveFilter(bookmarkStore.taggedItemsFilter)}
                >
                    <Symbol name="tag" color="grey" />
                    <div className="tag-name">Tagged</div>{" "}
                    <div className="tag-count">({bookmarkStore.taggedItemsCount})</div>
                </SidebarTag>
                <SidebarTag
                    active={bookmarkStore.activeFilter === bookmarkStore.untaggedItemsFilter}
                    onClick={() => bookmarkStore.setActiveFilter(bookmarkStore.untaggedItemsFilter)}
                    style={{ marginBottom: 10 }}
                >
                    <Symbol name="tag" color="grey" />
                    <div className="tag-name">Untagged</div>{" "}
                    <div className="tag-count">({bookmarkStore.untaggedItemsCount})</div>
                </SidebarTag>
                {bookmarkStore.tagSet.map((tag, i) => (
                    <SidebarTag
                        active={bookmarkStore.activeFilter === tag.name}
                        onClick={() => bookmarkStore.setActiveFilter(tag.name)}
                        key={`${i}-${tag.name}`}
                    >
                        <Symbol name={tag.icon} color={tag.color} />
                        <div className="tag-name">{tag.name}</div>
                        <div className="tag-count">({tag.count})</div>
                    </SidebarTag>
                ))}
            </Container>
        </CSSTransition>
    );
};

export default observer(Sidebar);
