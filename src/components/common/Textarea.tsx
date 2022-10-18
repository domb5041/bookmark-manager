import React, { FC } from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    align-items: center;
    & > textarea {
        flex: 1;
        box-sizing: border-box;
        border: 1px solid ${(props) => props.theme.color.background.border};
        border-radius: 5px;
        padding: 7px;
        resize: none;
        height: 100px;
    }
`;

interface ITextareaProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    style?: any;
    id: string;
}

const Textarea: FC<ITextareaProps> = ({ value, onChange, style, id }) => {
    return (
        <Container style={style} id={id + "-container"}>
            <textarea value={value} onChange={onChange} id={id} />
        </Container>
    );
};

export default Textarea;
