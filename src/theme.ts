import { lighten, darken, transparentize, saturate } from "polished";

const green = "#34BC67";
const white = "white";
const black = "black";

export const theme = {
    color: {
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
    }
};
