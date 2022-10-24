import React, { FC } from "react";
import styled from "styled-components";
import Symbol from "../common/Symbol";

const Container = styled.div`
    text-align: center;
    & .button-text {
        font-size: 12px;
        text-transform: capitalize;
    }
`;

const StyledTabs = styled.div`
    margin: 0 auto;
    background-color: ${(props) => props.theme.color.border.light};
    display: flex;
    height: 25px;
    border-radius: 5px;
    flex-shrink: 0;
    padding: 1px;
    box-sizing: border-box;
    box-shadow: 0 2px 1px ${(props) => props.theme.color.border.shadow} inset;
`;

const Button = styled.button<{ active: boolean }>`
    border: none;
    width: 32px;
    border-radius: 4px;
    background-color: ${(props) => (props.active ? props.theme.color.background.surface : "transparent")};
    color: ${(props) => (props.active ? props.theme.color.foreground.primary : props.theme.color.foreground.tinted)};
    margin-top: ${(props) => (props.active ? 0 : 1)}px;
    cursor: pointer;
`;

interface ITabButtonProps {
    label: string;
    style?: any;
    activeListener: string;
    buttons: {
        icon: string;
        onClick: () => void;
        id: string;
        activeId: string;
    }[];
}

const TabButton: FC<ITabButtonProps> = ({ label, style, buttons, activeListener }) => {
    return (
        <Container style={style}>
            <StyledTabs>
                {buttons.map((b, i) => (
                    <Button key={i} onClick={b.onClick} id={b.id} active={activeListener === b.activeId}>
                        <Symbol name={b.icon} size="19px" />
                    </Button>
                ))}
            </StyledTabs>
            <div className="button-text">{label}</div>
        </Container>
    );
};

export default TabButton;
