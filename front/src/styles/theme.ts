// styled-component 테마 설정
// 특정 css를 변수로 넣어 어느 컴포넌트에서든 부르는 것이 가능
const color = {
  primary: '#54C270',
  secondary: '#828282',
  white: '#ffffff',
  black: '#000000',
  epic: '##C0B6F2',
  story: '#64BAC3C',
  bug: '#E5493A',
  task: '#4BADE8',
};

export const theme = {
  color,
};

export type Theme = typeof theme;
