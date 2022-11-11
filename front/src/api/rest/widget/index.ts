// API & Library
import { createAxiosApi } from 'api/axios';

// Init
const widgetAxios = createAxiosApi('widget-service');

/**
 * @description
 * http://k7b2071.p.ssafy.io/widget-service/ 이하의 url의 요청을 보낼 프라미스 객체를 리턴하는 함수들
 *
 * @example
 * ```
 * // rest 라이브러리 임포트
 * import { widget } from 'api/rest'
 *
 * // IFFE 방식 또는 프라미스 객체를 활용하는 어떤 방법이던 상관없음
 * ( async () => {const tokenCodes = await widget.getTokenCodes} )();
 * ```
 *
 * @author inte
 */
export default {
  getWidgetList: (projectId: number) => {
    interface responseType {
      id: number;
      name: string;
      widgetRow: number;
      widgetCol: number;
      widgetCode: string;
      requestUrl: string | null;
      detailRequestUrl: string | null;
    }
    return new Promise<responseType[]>((resolve, reject) => {
      widgetAxios
        .get(`/widgets/${projectId}`)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  addWidget: (projectId: number, widgetCodeId: string, widgetCol: number, widgetRow: number) => {
    // Init
    interface requestType {
      name: string;
      projectId: number;
      widgetCodeId: string;
      widgetCol: number;
      widgetRow: number;
    }

    interface responseType {
      message: string;
    }

    // Data
    const payload: requestType = {
      name: '-',
      projectId,
      widgetCodeId,
      widgetCol,
      widgetRow,
    };

    return new Promise<responseType[]>((resolve, reject) => {
      widgetAxios
        .post(`/widgets/`, payload)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  deleteWidget: (widgetId: number) => {
    return new Promise<string>((resolve, reject) => {
      widgetAxios
        .delete(`/widgets/${widgetId}`)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
};
