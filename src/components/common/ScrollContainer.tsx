import { useEffect, useRef, useState } from "react";
import css from "./ScrollContainer.module.css";
import classNames from "classnames";

interface ScrollContainerPropTypes {
    children: any;
    className?: string;
    style?: any;
    id?: string;
    borderTop?: boolean;
    borderBottom?: boolean;
}

const ScrollContainer = ({
    children,
    className,
    style,
    id,
    borderTop = true,
    borderBottom = true
}: ScrollContainerPropTypes) => {
    const bodyRef = useRef<HTMLDivElement>(null);
    const [scrolled, setScrolled] = useState(false);
    const [overflowed, setOverflowed] = useState(false);

    const handleScroll = () => {
        if (bodyRef.current) {
            if (borderTop) setScrolled(bodyRef.current.scrollTop > 0);
            if (borderBottom)
                setOverflowed(bodyRef.current.scrollTop <= bodyRef.current.scrollHeight - bodyRef.current.offsetHeight);
        }
    };

    useEffect(() => {
        handleScroll();
        window.addEventListener("resize", handleScroll);
        return () => {
            window.removeEventListener("resize", handleScroll);
        };
    }, [children]);

    return (
        <div
            id={id}
            ref={bodyRef}
            onScroll={handleScroll}
            className={classNames(className, css.container, {
                [css.scrolled]: scrolled,
                [css.overflowed]: overflowed
            })}
            style={style}
        >
            {children}
        </div>
    );
};

export default ScrollContainer;
