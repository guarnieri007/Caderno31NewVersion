import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
:root {

    font-family: Gelasio, 'Courier New', Courier, monospace;
    line-height: 1.4;
    font-weight: 400;
  
    color-scheme: light dark;
    color: ${(prop) => prop.theme.colors['text-color']};
    background-color: ${(prop) => prop.theme.colors["background-secondary"]};
  
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;

    /* --main-padding: ${(prop) => prop.theme.spacings["main-padding"]};  
    --primary-color: ${(prop) => prop.theme.colors["primary-color"]};
    --primary-hover-color: ${(prop) => prop.theme.colors["primary-hover-color"]};
    --background-color: ${(prop) => prop.theme.colors["background-color"]};
    --background-secondary: ${(prop) => prop.theme.colors["background-secondary"]};
    --text-color: ${(prop) => prop.theme.colors["text-color"]};
    --text-color-hover: ${(prop) => prop.theme.colors["text-color-hover"]};
    --button-text-color: ${(prop) => prop.theme.colors["button-text-color"]};
    --button-text-color_hover: ${(prop) => prop.theme.colors["button-text-color_hover"]};
    --button-background-color: ${(prop) => prop.theme.colors["button-background-color"]}; */
}

body
{
    padding: 0px;
    margin: 0px;
    background-image: radial-gradient(circle, rgba(100, 100, 100, 0.15) 1px, transparent 1px);/* for the background dots */
    background-size: 4px 4px; /* for the background dots */
    * {
        font-family: "Gelasio";
    }
}

.defaultPadding {
    display: block;
    box-sizing: border-box;
    padding: 24px ${(prop) => prop.theme.spacings["main-padding"]};
    width: inherit;
    height: auto;
    overflow: hidden;
}

.backgroundStructure {
    display: block;
    width: inherit;
    height: inherit;
    padding: 24px ${(prop) => prop.theme.spacings["main-padding"]};
    background-color: ${(prop) => prop.theme.colors["background-color"]};
}

.collectionContainer {
    width: auto;
    height: auto;
    background-color: transparent;
    border-radius: 8px;
    border: 1px solid ${(prop) => prop.theme.colors["text-color"]};
    box-sizing: border-box;
    padding: 32px;
    button {
      display: block;
      margin: 40px auto 0px;
    }
  }
`