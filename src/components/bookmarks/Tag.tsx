import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { useStores } from "../../store";
import Symbol from "../Symbol";

const Container = styled.div<{ active?: boolean; color: string }>`
    border: 1px solid silver;
    background-color: ${(props) => (props.active ? "yellow" : "white")};
    display: inline-flex;
    align-items: center;
    margin-right: 5px;
    padding: 0 2px;
    overflow: hidden;
    cursor: pointer;
    & .tag-name {
        font-size: 14px;
        color: ${(props) => props.color};
    }
`;

interface ITagProps {
    name: string;
    active?: boolean;
    onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
    id?: string;
    onClick?: (e: React.MouseEvent) => void;
    onFocus?: () => void;
}

const Tag: FC<ITagProps> = ({ name, active, onKeyDown, id, onClick, onFocus }) => {
    const { tagStore } = useStores();
    const [icon, setIcon] = useState("");
    const [color, setColor] = useState("");

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
        >
            <Symbol name={icon} size="18px" color={color} />
            <span className="tag-name">{name}</span>
        </Container>
    );
};

export default observer(Tag);
