import { ThemeType } from "../../interfaces";
import baseUnits from "./baseUnits";

export const brazilLightTheme: ThemeType = {
  ...baseUnits,
  colors: {
    // --- primary (Brazil green) ---
    primary: "#1B8F4D",
    primary_hover: "#23a455",

    // --- backgrounds ---
    background_primary: "#F3F7F4",
    background_secondary: "#DCE8E2",
    background_card: "#CFE1D8",

    border_default: "#0f3d2e",

    hero_text: "#0b2a55",

    // --- text ---
    text: "#1E2A26",
    text_hover: "#000000",

    // --- buttons ---
    button_text: "#ffffff",
    button_text_hover: "#ffffff",
    button_background: "#1B4DB3", // Brazilian blue

    // --- inputs ---
    placeHolder: "#6b7570",
    placeHolder_focus: "#4f5753",

    // --- status ---
    error: "#d33a3a",
    success: "#2fa44f",
  },
};