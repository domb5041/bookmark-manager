import { lighten, darken, transparentize, saturate } from "polished";

const white = "white";
const black = "black";

export const accents = {
    blue: "#2B8AF8",
    purple: "#9460F5",
    pink: "#FB59BD",
    red: "#F54A55",
    orange: "#EF8800",
    yellow: "#EBB734",
    green: "#34BC67"
};

export const theme = (mode: "light" | "dark", accent: keyof typeof accents) => {
    const colors = {
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
                primary: accents[accent],
                darker: saturate(0.1, darken(0.1, accents[accent])),
                translucent: transparentize(0.8, accents[accent])
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
                primary: accents[accent],
                darker: accents[accent],
                translucent: transparentize(0.8, accents[accent])
            }
        }
    };
    return { color: colors[mode] };
};
