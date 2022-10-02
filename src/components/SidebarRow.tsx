import React, { FC } from "react";
import styled from "styled-components";
import { getTagBackground, tagColors } from "../theme";
import Symbol from "./Symbol";

const Container = styled.div<{ active: boolean }>`
    padding: 3px 10px;
    cursor: pointer;
    background-color: ${(props) => (props.active ? "silver" : "transparent")};
    white-space: nowrap;
    display: flex;
    align-items: center;
    & .tag-name {
        flex: 1;
        padding-left: 5px;
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
        <Container active={active} onClick={onClick} style={style}>
            <Icon color={color || tagColors[0]}>
                <Symbol name={icon || "tag"} color={color || tagColors[0]} size="20px" />
            </Icon>
            <div className="tag-name">{name}</div>
            <div className="tag-count">({count})</div>
        </Container>
    );
};

export default SidebarRow;
