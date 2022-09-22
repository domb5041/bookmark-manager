import { observer } from "mobx-react";
import React, { FC } from "react";
import styled from "styled-components";
import { useStores } from "../../store";
import { IBookmark } from "../../store/bookmark.store";

const Container = styled.div`
    flex: 1;
    background-color: whitesmoke;
    overflow: hidden;
`;

const Bookmark = styled.div<{ active: boolean }>`
    border-bottom: 1px solid silver;
    padding: 5px;
    background-color: ${(props) => (props.active ? "silver" : "transparent")};
    cursor: pointer;
    display: flex;
    align-items: center;
    overflow: hidden;
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
`;

const Tag = styled.label`
    margin-left: 5px;
    padding: 2px 5px;
`;

interface IListProps {
    bookmarks: IBookmark[] | null;
}

const List: FC<IListProps> = ({ bookmarks }) => {
    const { bookmarkStore } = useStores();
    return (
        <Container id="bookmarks-container-list">
            {bookmarks?.map((bookmark) => (
                <Bookmark
                    id={`bookmark-${bookmark.id}`}
                    key={bookmark.id}
                    onClick={() => bookmarkStore.setActiveBookmark(bookmark.id)}
                    active={bookmarkStore.activeBookmark === bookmark.id}
                    onDoubleClick={() => window.open(bookmark.url, "_blank")}
                >
                    <img
                        src={bookmark.url && `https://s2.googleusercontent.com/s2/favicons?domain_url=${bookmark.url}`}
                        alt="favicon"
                        style={{ marginRight: 5 }}
                    />
                    <div className="bookmark-name">{bookmark.name}</div>
                    <div className="bookmark-url">{bookmark.url}</div>
                    <div className="bookmark-tags">
                        {bookmark.tags.map((tag, i) => (
                            <Tag key={`${i}-${tag}`}>#{tag}</Tag>
                        ))}
                    </div>
                    <button onClick={() => window.open(bookmark.url, "_blank")}>open</button>
                </Bookmark>
            ))}
        </Container>
    );
};

export default observer(List);
