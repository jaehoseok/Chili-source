import { getTestHandler } from './handlers/example';

/**
 * @description
 * handlers 폴더 내에, 있는 요청 모듈을 총괄하는 페이지
 * 밑의 handlers 변수에 모듈을 집어 넣어야 통신이 가능하다.
 *
 * @author bell
 */

export const handlers = [getTestHandler];
