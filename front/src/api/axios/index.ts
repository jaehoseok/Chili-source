import axios from 'axios';

const createAxiosApi = () => {
  // axios intercepter 설정에 따라 수정할 여지 있음
  const AxiosApi = axios.create({
    baseURL: process.env.REACT_APP_SERVER,
    headers: {
      'content-type': 'application/json; charset=UTF-8',
    },
  });

  // AxiosApi.interceptors.request.use(
  //   config => {
  //     if 문으로 토큰 없으면 막을 것
  //     return config;
  //   },
  //   error => {
  //     Promise.reject(error);
  //   },
  // );

  return AxiosApi;
};

export { createAxiosApi };
