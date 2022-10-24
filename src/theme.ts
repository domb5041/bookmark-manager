import { lighten, desaturate, darken, transparentize } from "polished";

export const tagColors = ["#595959", "#982A22", "#087D45", "#0068B7", "#8A7A04", "#86139C"];

export const getTagBackground = (color: string) => desaturate(0.35, lighten(0.5, color));

// backgrounds
const whiteRock = "#F0EDDD";
const springWood = "#F5F3EC";
const whiteLinen = "#FAF7EF";
const blackWhite = "#FFFEF9";

// borders
const satinLinen = "#E6E3D1";
const bisonHide = "#BFBBA7";

// foregrounds
const graphite = "#1D1C06";
const hemlock = "#6B6541";
const bandicoot = "#848372";

// accents
const lucky = "#B59A1D";
const starkWhite = "#E6E2BF";

export const theme = {
    color: {
        background: {
            void: blackWhite,
            surface: whiteLinen,
            object: whiteRock,
            highlight: springWood,
            hover: transparentize(0.5, starkWhite)
        },
        border: {
            light: satinLinen,
            heavy: bisonHide,
            shadow: transparentize(0.7, hemlock)
        },
        foreground: {
            primary: graphite,
            secondary: bandicoot,
            tinted: hemlock
        },
        accent: {
            primary: lucky,
            secondary: starkWhite
        }
    }
};
