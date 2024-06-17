import { randomIntFromRange, randomUniform } from "../generalHelper";
import { hsv } from "color-convert";

const getRandomGradientType = (): EditorGradientMode => {
  const baseTypes = ["linear-", "radial-", "conic-"];
  const baseType = baseTypes[randomIntFromRange(0, baseTypes.length - 1)];
  const repeatingPrefix = randomIntFromRange(0, 1) === 0 ? "repeating-" : "";
  return `${repeatingPrefix}${baseType}gradient` as EditorGradientMode;
};

export const getRandomNewLayer = (): ColorGradient => {
  const angle = randomIntFromRange(0, 359);
  const posX = randomIntFromRange(15, 85);
  const posY = randomIntFromRange(15, 85);
  const sizeX = randomIntFromRange(25, 60);
  const sizeY =
    sizeX +
    randomIntFromRange(-Math.floor(sizeX * 0.08), Math.ceil(sizeX * 0.08));
  const sizeKeywords: RadialGradientSizeKeyword[] = [
    "farthest-corner",
    "farthest-side",
    "closest-corner",
    "closest-side",
  ];
  const sizeKeyword =
    sizeKeywords[randomIntFromRange(0, sizeKeywords.length - 1)];
  const isCircle = Math.random() < 0.2;

  const h = randomIntFromRange(0, 359);
  const s = randomIntFromRange(80, 100);
  const v = randomIntFromRange(75, 100);

  const colorBase = hsv.rgb([h, s, v]);
  const opacity = randomUniform(0.6, 0.9);

  return {
    type: getRandomGradientType(),
    angle,
    posX,
    posY,
    sizeX,
    sizeY,
    sizeKeyword,
    isCircle,
    stops: [
      {
        color: colorBase,
        at: 0,
        opacity,
        isWidgetOpacity: true,
      },
      {
        color: colorBase,
        at: randomIntFromRange(50, 100),
        opacity: 0,
        isWidgetOpacity: false,
      },
    ],
  };
};

export const emptyStop: GradientStop = {
  color: [255, 255, 255],
  opacity: 0,
  at: 0,
};

export const emptyStops: GradientStop[] = [
  emptyStop,
  { ...emptyStop, at: 100 },
];

export const emptyLayer: ColorGradient = {
  type: "linear-gradient",
  angle: 0,
  posX: 0,
  posY: 0,
  sizeX: 100,
  sizeY: 100,
  isCircle: false,
  sizeKeyword: "farthest-corner",
  stops: emptyStops,
};

export const gradientTypeNameMap: Record<EditorGradientMode | string, string> =
  {
    "linear-gradient": "Linear",
    "radial-gradient": "Radial",
    "conic-gradient": "Conic",
    "repeating-linear-gradient": "Repeating linear",
    "repeating-radial-gradient": "Repeating radial",
    "repeating-conic-gradient": "Repeating conic",
  };

export const initializeGradientDataProperties = (
  gradientData: ColorGradient
) => {
  gradientData.angle ??= 0;
  gradientData.posX ??= 50;
  gradientData.posY ??= 50;
  gradientData.sizeX ??= 20;
  gradientData.sizeY ??= 20;
  gradientData.isCircle ??= false;
  gradientData.sizeKeyword ??= "farthest-corner";
};

export const extendedStopsMaximum = 400;
export const extendedStopsMinimum = -300;
