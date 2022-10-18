import React, { FC } from "react";
import styled from "styled-components";
import { getTagBackground, tagColors } from "../../theme";
import Symbol from "../common/Symbol";

const Container = styled.div<{ active: boolean; color: string }>`
    padding: 3px 10px;
    cursor: pointer;
    background-color: ${(props) => (props.active ? props.theme.color.accent.secondary : "transparent")};
    transition: 0.1s;
    &:hover {
        background-color: ${(props) =>
            props.active ? props.theme.color.accent.secondary : props.theme.color.background.hover.surface};
    }
    white-space: nowrap;
    display: flex;
    align-items: center;
    & .tag-name {
        flex: 1;
        padding-left: 5px;
    }
    & .tag-count {
        font-weight: bold;
        color: ${(props) => props.theme.color.foreground.secondary};
    }
`;

const Icon = styled.div<{ color: string }>`
    width: 27px;
    height: 27px;
    border-radius: 100%;
    background-color: ${(props) => getTagBackground(props.color)};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
`;

interface ISidebarRowProps {
    icon?: string;
    color?: string;
    active: boolean;
    count: number;
    onClick: () => void;
    name: string;
    style?: any;
}

const SidebarRow: FC<ISidebarRowProps> = ({ icon, color, active, count, onClick, name, style }) => {
    return (
        <Container active={active} onClick={onClick} style={style} color={color || tagColors[0]}>
            <Icon color={color || tagColors[0]}>
                <Symbol name={icon || "tag"} color={color || tagColors[0]} size="20px" />
            </Icon>
            <div className="tag-name">{name}</div>
            <div className="tag-count">{count}</div>
        </Container>
    );
};

export default SidebarRow;
