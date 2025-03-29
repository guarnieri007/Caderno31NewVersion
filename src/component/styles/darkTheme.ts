import baseUnits from "./baseUnits";

export const darkTheme = {
  ...baseUnits,
    colors: {
      "primary": "#00B2FF",
      "primary_hover": "#535bf2",
      "background_primary": "#21252B",
      "background_secondary": "#242C33",
      "text": "#DEDBCC",
      "text_hover": "#fff",
      "button_text": "#030303cc",
      "button_text_hover": "#030303",
      "button_background": "#B9BECC",
      "placeHolder": "#C2D7F2",
      "error": "#FF3030",
      "success": "#A4FFB5",
    },
  } as const
