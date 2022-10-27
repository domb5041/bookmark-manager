import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { useStores } from "../../store";
import Symbol from "../common/Symbol";
import { getTagBackground, tagColors } from "../../theme";

const Container = styled.div<{ active?: boolean; color: string }>`
    background-color: ${(props) => () => getTagBackground(props.color)};
    outline: ${(props) => (props.active ? "2px solid " + props.color : "none")};
    border-radius: 3px;
    display: inline-flex;
    align-items: center;
    margin-right: 5px;
    padding: 0 4px;
    overflow: hidden;
    cursor: pointer;
    height: 22px;
    flex-shrink: 0;
    & .tag-name {
        font-size: 14px;
        color: ${(props) => props.color};
        padding: 0 2px;
    }
`;

interface ITagProps {
    name: string;
    active?: boolean;
    onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
    id?: string;
    onClick?: (e: React.MouseEvent) => void;
    onFocus?: () => void;
    style?: any;
}

const Tag: FC<ITagProps> = ({ name, active, onKeyDown, id, onClick, onFocus, style }) => {
    const { tagStore } = useStores();
    const [icon, setIcon] = useState("tag");
    const [color, setColor] = useState(tagColors[0]);

    useEffect(() => {
        const tagIndex = tagStore.tagSet.findIndex((tag) => tag.name === name);
        if (tagIndex > -1) {
            setIcon(tagStore.tagSet[tagIndex].icon);
            setColor(tagStore.tagSet[tagIndex].color);
        }
    }, [tagStore.tagSet, name]);

    return (
        <Container
            id={id}
            active={active}
            onKeyDown={onKeyDown}
            tabIndex={0}
            onClick={onClick}
            onFocus={onFocus}
            color={color}
            style={style}
        >
            <Symbol name={icon} size="17px" color={color} />
            <div className="tag-name">{name}</div>
        </Container>
    );
};

export default observer(Tag);
