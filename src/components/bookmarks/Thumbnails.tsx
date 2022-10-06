import { observer } from "mobx-react";
import React, { FC } from "react";
import styled from "styled-components";
import { useStores } from "../../store";
import { IBookmark } from "../../store/bookmark.store";
import Url from "../Url";
import PreviewImg from "./PreviewImg";
import Tag from "./Tag";

const Container = styled.div`
    flex: 1;
    background-color: ${(props) => props.theme.color.background.void};
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
    padding: 10px;
`;

const Bookmark = styled.div<{ active: boolean }>`
    border: 1px solid ${(props) => props.theme.color.background.border};
    padding: 5px;
    border-radius: 5px;
    background-color: ${(props) =>
        props.active ? props.theme.color.accent.secondary : props.theme.color.background.surface};
    cursor: pointer;
    width: 250px;
    height: 500px;
    overflow: hidden;
    margin: 0 10px 10px 0;
`;

interface IThumbnailsProps {
    bookmarks: IBookmark[];
}

const Thumbnails: FC<IThumbnailsProps> = ({ bookmarks }) => {
    const { bookmarkStore } = useStores();
    return (
        <Container id="bookmarks-container-thumbnails">
            {bookmarks?.map((bookmark) => (
                <Bookmark
                    key={bookmark.id}
                    onClick={() => bookmarkStore.setActiveBookmark(bookmark.id)}
                    active={bookmarkStore.activeBookmark === bookmark.id}
                    onDoubleClick={() => window.open(bookmark.url, "_blank")}
                >
                    <PreviewImg imgUrl={bookmark.image} style={{ marginBottom: 10 }} />
                    <b className="bookmark-name">{bookmark.name}</b>
                    <p className="bookmark-description">{bookmark.description}</p>
                    <Url url={bookmark.url} />
                    <div className="bookmark-tags">
                        {bookmark.tags.map((tag, i) => (
                            <Tag key={`${i}-${tag}`} name={tag} />
                        ))}
                    </div>
                </Bookmark>
            ))}
        </Container>
    );
};

export default observer(Thumbnails);
