import { observer } from "mobx-react";
import React, { FC } from "react";
import styled from "styled-components";
import { useStores } from "../../store";
import { IBookmark } from "../../store/bookmark.store";
import Thumbnail from "./Thumbnail";

const Container = styled.div`
    flex: 1;
    background-color: ${(props) => props.theme.color.background.void};
    overflow: hidden;
    display: grid;
    grid-template-columns: repeat(auto-fit, 250px);
    grid-gap: 10px;
    align-content: start;
    justify-content: center;
    overflow-y: auto;
    padding: 10px;
`;

interface IThumbnailsProps {
    bookmarks: IBookmark[];
}

const Thumbnails: FC<IThumbnailsProps> = ({ bookmarks }) => {
    const { bookmarkStore } = useStores();
    return (
        <Container id="bookmarks-container-thumbnails">
            {bookmarks?.map((bookmark) => (
                <Thumbnail bookmark={bookmark} key={bookmark.id} />
            ))}
        </Container>
    );
};

export default observer(Thumbnails);
