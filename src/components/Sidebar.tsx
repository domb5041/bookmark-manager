import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useStores } from "../store";
import { observer } from "mobx-react";
import Button from "./Button";
import EditTag from "./EditTag";
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
    const { bookmarkStore, tagStore } = useStores();

    useEffect(() => {
        tagStore.updateTotalsCounts();
    }, [bookmarkStore.bookmarks, bookmarkStore]);

    const batch = writeBatch(db);

    useEffect(() => {
        const syncTags = async () => {
            const flattenedTags = bookmarkStore.bookmarks.map((b) => b.tags).flat();
            const bookmarkTagSet = [...new Set(flattenedTags)];
            bookmarkTagSet.forEach(async (bookmarkTag) => {
                const tagExists = tagStore.tagSet.findIndex((tag) => tag.name === bookmarkTag) > -1;
                if (!tagExists) {
                    await addDoc(tagsCollectionRef, {
                        name: bookmarkTag,
                        icon: "tag",
                        color: "grey",
                        count: 1
                    });
                }
            });
            tagStore.tagSet.forEach((tag) => {
                const tagDoc = doc(db, "tags", tag.id);
                const count = tagStore.getCount(tag.name);
                if (count > 0) {
                    batch.update(tagDoc, { count: count });
                } else {
                    batch.delete(tagDoc);
                }
            });
            await batch.commit();
        };
        syncTags();
    }, [bookmarkStore.bookmarks, bookmarkStore, tagStore]);

    const allItemsSelected = tagStore.activeFilter.name === tagStore.allItemsFilter.name;
    const taggedSelected = tagStore.activeFilter.name === tagStore.taggedItemsFilter.name;
    const untaggedSelected = tagStore.activeFilter.name === tagStore.untaggedItemsFilter.name;
    const noTagSelected = allItemsSelected || taggedSelected || untaggedSelected;

    const nodeRef = useRef(null);

    return (
        <CSSTransition
            nodeRef={nodeRef}
            in={tagStore.sidebarVisible}
            unmountOnExit
            timeout={500}
            classNames="dialog-container"
        >
            <Container id="sidebar" ref={nodeRef}>
                <Toolbar>
                    <Button
                        symbol="tag"
                        onClick={tagStore.showEditTagDialog}
                        disabled={noTagSelected}
                        id="edit-tag-button"
                    />
                    <Button
                        symbol="delete"
                        onClick={tagStore.showDeleteTagDialog}
                        disabled={noTagSelected}
                        id="delete-tag-button"
                    />
                </Toolbar>
                <EditTag />
                <DeleteTag />
                <SidebarTag active={allItemsSelected} onClick={() => tagStore.setActiveFilter(tagStore.allItemsFilter)}>
                    <Symbol name="tag" color="grey" />
                    <div className="tag-name">All Items</div>
                    <div className="tag-count">({tagStore.allItemsFilter.count})</div>
                </SidebarTag>
                <SidebarTag
                    active={taggedSelected}
                    onClick={() => tagStore.setActiveFilter(tagStore.taggedItemsFilter)}
                >
                    <Symbol name="tag" color="grey" />
                    <div className="tag-name">Tagged</div>
                    <div className="tag-count">({tagStore.taggedItemsFilter.count})</div>
                </SidebarTag>
                <SidebarTag
                    active={untaggedSelected}
                    onClick={() => tagStore.setActiveFilter(tagStore.untaggedItemsFilter)}
                    style={{ marginBottom: 10 }}
                >
                    <Symbol name="tag" color="grey" />
                    <div className="tag-name">Untagged</div>
                    <div className="tag-count">({tagStore.untaggedItemsFilter.count})</div>
                </SidebarTag>
                {tagStore.tagSet.map((tag, i) => (
                    <SidebarTag
                        active={tagStore.activeFilter.name === tag.name}
                        onClick={() => tagStore.setActiveFilter(tag)}
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
