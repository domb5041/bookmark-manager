import React, { FC } from "react";
import styled from "styled-components";

const Container = styled.div`
    & > textarea {
        flex: 1;
        box-sizing: border-box;
        background-color: ${(props) => props.theme.color.background.surface};
        border: 1px solid ${(props) => props.theme.color.border.light};
        border-radius: 5px;
        padding: 7px;
        resize: none;
        height: 100px;
        box-shadow: 0 1px 0 ${(props) => props.theme.color.border.heavy} inset;
        width: 100%;
        font-family: "Heebo", sans-serif;
    }
`;

interface ITextareaProps {
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    style?: any;
    id: string;
    disabled?: boolean;
    label?: string;
}

const Textarea: FC<ITextareaProps> = ({ value, onChange, style, id, disabled, label }) => {
    return (
        <Container style={style} id={id + "-container"}>
            {label && <label htmlFor={id}>{label}</label>}
            <textarea value={value} onChange={onChange} id={id} disabled={disabled} />
        </Container>
    );
};

export default Textarea;
