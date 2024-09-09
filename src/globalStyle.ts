import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
:root {

    font-family: Gelasio, 'Courier New', Courier, monospace;
    line-height: 1.4;
    font-weight: 400;
  
    color-scheme: light dark;
    color: var(--text-color);
    background-color: var(--background-secondary);
  
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    --main-padding: 56px;
  
    --primary-color: ${(prop) => prop.theme["primary-color"]};
    --primary-hover-color: ${(prop) => prop.theme["primary-hover-color"]};
    --background-color: ${(prop) => prop.theme["background-color"]};
    --background-secondary: ${(prop) => prop.theme["background-secondary"]};
    --text-color: ${(prop) => prop.theme["text-color"]};
    --text-color-hover: ${(prop) => prop.theme["text-color-hover"]};
    --button-text-color: ${(prop) => prop.theme["button-text-color"]};
    --button-text-color_hover: ${(prop) => prop.theme["button-text-color_hover"]};
    --button-background-color: ${(prop) => prop.theme["button-background-color"]};
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
    padding: 24px var(--main-padding);
    width: inherit;
    height: auto;
    overflow: hidden;
}

.backgroundStructure {
    display: block;
    width: inherit;
    height: inherit;
    padding: 24px var(--main-padding);
    background-color: var(--background-color);
}
`