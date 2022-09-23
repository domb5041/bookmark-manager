import React, { FC } from "react";
import styled from "styled-components";

const Span = styled.span<{ size?: string; color?: string }>`
    color: ${(props) => props.color || "silver"};
    font-size: ${(props) => props.size || "24px"};
`;

interface ISymbolProps {
    name: string;
    size?: string;
    color?: string;
    className?: string;
    style?: any;
}

const Symbol: FC<ISymbolProps> = ({ name, size, color, style, className }) => {
    return (
        <Span className={`material-symbols-outlined ${className || ""}`} size={size} color={color} style={style}>
            {name}
        </Span>
    );
};

export default Symbol;
