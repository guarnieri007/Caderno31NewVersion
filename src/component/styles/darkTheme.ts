import { ThemeType } from "../../interfaces";
import baseUnits from "./baseUnits";

export const darkTheme: ThemeType = {
  ...baseUnits,
  colors: {
    primary: "#00B2FF",
    primary_hover: "#3a91a5",
    background_primary: "#21252B",
    background_secondary: "#222a32",
    background_card: "#2f343d",
    border_default: "#fff",
    text: "#DEDBCC",
    text_hover: "#fff",
    hero_text: "#e0e6f0",
    button_text: "#030303cc",
    button_text_hover: "#030303",
    button_background: "#B9BECC",
    placeHolder: "#aaaaaa",
    placeHolder_focus: "#aa9",
    error: "#b41313",
    success: "#23a93c",
  },
}
