import React, { FC } from "react";
import styled from "styled-components";
import Symbol from "../Symbol";

const Container = styled.div<{ active?: boolean }>`
    border: 1px solid silver;
    background-color: ${(props) => (props.active ? "yellow" : "white")};
    display: inline-flex;
    align-items: center;
    margin-right: 5px;
    padding: 0 2px;
    overflow: hidden;
    cursor: pointer;
    & .tag-name {
        font-size: 14px;
    }
`;

interface ITagProps {
    name: string;
    active?: boolean;
    onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
    id?: string;
    onClick?: (e: React.MouseEvent) => void;
    onFocus?: () => void;
}

const Tag: FC<ITagProps> = ({ name, active, onKeyDown, id, onClick, onFocus }) => {
    return (
        <Container id={id} active={active} onKeyDown={onKeyDown} tabIndex={0} onClick={onClick} onFocus={onFocus}>
            <Symbol name="tag" size="18px" color="black" />
            <span className="tag-name">{name}</span>
        </Container>
    );
};

export default Tag;
