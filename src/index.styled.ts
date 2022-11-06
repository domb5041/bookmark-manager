import { createGlobalStyle, DefaultTheme, GlobalStyleComponent } from "styled-components";
import { theme } from "./theme";

const themeType = theme("dark", "green");

type GlobalStyleProps = {
    theme: typeof themeType;
};

export const GlobalStyles: GlobalStyleComponent<GlobalStyleProps, DefaultTheme> = createGlobalStyle`
html {
    background-color: ${(props) => props.theme.color.background.void};
    color: ${(props) => props.theme.color.foreground.primary};
}

body {
    margin: 0;
    font-family: 'Heebo', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${(props) => props.theme.color.background.void};
    color: ${(props) => props.theme.color.foreground.primary};
}

input, button, textarea {
    color: ${(props) => props.theme.color.foreground.primary};
}

label {
    font-size: 13px;
    font-weight: 500;
    text-transform: uppercase;
    color: ${(props) => props.theme.color.foreground.faded};
    letter-spacing: 1px;
    display: block;
}

.material-symbols-outlined {
    user-select: none;
    font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 48
}
`;
