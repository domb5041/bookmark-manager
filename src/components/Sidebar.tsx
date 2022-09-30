import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useStores } from "../store";
import { observer } from "mobx-react";
import Button from "./Button";
import RenameTag from "./RenameTag";
import DeleteTag from "./DeleteTag";
import { CSSTransition } from "react-transition-group";

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
        bookmarkStore.getTagsAndCounts();
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
                    All Items ({bookmarkStore.allItemsCount})
                </SidebarTag>
                <SidebarTag
                    active={bookmarkStore.activeFilter === bookmarkStore.taggedItemsFilter}
                    onClick={() => bookmarkStore.setActiveFilter(bookmarkStore.taggedItemsFilter)}
                >
                    Tagged ({bookmarkStore.taggedItemsCount})
                </SidebarTag>
                <SidebarTag
                    active={bookmarkStore.activeFilter === bookmarkStore.untaggedItemsFilter}
                    onClick={() => bookmarkStore.setActiveFilter(bookmarkStore.untaggedItemsFilter)}
                    style={{ marginBottom: 10 }}
                >
                    Untagged ({bookmarkStore.untaggedItemsCount})
                </SidebarTag>
                {bookmarkStore.tags.map((tag, i) => (
                    <SidebarTag
                        active={bookmarkStore.activeFilter === tag}
                        onClick={() => bookmarkStore.setActiveFilter(tag)}
                        key={`${i}-${tag}`}
                    >
                        #{tag} ({bookmarkStore.tagCounts[i]})
                    </SidebarTag>
                ))}
            </Container>
        </CSSTransition>
    );
};

export default observer(Sidebar);
