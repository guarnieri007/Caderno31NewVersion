import 'styled-components';
import { darkTheme } from '../themes/default_dark_theme';

type ThemeType = typeof darkTheme

declare module 'styled-components' {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    export interface DefaultTheme extends ThemeType {}
}