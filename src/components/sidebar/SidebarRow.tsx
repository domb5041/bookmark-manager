import React, { FC } from "react";
import styled from "styled-components";
import { useStores } from "../../store";
import Button from "../common/buttons/Button";
import Symbol from "../common/Symbol";

const Container = styled.div<{ active: boolean }>`
    padding: 3px 3px 3px 10px;
    cursor: pointer;
    background-color: ${(props) => (props.active ? props.theme.color.accent.primary : "transparent")};
    transition: 0.1s;
    white-space: nowrap;
    display: flex;
    align-items: center;
    border-radius: 5px;
    & .tag-name {
        flex: 1;
        padding-left: 5px;
        color: ${(props) => props.active && props.theme.color.foreground.active};
        font-weight: ${(props) => props.active && 600};
    }
    & .tag-count {
        font-weight: 600;
        padding-right: 7px;
        color: ${(props) => (props.active ? props.theme.color.foreground.active : props.theme.color.foreground.faded)};
    }
    & .edit-tag-button {
        height: 27px;
        width: 35px;
        display: ${(props) => (props.active ? "flex" : "none")};
    }
    &:hover {
        background-color: ${(props) =>
            props.active ? props.theme.color.accent.primary : props.theme.color.background.object};
        & .edit-tag-button {
            display: flex;
        }
    }
`;

const Icon = styled.div<{ active: boolean }>`
    width: 27px;
    height: 27px;
    border-radius: 100%;
    background-color: ${(props) =>
        props.active ? props.theme.color.foreground.active : props.theme.color.accent.translucent};
    color: ${(props) => props.theme.color.accent.darker};
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
        <Container active={active} onClick={onClick} style={style}>
            <Icon active={active}>
                <Symbol name={icon || "tag"} size="20px" />
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
