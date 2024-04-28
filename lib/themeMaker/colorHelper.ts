import { hex } from "color-convert";

export function generateRandomColor(): ColorTriplet {
  const randomHex =
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");
  return hex.rgb(randomHex);
}

export const regularIndexMap: Record<AccentColors, number> = {
  primary: 8,
  saturated: 6,
  middle: 4,
  soft: 3,
  pastel: 2,
  light: 0,
  site: 3,
};

export const invertedIndexMap: Record<AccentColors, number> = {
  primary: 0,
  saturated: 2,
  middle: 3,
  soft: 4,
  pastel: 5,
  light: 6,
  site: 5,
};
