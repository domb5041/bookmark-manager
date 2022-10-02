import React, { FC } from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    align-items: center;
    & > input {
        flex: 1;
        box-sizing: border-box;
        height: 28px;
    }
    & > label {
        padding-right: 10px;
    }
`;

interface ITextInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    style?: any;
    id: string;
    label?: string;
    placeholder?: string;
}

const TextInput: FC<ITextInputProps> = ({ value, onChange, style, id, label, placeholder }) => {
    return (
        <Container style={style} id={id + "-container"}>
            {label && <label htmlFor={id}>{label}</label>}
            <input value={value} onChange={onChange} id={id} placeholder={placeholder} />
        </Container>
    );
};

export default TextInput;
