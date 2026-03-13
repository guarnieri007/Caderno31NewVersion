import { ThemeType } from "../interfaces";
import baseUnits from "./baseUnits";

export const defaultDarkTheme: ThemeType = {
  ...baseUnits,
  colors: {
    primary: "#00B2FF",
    primary_hover: "#3a91a5",
    background_primary: "#2E2E2E",
    background_secondary: "#15212b",
    background_card: "#2a323f",
    border_default: "#FFFFFF",
    text: "#DEDBCC",
    text_hover: "#FFFFFF",
    hero_text: "#e0e6f0",
    button_text: "#030303cc",
    button_text_hover: "#030303",
    button_background: "#D8DDED",
    placeHolder: "#aaaaaa",
    placeHolder_focus: "#9aa8aa",
    error: "#b41313",
    success: "#23a93c",
  },
}
