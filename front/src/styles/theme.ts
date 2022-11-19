// styled-component 테마 설정
// 특정 css를 변수로 넣어 어느 컴포넌트에서든 부르는 것이 가능

interface issueType {
  [key: string]: string;
  story: string;
  task: string;
  bug: string;
}

const color = {
  primary: '#54C270',
  secondary: '#00875A',
  epic: '#C0B6F2',
  story: '#64BAC3C',
  bug: '#E5493A',
  task: '#4BADE8',
};

const button = {
  green: '#34A853',
  darkgreen: '#00875A',
  red: '#E5493A',
  darkred: '#C31003',
  lightgray: '#F8F8F8',
  gray: '#D9D9D9',
  white: '#FFFFFF',
  black: '#000000',
  darkgray: '#a9a9a9',
};

const issue: issueType = {
  story: '#63BA3C',
  task: '#4BADE8',
  bug: '#E5493A',
};

export const theme = {
  color,
  button,
  issue,
};

export type Theme = typeof theme;
