import 'styled-components';
import { ThemeType } from '../interfaces';

type StyledTheme = ThemeType

declare module 'styled-components' {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    export interface DefaultTheme extends StyledTheme {}
}
