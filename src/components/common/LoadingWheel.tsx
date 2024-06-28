import classNames from "classnames";
import css from "./LoadingWheel.module.css";
import { useRef } from "react";
import { CSSTransition } from "react-transition-group";

interface LoadingWheelProps {
    isVisible: boolean;
    position?: "contained" | "fullscreen" | "inline";
    size?: number;
    background?: "hide" | "fade" | "none";
    color?: "default" | "primary" | "secondary" | "minimal";
}

const LoadingWheel = ({
    isVisible,
    position = "contained",
    size = 30,
    background = "hide",
    color = "default"
}: LoadingWheelProps) => {
    const nodeRef = useRef(null);

    const sixSpoke = [0, 45, 90, 135, 180, 225, 270, 315];
    const twelveSpoke = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
    const wheel = size > 29 ? twelveSpoke : sixSpoke;
    const delay = 0.1;

    return (
        <CSSTransition
            nodeRef={nodeRef}
            in={isVisible}
            unmountOnExit
            timeout={500}
            classNames={{
                enter: css.enter,
                enterActive: css.enterActive,
                exit: css.exit,
                exitActive: css.exitActive
            }}
        >
            <div className={classNames(css.container, css[position], css[background])} ref={nodeRef}>
                <div className={classNames(css.loadingWheel, css[color])} style={{ width: size, height: size }}>
                    {wheel.map((deg, i) => (
                        <div
                            key={i}
                            style={{
                                transform: `translateX(-50%) rotate(${deg}deg)`,
                                animationDelay: i * delay + "s",
                                animationDuration: delay * wheel.length + "s"
                            }}
                        >
                            <div />
                        </div>
                    ))}
                </div>
            </div>
        </CSSTransition>
    );
};

export default LoadingWheel;
