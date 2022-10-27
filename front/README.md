## 221021

### 종현

- 프론트 초기 셋팅
  - CRA, Typescript 프로젝트 생성
  - jest, testing 모듈 제거
  - msw 초기 셋팅
  - styled-component 초기 셋팅
  - react-router 초기 셋팅
  - 필요한 페이지 생성
  - router 경로 초기 설정
  - css formatinog library 설정
  - eslint + prettier 설정 완료

## 221024

### 종현

- 파일 디렉토리 수정
  - 누락 페이지 생성 `ProjectCreatePage, WidgetSelectPage`
  - 페이지 수정 `issuePage` -> `BucketPage`
- Text 컴포넌트 구현
  - `index.tsx`, `style.ts` 생성
  - 동적 `props` 할당

## 221025

### 종현

- Text 컴포넌트 구현
  - `isFill` 적용, `true` 시 `Fill` 컴포넌트가 `false` 시 `Text` 컴포넌트가 생성됨
  - `Text` 전체 `props` 설정완료
  - `Fill` 컴포넌트 `width`를 통해, 자동 형태 구축할 수 있도록 조정
  - `defaultProps` 수정 완료
- Select 컴포넌트 구현
  - `children` 설정
  - `width`, `font-size` 동적 설정
  - 와이어 프레임과 유사하게 설정

### 준혁

- front/src/RouterWrapper 주소별로 주석 추가함

- front/tsconfig.json 수정

  > - `compilerOptions` 에 `"baseUrl": "src"` 항목을 추가함.
  > - 앞의 경로 언급이 없다면 src/ 부터 생각한다.
  > - `import Something from '../../../components/atom` 같은 항목을 `from components/atom` 으로 선언가능

- atom 제작
  > - style 관련 props 는 style.ts의 styleType에 묶고 index.tsx에서 styleType을 상속한 propsType가 다른 props 들을 정의한다.
  > - defaultStyle 적용
  > - Sheet, Input 만들어둠

## 221026

### 종현

- Tab 컴포넌트 구현
  - `activated` 를 따라 `background-color` 다르게 설정
  - `react-router`를 통한 `link` 이동을 위해 `clickHandler` 설정
- `theme.ts`
  - 필요한 전역 색 설정완료
    - `primary`, `secondary`, `epic`, `bug`, `task`, `story`
- `minireset.min.css`
  - `min` 설정 완료

### 준혁

- MR 수정 요구 적용
  > - `src/components/atom/Sheet/` 와 `Input` 의 index와 style 에 props 값을 구조 분해 할당함
  > - `src/components/atom/input/` 은 InputBox molecule 을 상정하지 않고 개발되어 수정함
