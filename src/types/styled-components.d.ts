import "styled-components";
import { darkTheme } from "@/component/styles/default-theme";

type ThemeType = typeof darkTheme

declare module 'styled-components' {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    export interface DefaultTheme extends ThemeType { }
}