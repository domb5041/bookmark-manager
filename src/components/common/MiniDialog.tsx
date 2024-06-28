import React, { ReactElement, useEffect, useState, useRef, forwardRef, useImperativeHandle } from "react";
import { CSSTransition } from "react-transition-group";
import css from "./MiniDialog.module.css";

interface IMiniDialogProps {
    id: string;
    attachTo: string;
    position?: "top" | "bottom" | "left" | "right";
    children?: ReactElement | ReactElement[] | string;
    title?: string;
    width?: string;
    maxHeight?: string;
    bodyStyle?: any;
    footerStyle?: any;
    footer?: ReactElement | ReactElement[];
    onClose?: () => void;
    onOpen?: () => void;
    ref?: React.Ref<{ close(): void }>;
}

const MiniDialog = forwardRef(
    (
        {
            id,
            attachTo,
            position = "bottom",
            children,
            title,
            width = "200px",
            maxHeight = "300px",
            bodyStyle,
            footer,
            footerStyle,
            onClose,
            onOpen
        }: IMiniDialogProps,
        ref
    ) => {
        const [isVisible, setIsVisible] = useState(false);
        const dialogRef = useRef(null);
        const arrowRef = useRef(null);

        useEffect(() => {
            const element = document.getElementById(attachTo);
            element?.addEventListener("click", show);
            window.addEventListener("resize", hide);
            return () => {
                element?.removeEventListener("click", show);
                window.removeEventListener("resize", hide);
            };
        }, [attachTo]);

        const show = (e: MouseEvent) => {
            e.stopPropagation();
            setIsVisible(true);
        };
        const hide = () => setIsVisible(false);

        useImperativeHandle(ref, () => ({
            close() {
                setIsVisible(false);
            }
        }));

        useEffect(() => {
            const calculatePosition = () => {
                // trigger element dimensions
                const element = document.getElementById(attachTo);
                if (!element) return;
                const triggerBox = element.getBoundingClientRect();
                const triggerX = triggerBox.left;
                const triggerY = triggerBox.top;
                const triggerW = triggerBox.width;
                const triggerH = triggerBox.height;
                const halfTriggerW = triggerBox.width / 2;
                const halfTriggerH = triggerBox.height / 2;

                // dialog dimensions
                const dialogW: number = dialogRef.current.offsetWidth;
                const dialogH: number = dialogRef.current.offsetHeight;
                const halfDialogW: number = dialogW / 2;
                const halfDialogH: number = dialogH / 2;
                const margin = 10;

                // arrow dimensions
                const arrowW = 20;
                const arrowH = 12;
                const halfArrowW = arrowW / 2;
                const halfArrowH = arrowH / 2;

                // POSITION DIALOG

                // Coordinates for positioning dialog relative to trigger element
                //
                //    y1 ⎡¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯⎤
                //       |                 |
                //    y2 | TRIGGER ELEMENT |
                //       |                 |
                //    y3 ⎣_________________⎦
                //      x1       x2       x3
                const trigger = {
                    y1: triggerY - dialogH - margin,
                    y2: triggerY + halfTriggerH - halfDialogH,
                    y3: triggerY + triggerH + margin,
                    x1: triggerX - dialogW - margin,
                    x2: triggerX + halfTriggerW - halfDialogW,
                    x3: triggerX + triggerW + margin
                };

                // window boundries
                const winLeft = 0;
                const winRight = window.innerWidth - dialogW;
                const winTop = 0;
                const winBottom = window.innerHeight - dialogH;

                // shift the position for dialog and arrow if the dialog goes offscreen
                // applies to arrow in the opposite direction to stay anchored on trigger element
                const shift = (value: number, min: number, max: number) => {
                    if (value < min) return value;
                    else if (value > max) return value - max;
                    return 0;
                };
                const shiftX = shift(trigger.x2, winLeft, winRight);
                const shiftY = shift(trigger.y2, winTop, winBottom);

                const dialogStyles = {
                    top: {
                        left: trigger.x2 - shiftX,
                        top: trigger.y1,
                        origin: `${dialogW / 2 + shiftX}px bottom`
                    },
                    bottom: {
                        left: trigger.x2 - shiftX,
                        top: trigger.y3,
                        origin: `${dialogW / 2 + shiftX}px top`
                    },
                    left: {
                        left: trigger.x1,
                        top: trigger.y2 - shiftY,
                        origin: `right ${dialogH / 2 + shiftY}px`
                    },
                    right: {
                        left: trigger.x3,
                        top: trigger.y2 - shiftY,
                        origin: `left ${dialogH / 2 + shiftY}px`
                    }
                };

                dialogRef.current.style.setProperty("--dialog-left", `${dialogStyles[position].left}px`);
                dialogRef.current.style.setProperty("--dialog-top", `${dialogStyles[position].top}px`);
                dialogRef.current.style.setProperty("--dialog-origin", dialogStyles[position].origin);

                // POSITION ARROW

                // Coordinates for positioning arrow relative to dialog
                //
                //    y1 ⎡¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯⎤
                //       |                 |
                //    y2 |      DIALOG     |
                //       |                 |
                //    y3 ⎣_________________⎦
                //      x1       x2       x3
                const dialog = {
                    y1: -arrowH,
                    y2: halfDialogH - halfArrowH,
                    y3: dialogH - 2,
                    x1: -arrowH - 4,
                    x2: halfDialogW - halfArrowW,
                    x3: dialogW - 6
                };

                const arrowStyles = {
                    top: {
                        left: dialog.x2 + shiftX,
                        top: dialog.y3,
                        rotate: 0
                    },
                    bottom: {
                        left: dialog.x2 + shiftX,
                        top: dialog.y1,
                        rotate: 180
                    },
                    left: {
                        left: dialog.x3,
                        top: dialog.y2 + shiftY,
                        rotate: 270
                    },
                    right: {
                        left: dialog.x1,
                        top: dialog.y2 + shiftY,
                        rotate: 90
                    }
                };

                arrowRef.current.style.setProperty("--arrow-left", `${arrowStyles[position].left}px`);
                arrowRef.current.style.setProperty("--arrow-top", `${arrowStyles[position].top}px`);
                arrowRef.current.style.setProperty("--arrow-rotate", `rotate(${arrowStyles[position].rotate}deg)`);
            };
            if (isVisible) calculatePosition();
        }, [isVisible, children, attachTo, position]);

        return (
            <>
                <CSSTransition
                    in={isVisible}
                    unmountOnExit
                    timeout={200}
                    classNames={{
                        enter: css.enter,
                        enterActive: css.enterActive,
                        exit: css.exit,
                        exitActive: css.exitActive
                    }}
                    onEnter={onOpen}
                    onExited={onClose}
                    nodeRef={dialogRef}
                >
                    <div
                        ref={dialogRef}
                        className={css.miniDialog}
                        style={{ width, maxHeight }}
                        id={id}
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        {title && (
                            <label id={`${id}-header`} className={css.miniDialogHeader}>
                                {title}
                            </label>
                        )}
                        <div style={bodyStyle} id={`${id}-body`} className={css.miniDialogBody}>
                            {children}
                        </div>
                        {footer && (
                            <div style={footerStyle} id={`${id}-footer`} className={css.miniDialogFooter}>
                                {footer}
                            </div>
                        )}
                        <svg
                            ref={arrowRef}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 12"
                            className={css.miniDialogArrow}
                        >
                            <path
                                className={css.arrowFill}
                                d="M-3.979 0s3.551-.298 6.051 2.487c1.12 1.247 4.026 4.76 5.991 7.15.383.461 1.134.75 1.952.75.818.001 1.57-.287 1.954-.748 1.986-2.38 4.903-5.879 5.959-7.152C20.033-.051 23.979 0 23.979 0H-3.979z"
                                transform="matrix(.71537 0 0 1.12182 2.846 .01)"
                            ></path>
                            <path
                                fill="none"
                                className={css.arrowStroke}
                                strokeWidth="1.3"
                                d="M-3.979 0s3.551-.298 6.051 2.487C3.197 3.74 6.126 7.282 8.091 9.672c.392.472 1.127.764 1.924.764.796.001 1.532-.29 1.925-.762 1.986-2.381 4.927-5.908 5.988-7.187C20.033-.051 23.979 0 23.979 0"
                                transform="matrix(.71537 0 0 1.05152 2.846 .514)"
                            ></path>
                        </svg>
                    </div>
                </CSSTransition>
                {isVisible && <div onClick={hide} id={`${id}-hidden-close`} className={css.hiddenHideTrigger} />}
            </>
        );
    }
);

export default MiniDialog;
