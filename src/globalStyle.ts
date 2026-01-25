import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
:root {

    font-family: Consolas, 'Courier New', Courier, monospace;
    line-height: 1.4;
    font-weight: 400;
  
    color-scheme: light dark;
    color: ${(prop) => prop.theme.colors['text']};
    background-color: ${(prop) => prop.theme.colors.background_secondary};
  
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;

    /* --main-padding: ${(prop) => prop.theme.spacings["main-padding"]};  
    --primary-color: ${(prop) => prop.theme.colors.primary};
    --primary-hover-color: ${(prop) => prop.theme.colors.primary_hover};
    --background-color: ${(prop) => prop.theme.colors.background_primary};
    --background-secondary: ${(prop) => prop.theme.colors.background_secondary};
    --text-color: ${(prop) => prop.theme.colors.text};
    --text-color-hover: ${(prop) => prop.theme.colors.text_hover};
    --button-text-color: ${(prop) => prop.theme.colors.button_text};
    --button-text-color_hover: ${(prop) => prop.theme.colors.button_text_hover};
    --button-background-color: ${(prop) => prop.theme.colors.button_background}; */
}

body
{
    padding: 0px;
    margin: 0px;
    background-image: radial-gradient(circle, rgba(100, 100, 100, 0.15) 1px, transparent 1px);/* for the background dots */
    background-size: 4px 4px; /* for the background dots */
    * {
        
    }
}

.defaultPadding {
  @media (max-width: 768px) {
    padding: 24px ${(prop) => prop.theme.spacings.normal};
  }
  display: block;
  box-sizing: border-box;
  width: inherit;
  height: auto;
  overflow: hidden;
  padding: 24px ${(prop) => prop.theme.spacings["main-padding"]};
}

.grid3items > div {
  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr; /* Duas colunas de tamanhos iguais */
    grid-template-rows: auto auto; /* Duas linhas, altura automática */
    gap: 16px; /* gap: [vertical horizontal]; */
    overflow: hidden;
    
    & > :nth-child(1) {
      grid-column: 1; /* Ocupa a primeira coluna */
      grid-row: 1; /* Primeira linha */
      height: 100%;
    }
    
    & > :nth-child(2) {
      grid-column: 2; /* Ocupa a segunda coluna */
      grid-row: 1; /* Primeira linha */
      height: 100%;
    }
  
    & > :nth-child(3) {
      grid-column: 1 / -1; /* Ocupa da primeira à última coluna (ou seja, toda a largura) */
      grid-row: 2; /* Segunda linha */
    }
  }
}


.backgroundStructure {
    display: block;
    width: inherit;
    height: inherit;
    padding: 0px 1rem;
    background-color: ${(prop) => prop.theme.colors.background_primary};
    margin: ${(prop) => prop.theme.spacings.big} 0px;
    
    @media (max-width: 768px) {
      padding: ${(prop) => prop.theme.spacings.big} ${(prop) => prop.theme.spacings.normal};
    }
}

.collectionContainer {
    width: auto;
    height: auto;
    background-color: transparent;
    border-radius: 8px;
    border: 0px solid ${(prop) => prop.theme.colors.text};
    box-sizing: border-box;
    padding: 0px;
  }

  .signupForm {
    width: min(90%, 500px);
    display: block;
    margin: 24px auto;
  }
  .remove-scroll {
    overflow: hidden;
  }

  .noSelection {
    user-select: none;
  }
`