# Front Code Convention

### typescript deep-dive style guide

[스타일 가이드](https://radlohead.gitbook.io/typescript-deep-dive/styleguide)

### class 101 프론트 컨벤션

[Frontend Code Style Guide](https://jobs.class101.net/1dc83442-c2d4-4162-94ae-4d04717f1ae0)

### 개인 블로그 프론트 컨벤션

[[react] react 코딩 컨벤션](https://phrygia.github.io/react/2022-04-05-react/)

### Styled component

[React Styled-components Naming Convention 이름 규칙](https://usgnuscodenote.tistory.com/entry/Styled-components-Naming-Convention-%EC%9D%B4%EB%A6%84-%EA%B7%9C%EC%B9%99)

## 린트 적용 방법

1. gts 사용해서 설정한다.
2. eslint + prettier + lint 설정 템플릿 (facebook, react, airbnb, amazon)

- 변수
    
    ```jsx
    // camelCase
    // 상수 UPPER_CASE
    // boolean은 is-
    
    // 아무렇게 쓰지 말것
    // const a [x]
    // function (a,b,c) => [x]
     
    // 설명이 필요한 부분엔
    // 주석을 써주자
    ```
    
- 함수명
    - 모듈
        
        ```jsx
        // 카멜 케이스
        // const getData()
        // export dafault getData;
        ```
        
    - 이벤트 함수명
        
        ```jsx
        // 동사로 시작
        // 카멜 케이스
        // -handler()로 끝남
        ```
        
    - 비동기 함수명
        
        ```jsx
        // 기존 일반 함수 컨벤션 사용
        // 단, 앞의 동사는 요청하는 METHOD 방식과 동일하게 get,post,update,delete 식으로 시작할 것!
        // getFoodData
        
        // 단, 이 형식과 어울리지 않는 요청 ex) login, signup, logout 이런 애들의 경우는 예외로 한다.
        // 잘 모르겠으면 함께 의논해볼 것!
        ```
        
- 스타일 컴포넌트 명
    
    ```jsx
    // <Styled->
    // style.ts 내에 모듈화 되어있어야 한다.
    ```
    
- 파일명
    - 컴포넌트 함수명
        
        ```jsx
        // PascalCase
        
        // ATOMS 
        // Button/index.tsx, style.ts
        // Button, Input, Text...
        
        // MOLECULES 
        // Modal/index.tsx, style.ts
        // NavProject/index.tsx, style.ts [{idx:1},{}]
        // NavWidget/index.tsx, style.ts 
        
        // ORGANISMS 
        // /common/Header/index.tsx, style.ts
        // /widget/ganttChart/SideBar/index.tsx style.ts
        // /widget/ganttChart/Main/indext.tsx style.ts
        
        // PAGES 경로별
        // /CalendarPage/index.tsx style.ts
        ```
        
- import 시 묶음 규칙
    
    ```jsx
    // import React 관련라이브러리
    
    // import api 관련
    
    // import css 관련
    
    // import components
    
    // 줄바꿈은 한칸 씩
    ```
    
- jsDocs, 주석
    
    ```jsx
    // component
    // @description 
    // @author
    // 꼭 작성할것
    
    // 함수의 경우 export 한 것은 무조건 쓴다.
    
    // 이해하기 어렵다고 판단되는 함수도 쓰는 것을 장려한다.
    
    // 주석 많이많이 완전 오키
    ```
    
- propsType, styledType
    
    ```jsx
    // props를 사용하니, 
    // 동적 css를 위해 오는 친구들과, 실제 데이터 연결을 위해 오는 친구들이 있다.
    // 동적 css를 전담하는 interface인 styledTypes를 만들고
    // propTypes가 상속받게 한다면, 확장성 및 분리가 전담되는 형태로
    // 만들 수 있다고 판단했다.
    export interface styledType {
    	fontFamily?: string;
      fontWeight?: string;
      color?: string;
      fontSize?: string;
      backgroundColor?: string;
      width?: number;
    }
    
    interface propsType extends styledType {
      children: ReactNode;
    }
    ```
    

## 코드리뷰

1. 머지 리퀘스트를 요청 한다.
    - 해당 코드의 설명이나 스크린샷을 description 적는다.
        
        ![스크린샷 2022-10-20 오후 2.38.20.png](images/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2022-10-20_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_2.38.20.png)
        
    - mm talk 채널에 머지 리퀘스트 링크와 다른 프론트팀원에게 머지를 올렸다는 메시지를 보낸다.
    - 대면에 작업중인 경우에는 구두로도 가능하다.
    - 리뷰를 하는 사람은 머지 리퀘스트가 있는 경우, 요청에 즉시 응한다.
2. 리뷰자는 리뷰를 진행한다.
    - change 된 부분들을 유심히 살펴보면서, convention에 맞게 작성햇는지, 해당 함수, 컴포넌트가 어떤 식으로 만들어졌는지 이해한다.
    - 잘못된 코드, 이해가 가지 않는 코드의 경우, 해당 부분에 comment를 남긴다.
    - 머지 요청자는 리뷰를 검토하고, 코드를 다시 수정하여 commit push 한다.
        
        ![스크린샷 2022-10-20 오후 2.41.32.png](images/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2022-10-20_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_2.41.32.png)
        
    - 리뷰자는 다시 검토를 한다.
        - 코드 이해 및 컨벤션이 옳다고 판단하면 approve 누른다.
        - 다른 단점이 발견되면 다시 comment를 남겨, 다시 리뷰를 진행한다
3. 모두가 승인이 완료되면 머지 요청자가 병합한다.
4. 남은 프론트 사람들이 pull 한다.
5. 30분 이상 지연되는 경우, 리뷰를 종료하고 자체적으로 병합을 실행한다.