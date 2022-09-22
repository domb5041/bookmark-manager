import React from "react";
import styled from "styled-components";
import { useStores } from "../store";
import { observer } from "mobx-react";

const Container = styled.div`
    height: 50px;
    border-bottom: 1px solid silver;
    background-color: whitesmoke;
    display: flex;
    align-items: center;
    padding: 0 10px;
`;

const Toolbar = () => {
    const { bookmarkStore } = useStores();
    return (
        <Container id="toolbar">
            <button onClick={bookmarkStore.showEditTagsDialog} disabled={bookmarkStore.activeBookmark === ""}>
                #
            </button>
            <button onClick={bookmarkStore.setExplorerTypeList}>list</button>
            <button onClick={bookmarkStore.setExplorerTypeThumbnails}>thumbnails</button>
            <button onClick={bookmarkStore.showAddBookmarkDialog}>+</button>
            <button onClick={bookmarkStore.showDeleteBookmarkDialog} disabled={bookmarkStore.activeBookmark === ""}>
                delete
            </button>
        </Container>
    );
};

export default observer(Toolbar);
