import { rest } from 'msw';

/**
 *
 * @description
 * 목업 요청 핸들러를 설정하는 파일
 * 해당 모듈은 exaple용이다.
 * 해당 모듈을 생성할 때는 추후 api 명세에 맞춰, example.ts를 참고하여 설정해주자.
 *
 * @author bell
 */

// 첫번째 매개변수가 경로가 되고
// 두번째 매개변수가 응답이 된다.
// 추후 비동기 시 첫번째 매개변수에 적은 요청값을 날리면,
// 해당 응답이 와야 정상적으로 통신된 것이다.
export const getTestHandler = rest.get('/test', (req, res, ctx) =>
  res(ctx.json(['김종현', '박성현', '빅준혁', '박태이', '석재호', '최진호', 'msw 성공!'])),
);
