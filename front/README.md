## 221021

### 종현

- 프론트 초기 셋팅
  > - `CRA, Typescript` 프로젝트 생성
  > - `jest, testing` 모듈 제거
  > - `msw` 초기 셋팅 완료
  > - `styled-component` 초기 셋팅 완료
  > - `react-router` 초기 셋팅 완료
  > - 필요한 페이지 생성
  > - `router` 경로 초기 설정 완료
  > - `minireset.min.css` 설정 완료
  > - `eslint + prettier` 설정 완료

## 221024

### 종현

- 파일 디렉토리 수정
  > - 누락 페이지 생성 `ProjectCreatePage, WidgetSelectPage`
  > - 페이지 수정 `issuePage` -> `BucketPage`
- Text 컴포넌트 구현
  > - `index.tsx`, `style.ts` 생성
  > - 동적 `props` 할당

## 221025

### 종현

- Text 컴포넌트 구현
  > - `isFill` 적용, `true` 시 `Fill` 컴포넌트가 `false` 시 `Text` 컴포넌트가 생성됨
  > - `Text` 전체 `props` 설정완료
  > - `Fill` 컴포넌트 `width`를 통해, 자동 형태 구축할 수 있도록 조정
  > - `defaultProps` 수정 완료
- Select 컴포넌트 구현
  > - `children` 설정
  > - `width`, `font-size` 동적 설정
  > - 와이어 프레임과 유사하게 설정

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

### 성현

- Button
  > - `backgroundColor`, `borderColor` default값 #FFFFFF로 설정. 사용 시 주의
  > - `isHover` 적용 시 hover 기능 추가. 색상은 `borderColor` 색상을 따라감.
  > - `isDisabled` 적용 시 버튼 비활성화. 비활성화 시 클릭 불가

## 221026

### 종현

- Tab 컴포넌트 구현
  > - `activated` 를 따라 `background-color` 다르게 설정
  > - `react-router`를 통한 `link` 이동을 위해 `clickHandler` 설정
- `theme.ts`
  > - 필요한 전역 색 설정완료
  > - `primary`, `secondary`, `epic`, `bug`, `task`, `story`
- `minireset.min.css`
  > - `min` 형태로 재설정

### 준혁

- MR 수정 요구 적용
  > - `src/components/atom/Sheet/` 와 `Input` 의 index와 style 에 props 값을 구조 분해 할당함
  > - `src/components/atom/Sheet/` 와 `Input` 의 height, width 는 기존 넘버에서 px, rem 등 다양한 상황을 위하여 문자열 타입으로 변경함
  > - `src/components/atom/input/` 은 InputBox molecule 을 상정하지 않고 개발되어 수정함

### 성현

- Circle
  > - 디자인 효과 `isDropShadow`, `isInnerShadow` 추가. 각각 Figma의 Drop Shadow, Inner Shadow 효과 부여
  > - 클릭 효과 `isClickable` 추가. cursor: pointer 기능 부여

## 221027

### 종현

- `navProject` 컴포넌트
  > - 디자인 완료
  > - `tabs` 데이터 설정
  > - `activatedToggleHandler` : 하나의 `tab`이 활성화되면, 다른 `tab`은 비활성화 화는 이벤트

### 준혁

- `src\components\molecules\WidgetBlock` 제작

  > - 디폴트 값은 높이 180px, 넓이 400px 이다.

- 전체 프리텐다드 글꼴 적용

  > - `src\index.css` 에 해당 폰트 적용

  > ```css
  > code {
  >   font-family: Pretendard, source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  > }
  >
  > @font-face {
  >   font-family: 'Pretendard';
  >   src: url('assets/font/PretendardVariable.ttf');
  > }
  > ```

- `.gitignore` 설정 추가

  > - 깃에 올리지 않을 테스트 용 코드를 사용하기 위해 다음의 법칙을 추가함
  > - `*.local.*`

### 성현

- TextArea
  > - defaultValue 옵션 적용. React에서는 value 옵션 적용 시 수정이 불가능했음

## 221028

### 종현

- `NavProject` 컴포넌트
  > - `closeTabHandler` : `tab`을 삭제하는 이벤트
  > - `closeTabHandler` 에러
  > - 컴포넌트 제 랜더링 시 이전의 idx가 그대로 반영되는 에러
  > - idx가 가지고 있는 데이터 갯수보다 큰 경우와 0보다 작은 경우로 나누어 해결
  > - `recoil - projectList` 로 프로젝트 데이터 이동
  > - 삭제 이벤트, `activate` 이벤트 모두 정상작동
- `recoil` 설치
  > - `recoil` 세팅
  > - `recoil` `project` 관리용 `atoms` 생성

### 준혁

- `src\components\molecules\WidgetBlock` tailwindcss 를 twin macro 기반 적용

### 성현

- Button, Circle, TextArea
  > - props 컨벤션 적용
  > - tailwind 적용

## 221029

### 종현

- `NavProject` 컴포넌트, 이벤트 구성 완료
  > - 실제 브라우저 탭과 동일한 기능을 반영
  > - 실제 서비스 플로우와 연결 시 에러날 가능성 있음
  > - 문제가 나면 일단 그때 찾아보자
  > - 특정 경로에서 `HeaderNav` 적용되지 않도록 적용
  > - 탭 클릭 시 `projects/:projectId`로 이동
  > - 모든 프로젝트 탭 종료 시 `ProjectSelectPage`로 이동하게 설정

## 221030

### 종현

- `NavWidget` 컴포넌트, 이벤트 구성 완료
  > - `recoil` projectList 데이터에 widgetList 추가
  > - `NavProject`의 삭제, 토글 이벤트와 동일하게 적용
  > - 해당 `widget` 탭마다 경로 이동하도록 설정
  > - 대시보드 페이지 및 위젯 생성 페이지는 삭제가 이루어지지 않도록 설정

### 준혁

- 드래그 앤 드롭을 위한 사전 세팅

  > - 클래스를 조건에 맞춰서 조작하는 라이브러리 설치
  >
  > ```
  > npm install --save @types/classnames
  > ```
  >
  > - 테스트 시, 드래그하는 객체의 PK 값을 위한 PK 생성 라이브러리 설치
  >
  > ```
  >
  > npm i --save-dev @types/shortid
  >
  > ```
  >
  > - 드래그 앤 드랍을 구현해주는 라이브러리 설치
  >
  > ```
  >
  > react-dnd install
  >
  > ```
  >
  > - onDrag 에 타입을 설정하지 않는다면 Uncaught Invariant Violation: spec.type must be defined 에러를 뱉으니 주의

## 221031

### 종현

- `InputBox` 컴포넌트 구현
  > - `isRow` 값 마다 `row` 혹은 `column` 방향의 컴포넌트 생성
  > - `label~` label에 대한 style 및 값을 담당
  > - `Container~` box 전체의 style을 담당
  > - `Input~` Input 컴포넌트에 필요한 props를 담당
- `Option` 컴포넌트 구현
  > - `string[]` 데이터를 보내는 경우, 자동으로 배열 갯수만큼 `<option>` 태그를 반환하는 컴포넌트
- `SelectBox` 컴포넌트 구현
  > - 기본 디자인 구현 완료
  > - `Option` 태그 안에 `img, svg`가 적요되지 않는 문제 발생
  > - 찾아본 결과, 기본 리액트 안에서는 `<option>`에 컴포넌트나 이미지가 반영되지 않음
  > - 이를 위한 대안으로 `react-select` 라이브러리 있음
  > - `selectBox` 를 많이 사용하지 않아서, 설치 없이 `icon`을 반영하지 않는 것으로 결정

### 준혁

- `DashBoard` 페이지 구현
  > - 드래그앤 드롭에 맞게 페이지 조작
  > - 행과 열로 통제

## 221101

### 종현

- `Notification` 컴포넌트 구현
  > - `check` 값에 따라 에러 혹은 확인 요청을 알려줌
  > - `message` prop에 메시지를 담을 수 있음
  > - `width` 값 설정 가능
  > - `millisecond`를 통해, 애니메이션 지속 시간 설정 가능
- `TextAreaBox` 컴포넌트 구현
  > - `isRow` 값 마다 `row` 혹은 `column` 방향의 컴포넌트 생성
  > - `label~` label에 대한 style 및 값을 담당
  > - `Container~` box 전체의 style을 담당
  > - `TextArea~` Input 컴포넌트에 필요한 props를 담당
- `TextArea` 컴포넌트 수정
  > - `width`, `height`의 타입을 `string` 으로 수정
  > - `styled.input` -> `styled.textarea`

### 준혁

- `components/atoms/Sheet` props 수정
- `api/rest` 제작
  > -
- `Token` 저장 위치에 대한 장단점에 대한 학습
- CSRF 공격 : Cross Site Request Forgery, 정상적인 request를 중간에 가로채 변조된 request 를 보내 피해자의 요청인 척 보안을 뚫는 공격
- XSS 공격 : Cross Site Scripting, 또는 code injection attack, 인젝션 에러, 악의적인 js 코드를 서버가 읽게 하는 공격
- 일반적으로 토큰은 localStorage나 cookie에 저장함. 장단이 존재
- localStorage에 저장 시,
  - js 코드에 의하여 헤더에 토큰이 담겨 CSRF 공격에 안전함
  - 공격자가 로컬스토리지 토큰 값을 쉽게 조작하므로 XSS 공격에 매우 취약
- cookie에 저장 시,
  - httpOnly 옵션 시, Js에서 쿠키 접근 자체가 불가하여 XSS 공격에 안전함
  - 토큰이 자동으로 request에 실리므로 CSRF 공격에 취약

1. localStorage에 저장
   👍 장점
   CSRF 공격에는 안전하다.
   그 이유는 자동으로 request에 담기는 쿠키와는 다르게
   js 코드에 의해 헤더에 담기므로 XSS를 뚫지 않는 이상
   공격자가 정상적인 사용자인 척 request를 보내기가 어렵다.

👎 단점
XSS에 취약하다.
공격자가 localStorage에 접근하는 Js 코드 한 줄만 주입하면
localStorage를 공격자가 내 집처럼 드나들 수 있다.

세션 저장시
👍 장점
XSS 공격으로부터 localStorage에 비해 안전하다.

쿠키의 httpOnly 옵션을 사용하면 Js에서 쿠키에 접근 자체가 불가능하다.
그래서 XSS 공격으로 쿠키 정보를 탈취할 수 없다.
(httpOnly 옵션은 서버에서 설정할 수 있음)

하지만 XSS 공격으로부터 완전히 안전한 것은 아니다.
httpOnly 옵션으로 쿠키의 내용을 볼 수 없다 해도
js로 request를 보낼 수 있으므로 자동으로 request에 실리는 쿠키의 특성 상
사용자의 컴퓨터에서 요청을 위조할 수 있기 때문.
공격자가 귀찮을 뿐이지 XSS가 뚫린다면 httpOnly cookie도 안전하진 않다.

참고 : 'About XSS Attack' 부분 참고

👎 단점
CSRF 공격에 취약하다.
자동으로 http request에 담아서 보내기 때문에
공격자가 request url만 안다면
사용자가 관련 link를 클릭하도록 유도하여 request를 위조하기 쉽다.
