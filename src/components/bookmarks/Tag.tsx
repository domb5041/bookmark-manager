import React, { FC } from "react";
import styled from "styled-components";
import Symbol from "../Symbol";

const Container = styled.div`
    border: 1px solid silver;
    background-color: white;
    display: inline-flex;
    align-items: center;
    margin-right: 5px;
    padding: 0 2px;
    & .tag-name {
        font-size: 14px;
    }
`;

interface ITagProps {
    name: string;
}

const Tag: FC<ITagProps> = ({ name }) => {
    return (
        <Container>
            <Symbol name="tag" size="18px" color="black" />
            <span className="tag-name">{name}</span>
        </Container>
    );
};

export default Tag;
