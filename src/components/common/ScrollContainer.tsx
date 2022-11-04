import React, { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";

export const Container = styled.div<{ scrolled: boolean; overflowed: boolean }>`
    border-top: ${(props) => "1px solid " + (props.scrolled ? props.theme.color.border.light : "transparent")};
    border-bottom: ${(props) => "1px solid " + (props.overflowed ? props.theme.color.border.light : "transparent")};
    flex: 1;
    overflow-y: auto;
    transition: border 0.2s;
`;

const ScrollContainer: FC<IScrollContainerProps> = ({ children, className, style, id, borderTop, borderBottom }) => {
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
        <Container
            id={id}
            ref={bodyRef}
            onScroll={handleScroll}
            scrolled={scrolled}
            overflowed={overflowed}
            className={className}
            style={style}
        >
            {children}
        </Container>
    );
};

interface IScrollContainerProps {
    children: any;
    className?: string;
    style?: any;
    id?: string;
    borderTop?: boolean;
    borderBottom?: boolean;
}

ScrollContainer.defaultProps = {
    borderTop: true,
    borderBottom: true
};

export default ScrollContainer;
