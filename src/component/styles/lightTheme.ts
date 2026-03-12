import { ThemeType } from "../../interfaces";
import baseUnits from "./baseUnits";

export const lightTheme: ThemeType = {
  ...baseUnits,
  colors: {
    primary: "#0C5472",
    primary_hover: "#0095d6",

    // --- backgrounds ---
    // Main page background (soft light, not pure white)
    background_primary: "#F4F6F8",
    border_default: "#000000",

    // Secondary containers
    background_secondary: "#d2dbe4",

    // Cards / panels
    background_card: "#c6d1dc",
    hero_text: "#e0e6f0",

    // --- text ---
    // Main readable text
    text: "#1E2228",

    // Strong hover / titles
    text_hover: "#000000",

    // --- buttons ---
    button_text: "#d6e5fb",
    button_text_hover: "#ffffff",

    // Neutral button bg (keeps your bluish feeling)
    button_background: "#47494b",

    // --- inputs ---
    placeHolder: "#606870",
    placeHolder_focus: "#6b707a",

    // --- status ---
    error: "#d33a3a",
    success: "#2fa44f",
  },
};