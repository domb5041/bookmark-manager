import { darken, lighten } from "polished";
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

const StyledButton = styled.button<{ text?: string; icon?: string }>`
    margin: 0 auto;
    border: none;
    background-color: ${(props) => props.theme.color.background.void};
    border: 1px solid ${(props) => props.theme.color.border.light};
    box-shadow: 0 1px 0 ${(props) => props.theme.color.border.heavy};
    display: flex;
    align-items: center;
    justify-content: center;
    height: 25px;
    width: 32px;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.1s;
    flex-shrink: 0;
    &:hover:not(:disabled) {
        background-color: ${(props) => props.theme.color.background.surface};
    }
    &:disabled {
        cursor: not-allowed;
        color: grey;
    }
`;

interface IButtonProps {
    text: string;
    id: string;
    symbol?: string;
    disabled?: boolean;
    onClick: () => void;
    style?: any;
    className?: string;
}

const Button: FC<IButtonProps> = ({ text, symbol, disabled, onClick, style, className }) => {
    return (
        <Container style={style}>
            <StyledButton disabled={disabled} onClick={onClick} className={className} text={text} icon={symbol}>
                {symbol && <Symbol name={symbol} size="20px" />}
            </StyledButton>
            <div className="button-text">{text}</div>
        </Container>
    );
};

export default Button;
