// API & Library
import { useLocation, useNavigate } from 'react-router-dom';

import { useGetUserInfoHandler } from 'hooks';

import { auth } from 'api/rest';

const UserLoginLoadingPage = () => {
  // Init
  const location = useLocation();
  const navigate = useNavigate();

  // 유저 정보 저장
  useGetUserInfoHandler();

  const clickHandler = async () => {
    // IFFE
    await (async () => {
      const params = new URLSearchParams(location.search.substring(1));
      console.log('[code]:', params.get('code'));
      console.log('[엑세드 토큰 발급 시도]');
      try {
        await auth.loginCallback('google', params.get('code') || '');
      } finally {
        navigate(localStorage.getItem('URL') || '/');
      }
    })();
  };

  return (
    <>
      <div onClick={clickHandler}>로그인 중 입니다...</div>
    </>
  );
};

export default UserLoginLoadingPage;
