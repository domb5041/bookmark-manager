import { observer } from "mobx-react";
import React, { FC } from "react";
import styled from "styled-components";
import { useStores } from "../../store";
import { IBookmark } from "../../store/bookmark.store";
import Button from "../common/buttons/Button";
import Favicon from "./Favicon";
import Tag from "./Tag";
import Url from "../common/Url";

const Container = styled.div`
    flex: 1;
    overflow: auto;
    padding: 5px;
`;

const Bookmark = styled.div<{ active: boolean; highlight: boolean }>`
    padding: 4px 4px 4px 7px;
    margin-bottom: 1px;
    border-radius: 5px;
    background-color: ${(props) =>
        props.active
            ? props.theme.color.accent.secondary
            : props.highlight
            ? props.theme.color.background.highlight
            : "transparent"};
    &:hover {
        background-color: ${(props) =>
            props.active ? props.theme.color.accent.secondary : props.theme.color.background.hover};
        & > .open-bookmark-button {
            opacity: 1;
        }
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
        margin-right: 10px;
    }
    & > .bookmark-tags {
        display: flex;
        flex: 1;
        overflow: hidden;
        margin-right: 10px;
        flex-shrink: 0;
        border-radius: 5px;
    }
    & > .open-bookmark-button {
        opacity: ${(props) => (props.active ? 1 : 0)};
        height: 27px;
        width: 36px;
    }
`;

interface IListProps {
    bookmarks: IBookmark[] | null;
}

const List: FC<IListProps> = ({ bookmarks }) => {
    const { bookmarkStore } = useStores();
    return (
        <Container id="bookmarks-container-list">
            {bookmarks?.map((bookmark, i) => (
                <Bookmark
                    id={`bookmark-${bookmark.id}`}
                    key={bookmark.id}
                    onClick={() => bookmarkStore.setActiveBookmark(bookmark)}
                    active={bookmarkStore.activeBookmark?.id === bookmark.id}
                    onDoubleClick={() => bookmarkStore.openBookmark(bookmark.url, bookmark.id)}
                    highlight={i % 2 === 0}
                >
                    <Favicon url={bookmark.favicon} />
                    <div className="bookmark-name">{bookmark.name}</div>
                    <div className="bookmark-url">
                        <Url url={bookmark.url} />
                    </div>
                    <div className="bookmark-tags">
                        {bookmark.tags.map((tag, i) => (
                            <Tag key={`${i}-${tag}`} name={tag} />
                        ))}
                    </div>
                    <Button
                        symbol="arrow_forward"
                        onClick={() => bookmarkStore.openBookmark(bookmark.url, bookmark.id)}
                        className="open-bookmark-button"
                        id={`open-bookmark-button-${i}`}
                    />
                </Bookmark>
            ))}
        </Container>
    );
};

export default observer(List);
