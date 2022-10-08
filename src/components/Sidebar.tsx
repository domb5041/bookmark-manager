import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useStores } from "../store";
import { observer } from "mobx-react";
import Button from "./Button";
import EditTag from "./EditTag";
import DeleteTag from "./DeleteTag";
import { CSSTransition } from "react-transition-group";
import { addDoc, doc, writeBatch } from "@firebase/firestore";
import { db } from "../firebase-config";
import { tagsCollectionRef } from "../App";
import SidebarRow from "./SidebarRow";
import { tagColors } from "../theme";

const Container = styled.div`
    width: 250px;
    border-right: 1px solid ${(props) => props.theme.color.background.border};
    background-color: ${(props) => props.theme.color.background.surface};
    flex-shrink: 0;
    overflow: hidden;
    &.sidebar-enter {
        width: 0;
    }
    &.sidebar-enter-active {
        width: 250px;
        transition: 0.5s;
    }
    &.sidebar-exit {
        width: 250px;
    }
    &.sidebar-exit-active {
        width: 0;
        transition: 0.5s;
    }
`;

const Toolbar = styled.div`
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    border-bottom: 1px solid ${(props) => props.theme.color.background.border};
    margin-bottom: 5px;
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
                        color: tagColors[0],
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
        <CSSTransition nodeRef={nodeRef} in={tagStore.sidebarVisible} unmountOnExit timeout={500} classNames="sidebar">
            <Container id="sidebar" ref={nodeRef}>
                <Toolbar>
                    <Button
                        symbol="tag"
                        onClick={tagStore.showEditTagDialog}
                        disabled={noTagSelected}
                        id="edit-tag-button"
                        style={{ marginRight: 10 }}
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
                <SidebarRow
                    active={allItemsSelected}
                    name="All Items"
                    count={tagStore.allItemsFilter.count}
                    onClick={() => tagStore.setActiveFilter(tagStore.allItemsFilter)}
                />
                <SidebarRow
                    active={taggedSelected}
                    onClick={() => tagStore.setActiveFilter(tagStore.taggedItemsFilter)}
                    name="Tagged"
                    count={tagStore.taggedItemsFilter.count}
                />
                <SidebarRow
                    active={untaggedSelected}
                    onClick={() => tagStore.setActiveFilter(tagStore.untaggedItemsFilter)}
                    name="Untagged"
                    count={tagStore.untaggedItemsFilter.count}
                    style={{ marginBottom: 10 }}
                />
                {tagStore.tagSet.map((tag, i) => (
                    <SidebarRow
                        color={tag.color}
                        icon={tag.icon}
                        active={tagStore.activeFilter.name === tag.name}
                        onClick={() => tagStore.setActiveFilter(tag)}
                        key={`${i}-${tag.name}`}
                        name={tag.name}
                        count={tag.count}
                    />
                ))}
            </Container>
        </CSSTransition>
    );
};

export default observer(Sidebar);
