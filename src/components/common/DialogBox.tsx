import { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import Button from "./buttons/Button";
import css from "./DialogBox.module.css";
import ScrollContainer from "./ScrollContainer";

interface DialogBoxPropTypes {
    children: any;
    active: boolean;
    close: () => void;
    title: string;
    confirmButton: {
        text: string;
        onClick: () => void;
        disabled?: boolean;
        id: string;
    };
    onEnter?: () => void;
    width?: string;
    height?: string;
}

const DialogBox = ({
    children,
    active,
    close,
    title,
    confirmButton,
    onEnter,
    width = "350px",
    height = "600px"
}: DialogBoxPropTypes) => {
    const nodeRef = useRef(null);
    return (
        <CSSTransition
            nodeRef={nodeRef}
            in={active}
            unmountOnExit
            timeout={200}
            classNames={{
                enter: css.enter,
                enterActive: css.enterActive,
                exit: css.exit,
                exitActive: css.exitActive
            }}
            onEnter={onEnter}
        >
            <div className={css.container} ref={nodeRef}>
                <div
                    className={css.panel}
                    style={{ width: width, height: height }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={css.header}>{title}</div>
                    <ScrollContainer style={{ padding: 20 }}>{children}</ScrollContainer>
                    <div className={css.footer}>
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
                    </div>
                </div>
            </div>
        </CSSTransition>
    );
};

export default DialogBox;
