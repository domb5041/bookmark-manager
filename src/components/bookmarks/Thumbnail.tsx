import { observer } from "mobx-react";
import { transparentize } from "polished";
import React, { FC } from "react";
import styled from "styled-components";
import { useStores } from "../../store";
import { IBookmark } from "../../store/bookmark.store";
import Url from "../Url";
import Tag from "./Tag";
import Symbol from "../Symbol";

const Container = styled.div<{ active: boolean }>`
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: ${(props) => props.theme.color.background.void};
    border-radius: 5px;
    position: relative;
    box-shadow: 0 5px 10px ${transparentize(0.9, "black")};
    border: 1px solid ${(props) => props.theme.color.background.border};
    outline: ${(props) => (props.active ? "2px solid grey" : "none")};
    cursor: pointer;
`;

const Image = styled.div<{ url?: string; active: boolean }>`
    height: 150px;
    background-image: url(${(props) => props.url});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ContainerInner = styled.div`
    border-top: 1px solid ${(props) => props.theme.color.background.border};
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 8px;
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
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
`;

const Tags = styled.div`
    display: flex;
    align-items: flex-end;
    margin-top: 10px;
    height: 22px;
    overflow-x: scroll;
    border-radius: 3px;
    &::-webkit-scrollbar {
        display: none;
    }
`;

interface IThumbnailProps {
    bookmark: IBookmark;
}

const Thumbnail: FC<IThumbnailProps> = ({ bookmark }) => {
    const { bookmarkStore } = useStores();
    return (
        <Container
            onClick={() => bookmarkStore.setActiveBookmark(bookmark.id)}
            active={bookmarkStore.activeBookmark === bookmark.id}
            onDoubleClick={() => window.open(bookmark.url, "_blank")}
        >
            <Image url={bookmark.image} active={bookmarkStore.activeBookmark === bookmark.id}>
                {!bookmark.image && <Symbol name="web_asset_off" size="100px" color="silver" />}
            </Image>
            <ContainerInner>
                <Headline>{bookmark.name}</Headline>
                <Description>{bookmark.description}</Description>
                <Url url={bookmark.url} style={{ fontSize: 13, whiteSpace: "nowrap", marginTop: "auto" }} />
                <Tags>
                    {bookmark.tags.map((tag, i) => (
                        <Tag key={`${i}-${tag}`} name={tag} />
                    ))}
                </Tags>
            </ContainerInner>
        </Container>
    );
};

export default observer(Thumbnail);
