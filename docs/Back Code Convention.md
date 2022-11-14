# Back Code Convention

[캠퍼스 핵데이 Java 컨벤션](https://naver.github.io/hackday-conventions-java/)

### 주석

주석은 위에 쓰자

```java
* 옳은 예시
// 주석은 주석주석
System.out.println("주석이 필요한 코딩 내용");

* 틀린 예시
System.out.println("주석이 필요한 코딩 내용"); // 주석은 주석주석
```

### class 다음 변수 선언

바로 밑에 공백 없이 진행

```java
* 옳은 예시
public class User {
	private Long Id;
}

* 틀린 예시
public class User {

	private Long Id;
}
```

### Repository 관련

[QueryDSL](./QueryDSL.md)

생성, 수정 : save

조회 : find

삭제 : delete

### Backend CRUD Method Naming

생성: create

조회: get

수정: update

삭제: delete

### HTTP Status Code

- [ ]  추가 논의 필요

### 성공

**200** ok

### 실패

**400** bad request → 그 외 잘못된 에러들

**401** unauthorized → JWT 안 맞을때

**403** forbidden → refresh 만료됐을때

**404** not found → 요청한거 찾았는데 없을때
