const plainGrayConfig: ThemeDataConfig = {
  palette: {
    primary: [253, 253, 253],
    saturated: [217, 217, 217],
    middle: [192, 192, 192],
    soft: [169, 169, 169],
    pastel: [151, 151, 151],
    light: [140, 140, 140],
    widget: [
      {
        type: "linear-gradient",
        stops: [
          {
            at: 0,
            color: [153, 153, 153],
            opacity: 0.8,
            isWidgetOpacity: true,
          },
          {
            at: 100,
            color: [153, 153, 153],
            opacity: 0.8,
            isWidgetOpacity: true,
          },
        ],
        angle: 0,
      },
    ],
    page: [
      {
        type: "linear-gradient",
        stops: [
          { at: 0, color: [164, 164, 164], opacity: 1 },
          { at: 100, color: [164, 164, 164], opacity: 1 },
        ],
        angle: 0,
      },
    ],
  },
  siteThemeColor: "#a4a4a4",
  favicon: { mode: "outline" },
  misc: { readingBlur: 0 },
};

export default plainGrayConfig;
