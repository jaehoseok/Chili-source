import { createAxiosApi } from 'api/axios';

const REST_PATH = '/widget-service';
const axiosApi = createAxiosApi();

interface payloadType {
  data: number;
}

export default {
  testConnection: (payload: payloadType) => {
    const params = {
      data: payload.data,
    };
    return new Promise((resolve, reject) => {
      axiosApi
        .post(REST_PATH + '/test', params)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
};
