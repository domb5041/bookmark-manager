import { lighten, darken } from "polished";
import React, { FC } from "react";
import styled, { css } from "styled-components";
import Symbol from "../common/Symbol";

const buttonTypeStyles = {
    primary: css`
        background-color: ${(props) => props.theme.color.accent.primary};
        border: none;
        color: white;
        box-shadow: 0 1px 0 ${(props) => darken(0.1, props.theme.color.accent.primary)};
        &:hover:not(:disabled) {
            background-color: ${(props) => lighten(0.05, props.theme.color.accent.primary)};
        }
    `,
    secondary: css`
        background-color: ${(props) => props.theme.color.background.void};
        border: 1px solid ${(props) => props.theme.color.border.light};
        box-shadow: 0 1px 0 ${(props) => props.theme.color.border.heavy};
        &:hover:not(:disabled) {
            background-color: ${(props) => props.theme.color.background.surface};
        }
    `
};

const StyledButton = styled.button<{ text?: string; icon?: string; styleType: "primary" | "secondary" }>`
    ${(props) => buttonTypeStyles[props.styleType]};
    text-transform: capitalize;
    padding: 0 12px;
    font-weight: 600;
    font-family: "Heebo", sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 28px;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.1s;
    flex-shrink: 0;
    &:disabled {
        cursor: not-allowed;
        opacity: 0.7;
    }
    & .material-symbols-outlined {
        padding-left: ${(props) => (props.text ? 5 : 0)}px;
    }
    & .button-text {
        padding-left: ${(props) => (props.icon ? 3 : 0)}px;
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
    styleType?: "primary" | "secondary";
}

const Button: FC<IButtonProps> = ({ text, symbol, disabled, onClick, style, className, styleType }) => {
    return (
        <StyledButton
            disabled={disabled}
            onClick={onClick}
            style={style}
            className={className}
            text={text}
            icon={symbol}
            styleType={styleType || "secondary"}
        >
            {text && <span className="button-text">{text}</span>}
            {symbol && <Symbol name={symbol} size="22px" />}
        </StyledButton>
    );
};

export default Button;
