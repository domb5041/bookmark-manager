import { observer } from "mobx-react";
import React, { FC } from "react";
import styled from "styled-components";
import { useStores } from "../../store";
import { IBookmark } from "../../store/bookmark.store";
import Url from "../common/Url";
import Tag from "./Tag";
import PreviewImg from "./PreviewImg";
import Button from "../common/buttons/Button";

const Container = styled.div<{ active: boolean }>`
    overflow: hidden;
    background-color: ${(props) => props.theme.color.background.surface};
    outline: ${(props) => (props.active ? "2px solid " + props.theme.color.accent.primary : "none")};
    border-radius: 5px;
    position: relative;
    box-shadow: 0 1px 0 ${(props) => props.theme.color.border.heavy};
    border: 1px solid ${(props) => (props.active ? props.theme.color.accent.primary : props.theme.color.border.light)};
    cursor: pointer;
    margin: 0 30px 30px 0;
    & > .open-bookmark-button {
        display: ${(props) => (props.active ? "flex" : "none")};
        position: absolute;
        top: 5px;
        right: 5px;
        height: 24px;
        width: 35px;
    }
    &:hover > .open-bookmark-button {
        display: flex;
    }
`;

const ContainerInner = styled.div`
    padding: 8px;
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
                styleType="primary"
            />
        </Container>
    );
};

export default observer(Thumbnail);
