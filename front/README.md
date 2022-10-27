## 221021
### 종현
  + 프론트 초기 셋팅
    + CRA, Typescript 프로젝트 생성
    + jest, testing 모듈 제거
    + msw 초기 셋팅
    + styled-component 초기 셋팅
    + react-router 초기 셋팅
    + 필요한 페이지 생성
    + router 경로 초기 설정
    + css formatinog library 설정
    + eslint + prettier 설정 완료

## 221024
### 종현
  + 파일 디렉토리 수정
    + 누락 페이지 생성 `ProjectCreatePage, WidgetSelectPage`
    + 페이지 수정 `issuePage` -> `BucketPage`
  + Text 컴포넌트 구현
    + `index.tsx`, `style.ts` 생성
    + 동적 `props` 할당

## 221025
### 종현
  + Text 컴포넌트 구현
    + `isFill` 적용, `true` 시 `Fill` 컴포넌트가 `false` 시 `Text` 컴포넌트가 생성됨
    + `Text` 전체 `props` 설정완료
    + `Fill` 컴포넌트 `width`를 통해, 자동 형태 구축할 수 있도록 조정 
    + `defaultProps` 수정 완료
  + Select 컴포넌트 구현
    + `children` 설정
    + `width`, `font-size` 동적 설정
    + 와이어 프레임과 유사하게 설정


## 221026
### 종현
  + Tab 컴포넌트 구현
    + `activated` 를 따라 `background-color` 다르게 설정
    + `react-router`를 통한 `link` 이동을 위해 `clickHandler` 설정
  + `theme.ts`
    + 필요한 전역 색 설정완료
      + `primary`, `secondary`, `epic`, `bug`, `task`, `story`
  + `minireset.min.css`
    + `min` 설정 완료

## 221027
### 종현
  + `navProject` 컴포넌트
    + 디자인 완료
    + `tabs` 데이터 설정
      + `프로젝트 데이터를 가지고 있는 상태값
    + `activatedToggleHandler` : 하나의 `tab`이 활성화되면, 다른 `tab`은 비활성화 화는 이벤트
    