import React, { FC } from "react";
import styled from "styled-components";
import Symbol from "../../common/Symbol";

const Container = styled.div`
    text-align: center;
    & .button-text {
        font-size: 12px;
        text-transform: capitalize;
        margin-top: -1px;
    }
`;

const StyledTabs = styled.div`
    margin: 0 auto;
    background-color: ${(props) => props.theme.color.background.surface};
    border: 1px solid ${(props) => props.theme.color.border.light};
    display: flex;
    height: 26px;
    border-radius: 5px;
    flex-shrink: 0;
    padding-top: 1px;
    box-sizing: border-box;
    box-shadow: 0 1px 0 ${(props) => props.theme.color.border.heavy} inset;
`;

const Button = styled.button<{ active: boolean }>`
    border: none;
    width: 32px;
    border-radius: 4px;
    background-color: ${(props) => (props.active ? props.theme.color.background.void : "transparent")};
    color: ${(props) => (props.active ? props.theme.color.foreground.primary : props.theme.color.foreground.faded)};
    box-shadow: 0 1px 0 ${(props) => (props.active ? props.theme.color.border.heavy : "transparent")};
    cursor: pointer;
    display: flex;
    align-items: center;
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
