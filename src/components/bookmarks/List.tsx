import { observer } from "mobx-react";
import React, { FC } from "react";
import styled from "styled-components";
import { useStores } from "../../store";
import { IBookmark } from "../../store/bookmark.store";
import Button from "../Button";
import Favicon from "./Favicon";
import Tag from "./Tag";
import { darken } from "polished";

const Container = styled.div`
    flex: 1;
    background-color: ${(props) => props.theme.color.background.void};
    overflow: auto;
`;

const Bookmark = styled.div<{ active: boolean }>`
    border-bottom: 1px solid ${(props) => darken(0.05, props.theme.color.background.void)};
    padding: 5px;
    background-color: ${(props) => (props.active ? props.theme.color.accent.secondary : "transparent")};
    &:hover {
        background-color: ${(props) =>
            props.active ? props.theme.color.accent.secondary : props.theme.color.background.hover.void};
    }
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
                    <Favicon url={bookmark.favicon} />
                    <div className="bookmark-name">{bookmark.name}</div>
                    <div className="bookmark-url">{bookmark.url}</div>
                    <div className="bookmark-tags">
                        {bookmark.tags.map((tag, i) => (
                            <Tag key={`${i}-${tag}`} name={tag} />
                        ))}
                    </div>
                    <Button
                        symbol="arrow_forward"
                        onClick={() => window.open(bookmark.url, "_blank")}
                        id="open-bookmark-button"
                    />
                </Bookmark>
            ))}
        </Container>
    );
};

export default observer(List);
