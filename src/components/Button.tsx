import React, { FC } from "react";
import Symbol from "./Symbol";

interface IButtonProps {
    text?: string;
    id: string;
    symbol?: string;
    disabled?: boolean;
    onClick: () => void;
}

const Button: FC<IButtonProps> = ({ text, symbol, disabled, onClick }) => {
    return (
        <button disabled={disabled} onClick={onClick}>
            {text && <span>{text}</span>}
            {symbol && <Symbol name={symbol} />}
        </button>
    );
};

export default Button;
