import React, { FC } from "react";
import styled from "styled-components";
import Symbol from "./Symbol";
import { darken } from "polished";

const StyledButton = styled.button`
    border: none;
    background-color: ${(props) => props.theme.color.background.object};
    display: flex;
    align-items: center;
    justify-content: center;
    height: 28px;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.1s;
    border: 1px solid ${(props) => darken(0.05, props.theme.color.background.object)};
    flex-shrink: 0;
    &:hover:not(:disabled) {
        background-color: ${(props) => props.theme.color.background.hover.object};
    }
    &:disabled {
        cursor: not-allowed;
        color: grey;
    }
`;

interface IButtonProps {
    text?: string;
    id: string;
    symbol?: string;
    disabled?: boolean;
    onClick: () => void;
    style?: any;
    className?: string;
}

const Button: FC<IButtonProps> = ({ text, symbol, disabled, onClick, style, className }) => {
    return (
        <StyledButton disabled={disabled} onClick={onClick} style={style} className={className}>
            {text && <span>{text}</span>}
            {symbol && <Symbol name={symbol} size="22px" />}
        </StyledButton>
    );
};

export default Button;
