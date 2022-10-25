import React, { FC, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import Button from "./Button";
import { Container, Header, Body, Footer } from "./DialogBox.styled";

interface IDialogBoxProps {
    children: any;
    active: boolean;
    close: () => void;
    title: string;
    confirmButton: IButton;
    onEnter?: () => void;
    width?: string;
    height?: string;
}

interface IButton {
    text: string;
    onClick: () => void;
    disabled?: boolean;
    id: string;
}

const DialogBox: FC<IDialogBoxProps> = ({ children, active, close, title, confirmButton, onEnter, width, height }) => {
    const nodeRef = useRef(null);
    return (
        <CSSTransition
            nodeRef={nodeRef}
            in={active}
            unmountOnExit
            timeout={200}
            classNames="dialog-container"
            onEnter={onEnter}
        >
            <Container ref={nodeRef} width={width} height={height}>
                <div className="dialog-panel" onClick={(e) => e.stopPropagation()}>
                    <Header>{title}</Header>
                    <Body>{children}</Body>
                    <Footer>
                        <Button id="modal-cancel" onClick={close} text="cancel" />
                        <Button
                            id={confirmButton.id}
                            text={confirmButton.text}
                            disabled={confirmButton.disabled}
                            onClick={() => {
                                confirmButton.onClick();
                                close();
                            }}
                            styleType="primary"
                        />
                    </Footer>
                </div>
            </Container>
        </CSSTransition>
    );
};

export default DialogBox;
