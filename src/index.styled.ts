import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

export const GlobalStyles = createGlobalStyle`
html {
    background-color: ${theme.color.background.void};
    color: ${theme.color.foreground.primary};
}

body {
    margin: 0;
    font-family: 'Heebo', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

label {
    font-size: 13px;
    font-weight: 500;
    text-transform: uppercase;
    color: ${theme.color.foreground.tinted};
    letter-spacing: 1px;
    display: block;
}

.material-symbols-outlined {
    font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 48
}
`;
