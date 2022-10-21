// styled-component 테마 설정
// 특정 css를 변수로 넣어 어느 컴포넌트에서든 부르는 것이 가능
const color = {
  primaryColor: '#321112',
};

export const theme = {
  color,
};

export type Theme = typeof theme;
