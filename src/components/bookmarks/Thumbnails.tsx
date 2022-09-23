import { observer } from "mobx-react";
import React, { FC } from "react";
import styled from "styled-components";
import { useStores } from "../../store";
import { IBookmark } from "../../store/bookmark.store";

const Container = styled.div`
    flex: 1;
    background-color: whitesmoke;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
    padding: 10px;
`;

const Bookmark = styled.div<{ active: boolean }>`
    border: 1px solid silver;
    padding: 5px;
    background-color: ${(props) => (props.active ? "silver" : "white")};
    cursor: pointer;
    width: 250px;
    height: 500px;
    overflow: hidden;
    margin: 0 10px 10px 0;
    & > .bookmark-name {
        flex: 1;
        margin-right: 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    & > .bookmark-url {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    & > .bookmark-tags {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    & > img {
        width: 100%;
    }
`;

const Tag = styled.label`
    margin-left: 5px;
    padding: 2px 5px;
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
                    <img src={bookmark.image} alt="preview" style={{ marginRight: 5 }} />
                    <img src={bookmark.favicon} alt="preview" style={{ marginRight: 5, width: 20 }} />
                    <b className="bookmark-name">{bookmark.name}</b>
                    <p className="bookmark-description">{bookmark.description}</p>
                    <div className="bookmark-url">{bookmark.url}</div>
                    <div className="bookmark-tags">
                        {bookmark.tags.map((tag, i) => (
                            <Tag key={`${i}-${tag}`}>#{tag}</Tag>
                        ))}
                    </div>
                </Bookmark>
            ))}
        </Container>
    );
};

export default observer(Thumbnails);
