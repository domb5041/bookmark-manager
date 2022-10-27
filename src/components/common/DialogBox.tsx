import React, { FC, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import Button from "./buttons/Button";
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
    const bodyRef = useRef<HTMLDivElement>(null);
    const [scrolled, setScrolled] = useState(false);
    const [overflowed, setOverflowed] = useState(false);

    const handleScroll = () => {
        const scrollPadding = 10;
        if (bodyRef.current) {
            setScrolled(bodyRef.current.scrollTop > scrollPadding);
            setOverflowed(
                bodyRef.current.scrollTop <= bodyRef.current.scrollHeight - bodyRef.current.offsetHeight - scrollPadding
            );
        }
    };

    useEffect(() => {
        if (active) {
            handleScroll();
            window.addEventListener("resize", handleScroll);
        }
        return () => {
            window.removeEventListener("resize", handleScroll);
        };
    }, [active]);

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
                    <Header scrolled={scrolled}>{title}</Header>
                    <Body ref={bodyRef} onScroll={handleScroll}>
                        {children}
                    </Body>
                    <Footer overflowed={overflowed}>
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
