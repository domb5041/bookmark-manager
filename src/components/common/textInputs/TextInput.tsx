import React, { ReactElement, useRef, useState } from "react";
import css from "./TextInputs.module.css";
import classNames from "classnames";

interface TextInputPropTypes {
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    style?: any;
    id: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    leftWidget?: ReactElement | false;
    rightWidget?: ReactElement | false;
}

const TextInput = ({
    value,
    onChange,
    style,
    id,
    label,
    placeholder,
    disabled,
    leftWidget,
    rightWidget
}: TextInputPropTypes) => {
    const [focused, setFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <>
            {label && <label htmlFor={id}>{label}</label>}
            <div
                className={classNames(css.inputContainer, css.textBasic, {
                    [css.focused]: focused,
                    [css.leftWidget]: leftWidget !== false,
                    [css.rightWidget]: rightWidget !== false
                })}
                style={style}
                id={id + "-container"}
                onClick={() => inputRef.current?.focus()}
            >
                {leftWidget && leftWidget}
                <input
                    ref={inputRef}
                    value={value}
                    onChange={onChange}
                    id={id}
                    placeholder={placeholder}
                    disabled={disabled}
                    autoComplete="off"
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />
                {rightWidget && rightWidget}
            </div>
        </>
    );
};

export default TextInput;
