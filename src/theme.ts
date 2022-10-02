import { lighten, desaturate, darken, transparentize } from "polished";

export const tagColors = ["#595959", "#982A22", "#087D45", "#0068B7", "#8A7A04", "#86139C"];

export const getTagBackground = (color: string) => desaturate(0.35, lighten(0.5, color));

const baseColor = "white";
const accentColor = "#777777";

export const theme = {
    color: {
        background: {
            border: darken(0.2, baseColor),
            void: darken(0.05, baseColor),
            surface: darken(0.1, baseColor),
            object: darken(0.15, baseColor),
            hover: {
                void: darken(0.09, baseColor),
                surface: darken(0.14, baseColor),
                object: darken(0.19, baseColor)
            }
        },
        foreground: {
            primary: "black",
            secondary: "grey"
        },
        accent: {
            primary: accentColor,
            secondary: transparentize(0.6, accentColor),
            tertiary: transparentize(0.8, accentColor)
        }
    }
};
