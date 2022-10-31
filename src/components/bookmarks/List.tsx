import { observer } from "mobx-react";
import React, { FC } from "react";
import styled from "styled-components";
import { useStores } from "../../store";
import { IBookmark } from "../../store/bookmark.store";
import Button from "../common/buttons/Button";
import Favicon from "./Favicon";
import Tag from "./Tag";
import Url from "../common/Url";
import ScrollContainer from "../common/ScrollContainer";
import { formatDate } from "../../utilities";

const Header = styled.div`
    display: flex;
    padding-left: calc(5px + 7px + 30px);
    padding-right: calc(5px + 4px + 36px);
    & > label {
        flex: 1;
        margin-right: 10px;
    }
`;

const Container = styled(ScrollContainer)`
    padding: 0 5px 5px 5px;
`;

const Bookmark = styled.div<{ active: boolean; highlight: boolean }>`
    padding: 4px 4px 4px 7px;
    border-radius: 5px;
    font-weight: ${(props) => (props.active ? 600 : 400)};
    background-color: ${(props) =>
        props.active
            ? props.theme.color.accent.primary
            : props.highlight
            ? props.theme.color.background.surface
            : "transparent"};
    color: ${(props) => (props.active ? props.theme.color.foreground.active : "initial")};
    &:hover {
        background-color: ${(props) =>
            props.active ? props.theme.color.accent.primary : props.theme.color.background.object};
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
        font-size: 14px;
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
        overflow-x: scroll;
        /* padding-bottom: 1px; */
        border-radius: 3px;
        &::-webkit-scrollbar {
            display: none;
        }
        margin-right: 10px;
        flex-shrink: 0;
    }
    & > .bookmark-date-created {
        flex: 1;
        margin-right: 10px;
        font-size: 14px;
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
        <>
            <Header id="bookmarks-container-list-headers">
                <label>title</label>
                <label>url</label>
                <label>tags</label>
                <label>created</label>
            </Header>
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
                                <Tag
                                    key={`${i}-${tag}`}
                                    name={tag}
                                    active={bookmarkStore.activeBookmark?.id === bookmark.id}
                                />
                            ))}
                        </div>
                        <div className="bookmark-date-created">{formatDate(bookmark.dateAdded)}</div>
                        <Button
                            symbol="arrow_forward"
                            onClick={() => bookmarkStore.openBookmark(bookmark.url, bookmark.id)}
                            className="open-bookmark-button"
                            id={`open-bookmark-button-${i}`}
                        />
                    </Bookmark>
                ))}
            </Container>
        </>
    );
};

export default observer(List);
