import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    :root
    {
        font-family: Gelasio, 'Courier New', Courier, monospace;
        line-height: 1.4;
        font-weight: 400;

        color-scheme: light dark;
        color: ${(prop) => prop.theme.colors['text']};
        background-color: ${(prop) => prop.theme.colors['background_secondary']};

        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

`