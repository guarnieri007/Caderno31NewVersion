import { ThemeType } from "../../interfaces";
import baseUnits from "./baseUnits";

export const brazilDarkTheme: ThemeType = {
  ...baseUnits,
  colors: {
    // --- primary (Brazil green) ---
    primary: "#1FAA59",
    primary_hover: "#28c76f",

    // --- backgrounds ---
    background_primary: "#1C1F1E",
    background_secondary: "#0F1A18",
    background_card: "#1F2A28",

    border_default: "#E8E8E8",

    // --- text ---
    text: "#E4E6E7",
    text_hover: "#FFFFFF",

    hero_text: "#d7e9ff",

    // --- buttons ---
    button_text: "#0f0f0f",
    button_text_hover: "#000000",
    button_background: "#FFD447", // Brazilian yellow

    // --- inputs ---
    placeHolder: "#a0a6a9",
    placeHolder_focus: "#c0c6c9",

    // --- status ---
    error: "#d64545",
    success: "#2ecc71",
  },
};