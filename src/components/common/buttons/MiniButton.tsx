import { transparentize } from "polished";
import React, { FC } from "react";
import styled from "styled-components";
import Symbol from "../../common/Symbol";

const StyledButton = styled.button`
    background-color: transparent;
    color: ${(props) => props.theme.color.foreground.faded};
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    height: 22px;
    width: 24px;
    border-radius: 4px;
    padding: 0;
    &:hover {
        background-color: ${(props) => transparentize(0.9, props.theme.color.foreground.faded)};
    }
`;

interface IButtonProps {
    id: string;
    symbol: string;
    onClick: () => void;
    style?: any;
    disabled?: boolean;
}

const MiniButton: FC<IButtonProps> = ({ symbol, onClick, style, id, disabled }) => {
    return (
        <StyledButton id={id} onClick={onClick} style={style} disabled={disabled}>
            <Symbol name={symbol} size="18px" />
        </StyledButton>
    );
};

export default MiniButton;
