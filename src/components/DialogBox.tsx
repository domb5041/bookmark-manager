import React, { FC, ReactElement, useRef } from "react";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3000;
    background: rgba(0, 0, 0, 0.1);
    padding: 10px;
    & .dialog-panel {
        background: whitesmoke;
        border-radius: 5px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        pointer-events: all;
        max-width: 100%;
        max-height: 100%;
        width: 300px;
        height: 200px;
        border: 1px solid silver;
    }
    &.dialog-container-enter {
        opacity: 0;
    }
    &.dialog-container-enter-active {
        opacity: 1;
        transition: 0.2s;
    }
    &.dialog-container-exit {
        opacity: 1;
    }
    &.dialog-container-exit-active {
        opacity: 0;
        transition: 0.2s;
    }
`;

const Header = styled.div`
    padding: 5px;
`;

const Body = styled.div`
    padding: 20px;
    flex: 1;
`;

const Footer = styled.div`
    display: flex;
    padding: 5px;
    justify-content: space-between;
`;

interface IDialogBoxProps {
    children: ReactElement;
    active: boolean;
    close: () => void;
    onConfirm: () => void;
    title: string;
}

const DialogBox: FC<IDialogBoxProps> = ({ children, active, close, title, onConfirm }) => {
    const nodeRef = useRef(null);
    return (
        <CSSTransition nodeRef={nodeRef} in={active} unmountOnExit timeout={200} classNames='dialog-container'>
            <Container ref={nodeRef}>
                <div className='dialog-panel' onClick={e => e.stopPropagation()}>
                    <Header>{title}</Header>
                    <Body>{children}</Body>
                    <Footer>
                        <button onClick={close}>cancel</button>
                        <button
                            onClick={() => {
                                onConfirm();
                                close();
                            }}
                        >
                            confirm
                        </button>
                    </Footer>
                </div>
            </Container>
        </CSSTransition>
    );
};

export default DialogBox;
