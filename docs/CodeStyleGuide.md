# Java, JavaScript , DB의 Style Guide 



## Style Guide **목표 및 목적:**

> 모든 사람이 코드와 데이터베이스의 형태 파악과 데이터베이스에 포함한 모든 개체가 가진 목적을 쉽게 파악하게 하기 위함

## **Code convention**

Java와 TypeScript는 아래 Code Convention을 준수합니다

- [Back Code Convention](./Back Code Convention.md)

- [Front Code Convention](./Front Code Convention.md)

  

## **Data** Style Guide  

Data naming**은 공통 + 7가지 객체로 나누어 각각 정의한다

- 공통
  - 30글자 이내의 이름을 가진다.
    - 짧을 수 록 좋다
  - 약어는 사용하지 않는다
    - 오역을 가져다 줌으로 피한다.
    - 짧은것보다 확실한게 좋다!
  - 공백은 사용하지 않는다
    - 시스템이 허용해도 공백은 사용하지 않는다
  - 영문이나 ‘_’만을 사용한다.
    - 영문외에 한글이나 다른 글자를 사용하면 사용하는데 어려움이 있다.
    - 특수문자도 사용하는데 어려움
  - 두개의 글자를 합한 형태의 글자는 피한다
    - 어떤 두 문자어는 하나 이상의 의미를 가질수 있기때문
  - 읽을수 있는 이름으로 정한다.
    - 서로 소통할때 이야기 할 수 있도록
- Table
  - 간결하게 사용한다.
    - 객체의 일부분이 테이블의 이름을 참고하여 지을 수 있도록
    - 어떤 시스템(오라클 30글자)에서는 글자수 제한이 있다
  - 테이블명은 단수형을 사용한다
  - 소문자만을 사용하며 두글자 이상의 단어는 ‘_’을 이용하는 snake case 방식을 사용한다.
  - 공백문자나 약어는 사용하지 않는다
- Columns
  - auto increment 속성의 PK를 대리키로 사용하는 경우, "테이블 이름"_id 의 규칙으로 명명한다.
    - PK와 id를 명확히 구분하여 사용할 수 있고, 테이블명만으로도 id를 알 수 있도록
  - 이름을 구성하는 각각의 단어를 underscore 로 연결하는 snake case 를 사용한다.
  - foreign key 컬럼은 부모 테이블의 primary key 컬럼 이름을 그대로 사용한다.
    - 달라질 경우 참조하는 컬럼을 헷갈릴 수 있다.
    