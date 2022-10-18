import React, { FC } from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    & .label {
        text-align: right;
        flex: 1;
        margin-top: 4px;
        padding: 0 10px;
        overflow-x: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 14px;
    }
    & .content {
        display: flex;
        width: 300px;
        & > * {
            flex: 1;
        }
    }
    & .info {
        flex: 1;
        padding: 0 10px;
    }
`;

interface IFormRowProps {
    children: any;
    label?: string;
    style?: any;
}

const FormRow: FC<IFormRowProps> = ({ children, label, style }) => {
    return (
        <Container style={style}>
            <div className="label">{label}</div>
            <div className="content">{children}</div>
            <div className="info"></div>
        </Container>
    );
};

export default FormRow;
