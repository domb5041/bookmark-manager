import { observer } from "mobx-react";
import { transparentize } from "polished";
import React, { FC } from "react";
import styled from "styled-components";
import { useStores } from "../../store";
import { IBookmark } from "../../store/bookmark.store";
import Url from "../common/Url";
import Tag from "./Tag";
import PreviewImg from "./PreviewImg";
import Button from "../common/Button";

const Container = styled.div<{ active: boolean }>`
    overflow: hidden;
    background-color: ${(props) => props.theme.color.background.object};
    border-radius: 5px;
    position: relative;
    /* box-shadow: 0 5px 10px ${transparentize(0.9, "black")}; */
    border: 1px solid ${(props) => props.theme.color.border.heavy};
    outline: ${(props) => (props.active ? "2px solid " + props.theme.color.border.heavy : "none")};
    cursor: pointer;
    margin: 0 30px 30px 0;
    & > .open-bookmark-button {
        display: ${(props) => (props.active ? "flex" : "none")};
        position: absolute;
        top: 5px;
        right: 5px;
        height: 25px;
        /* box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); */
    }
    &:hover > .open-bookmark-button {
        display: flex;
    }
`;

const ContainerInner = styled.div`
    padding: 8px;
    border-top: 1px solid ${(props) => props.theme.color.border.heavy};
    box-sizing: border-box;
`;

const Headline = styled.div`
    margin-bottom: 7px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 15px;
    font-weight: bold;
`;

const Description = styled.div`
    font-size: 13px;
    margin-bottom: 7px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;

const Tags = styled.div`
    display: flex;
    overflow-x: scroll;
    border-radius: 3px;
    &::-webkit-scrollbar {
        display: none;
    }
`;

interface IThumbnailProps {
    bookmark: IBookmark;
    index: number;
}

const Thumbnail: FC<IThumbnailProps> = ({ bookmark, index }) => {
    const { bookmarkStore } = useStores();
    return (
        <Container
            onClick={() => bookmarkStore.setActiveBookmark(bookmark)}
            active={bookmarkStore.activeBookmark?.id === bookmark.id}
            onDoubleClick={() => bookmarkStore.openBookmark(bookmark.url, bookmark.id)}
        >
            <PreviewImg imgUrl={bookmark.image} clipImg />
            <ContainerInner>
                <Headline>{bookmark.name}</Headline>
                <Description>{bookmark.description}</Description>
                <Url url={bookmark.url} style={{ marginBottom: 7 }} />
                {bookmark.tags.length > 0 && (
                    <Tags>
                        {bookmark.tags.map((tag, i) => (
                            <Tag key={`${i}-${tag}`} name={tag} />
                        ))}
                    </Tags>
                )}
            </ContainerInner>
            <Button
                symbol="arrow_forward"
                onClick={() => bookmarkStore.openBookmark(bookmark.url, bookmark.id)}
                className="open-bookmark-button"
                id={`open-bookmark-button-${index}`}
            />
        </Container>
    );
};

export default observer(Thumbnail);
