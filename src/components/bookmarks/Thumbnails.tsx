import { observer } from "mobx-react";
import React, { FC } from "react";
import Masonry from "react-masonry-css";
import styled from "styled-components";
import { IBookmark } from "../../store/bookmark.store";
import Thumbnail from "./Thumbnail";
import ScrollContainer from "../common/ScrollContainer";

const Container = styled(ScrollContainer)`
    padding: 5px 0 0 30px;
    & .my-masonry-grid {
        display: -webkit-box; /* Not needed if autoprefixing */
        display: -ms-flexbox; /* Not needed if autoprefixing */
        display: flex;
        width: auto;
    }
    & .my-masonry-grid_column {
        background-clip: padding-box;
    }
`;

interface IThumbnailsProps {
    bookmarks: IBookmark[];
}

const Thumbnails: FC<IThumbnailsProps> = ({ bookmarks }) => {
    const columns = {
        default: 5,
        2000: 4,
        1600: 3,
        1300: 2,
        1000: 1
    };

    return (
        <Container id="bookmarks-container-thumbnails">
            <Masonry breakpointCols={columns} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
                {bookmarks?.map((bookmark, i) => (
                    <Thumbnail bookmark={bookmark} key={bookmark.id} index={i} />
                ))}
            </Masonry>
        </Container>
    );
};

export default observer(Thumbnails);
