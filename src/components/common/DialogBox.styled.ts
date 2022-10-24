import styled from "styled-components";

export const Container = styled.div<{ width?: string; height?: string }>`
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
        background: ${(props) => props.theme.color.background.void};
        border-radius: 5px;
        /* box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2); */
        display: flex;
        flex-direction: column;
        overflow: hidden;
        pointer-events: all;
        max-width: 100%;
        max-height: 100%;
        width: ${(props) => props.width || "300px"};
        height: ${(props) => props.height || "500px"};
        border: 1px solid ${(props) => props.theme.color.border.light};
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

export const Header = styled.div`
    padding: 5px;
    text-align: center;
    font-weight: bold;
`;

export const Body = styled.div`
    padding: 20px;
    flex: 1;
    overflow-y: auto;
`;

export const Footer = styled.div`
    display: flex;
    padding: 5px;
    justify-content: space-between;
`;
