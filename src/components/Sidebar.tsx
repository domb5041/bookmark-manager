import React, { useEffect } from "react";
import styled from "styled-components";
import { useStores } from "../store";
import { observer } from "mobx-react";
import Button from "./Button";
import RenameTag from "./RenameTag";
import DeleteTag from "./DeleteTag";

const Container = styled.div`
    width: 250px;
    border-right: 1px solid silver;
    background-color: whitesmoke;
    flex-shrink: 0;
`;

const SidebarTag = styled.div<{ active: boolean }>`
    padding: 3px 10px;
    cursor: pointer;
    background-color: ${(props) => (props.active ? "silver" : "transparent")};
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
        bookmarkStore.getTags();
    }, [bookmarkStore.bookmarks]);

    const noTagSelected =
        bookmarkStore.activeFilter === "@all" ||
        bookmarkStore.activeFilter === "@tagged" ||
        bookmarkStore.activeFilter === "@untagged";

    return (
        <Container id="sidebar">
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
                active={bookmarkStore.activeFilter === "@all"}
                onClick={() => bookmarkStore.setActiveFilter("@all")}
            >
                All Items
            </SidebarTag>
            <SidebarTag
                active={bookmarkStore.activeFilter === "@tagged"}
                onClick={() => bookmarkStore.setActiveFilter("@tagged")}
            >
                Tagged
            </SidebarTag>
            <SidebarTag
                active={bookmarkStore.activeFilter === "@untagged"}
                onClick={() => bookmarkStore.setActiveFilter("@untagged")}
                style={{ marginBottom: 10 }}
            >
                Untagged
            </SidebarTag>
            {bookmarkStore.tags.map((tag, i) => (
                <SidebarTag
                    active={bookmarkStore.activeFilter === tag}
                    onClick={() => bookmarkStore.setActiveFilter(tag)}
                    key={`${i}-${tag}`}
                >
                    #{tag}
                </SidebarTag>
            ))}
        </Container>
    );
};

export default observer(Sidebar);
