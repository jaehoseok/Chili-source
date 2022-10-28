import { Theme } from '../styles/theme';
import { CSSObject, CSSProp } from 'styled-components';

// ThemeProvider에 추가할 theme 타입 선언
declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}

// 각 요소의 css 속성에 추가할 CSS 값 타입 선언
declare module 'react' {
  interface Attributes {
    css?: CSSProp | CSSObject;
  }
}
