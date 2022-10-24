import React, { FC } from "react";
import styled from "styled-components";

const Container = styled.div`
    & > input {
        flex: 1;
        box-sizing: border-box;
        height: 28px;
        border: 1px solid ${(props) => props.theme.color.border.light};
        background-color: ${(props) => props.theme.color.background.highlight};
        border-radius: 5px;
        padding: 0 7px;
        box-shadow: 0 2px 1px ${(props) => props.theme.color.border.shadow} inset;
        width: 100%;
    }
`;

interface ITextInputProps {
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    style?: any;
    id: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
}

const TextInput: FC<ITextInputProps> = ({ value, onChange, style, id, label, placeholder, disabled }) => {
    return (
        <Container style={style} id={id + "-container"}>
            {label && <label htmlFor={id}>{label}</label>}
            <input value={value} onChange={onChange} id={id} placeholder={placeholder} disabled={disabled} />
        </Container>
    );
};

export default TextInput;
