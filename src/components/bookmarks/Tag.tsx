import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { useStores } from "../../store";
import Symbol from "../common/Symbol";

const Container = styled.div<{ active?: boolean }>`
    background-color: ${(props) =>
        props.active ? props.theme.color.foreground.active : props.theme.color.accent.translucent};
    outline: ${(props) => (props.active ? "2px solid " + props.theme.color.accent.primary : "none")};
    border-radius: 3px;
    display: inline-flex;
    align-items: center;
    margin-right: 5px;
    padding: 0 4px;
    overflow: hidden;
    cursor: pointer;
    height: 22px;
    flex-shrink: 0;
    font-weight: 500;
    color: ${(props) => props.theme.color.accent.darker};
    & .tag-name {
        font-size: 14px;
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

    useEffect(() => {
        const tagIndex = tagStore.tagSet.findIndex((tag) => tag.name === name);
        if (tagIndex > -1) {
            setIcon(tagStore.tagSet[tagIndex].icon);
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
            style={style}
        >
            <Symbol name={icon} size="17px" />
            <div className="tag-name">{name}</div>
        </Container>
    );
};

export default observer(Tag);
