import React, { FC } from "react";
import styled from "styled-components";
import { useStores } from "../../store";
import { getTagBackground, tagColors } from "../../theme";
import Button from "../common/buttons/Button";
import Symbol from "../common/Symbol";

const Container = styled.div<{ active: boolean; color: string }>`
    padding: 3px 3px 3px 10px;
    margin-bottom: 1px;
    cursor: pointer;
    background-color: ${(props) => (props.active ? props.theme.color.accent.secondary : "transparent")};
    transition: 0.1s;
    white-space: nowrap;
    display: flex;
    align-items: center;
    border-radius: 5px;
    & .tag-name {
        flex: 1;
        padding-left: 5px;
    }
    & .tag-count {
        font-weight: bold;
        padding-right: 7px;
        color: ${(props) => props.theme.color.foreground.secondary};
    }
    & .edit-tag-button {
        height: 27px;
        width: 35px;
        display: ${(props) => (props.active ? "flex" : "none")};
    }
    &:hover {
        background-color: ${(props) =>
            props.active ? props.theme.color.accent.secondary : props.theme.color.background.hover};
        & .edit-tag-button {
            display: flex;
        }
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
    index?: number;
    allowEdit?: boolean;
}

const SidebarRow: FC<ISidebarRowProps> = ({ icon, color, active, count, onClick, name, style, index, allowEdit }) => {
    const { tagStore } = useStores();
    return (
        <Container active={active} onClick={onClick} style={style} color={color || tagColors[0]}>
            <Icon color={color || tagColors[0]}>
                <Symbol name={icon || "tag"} color={color || tagColors[0]} size="20px" />
            </Icon>
            <div className="tag-name">{name}</div>
            <div className="tag-count">{count}</div>
            {allowEdit && (
                <Button
                    symbol="more_horiz"
                    onClick={tagStore.showEditTagDialog}
                    className="edit-tag-button"
                    id={`edit-tag-button-${index}`}
                />
            )}
        </Container>
    );
};

export default SidebarRow;
