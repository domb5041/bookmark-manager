import { lighten, desaturate } from "polished";

export const tagColors = ["#595959", "#982A22", "#087D45", "#0068B7", "#8A7A04", "#86139C"];

export const getTagBackground = (color: string) => desaturate(0.35, lighten(0.5, color));
