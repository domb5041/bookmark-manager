import { lighten, darken, transparentize, saturate } from "polished";

const green = "#34BC67";
const white = "white";
const black = "black";

export const colors = {
    light: {
        background: {
            void: white,
            surface: darken(0.04, white),
            object: darken(0.1, white)
        },
        border: {
            light: darken(0.15, white),
            heavy: darken(0.25, white)
        },
        foreground: {
            primary: lighten(0.1, black),
            secondary: lighten(0.2, black),
            faded: lighten(0.5, black),
            active: white
        },
        accent: {
            primary: green,
            darker: saturate(0.1, darken(0.1, green)),
            translucent: transparentize(0.8, green)
        }
    },
    dark: {
        background: {
            void: black,
            surface: lighten(0.1, black),
            object: lighten(0.2, black)
        },
        border: {
            light: lighten(0.25, black),
            heavy: lighten(0.3, black)
        },
        foreground: {
            primary: darken(0.1, white),
            secondary: lighten(0.2, black),
            faded: lighten(0.5, black),
            active: black
        },
        accent: {
            primary: green,
            darker: green,
            translucent: transparentize(0.8, green)
        }
    }
};

export const theme = (mode: "light" | "dark") => ({
    color: colors[mode]
});
