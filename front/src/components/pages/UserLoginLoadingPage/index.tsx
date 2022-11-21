// API & Library
import { useLocation, useNavigate } from 'react-router-dom';

import { auth } from 'api/rest';
import { useEffect } from 'react';

const UserLoginLoadingPage = () => {
  // Init
  const locate = useLocation();
  const navigate = useNavigate();

  // const clickHandler = async () => {
  //   // IFFE
  //   await (async () => {
  //     const params = new URLSearchParams(locate.search.substring(1));
  //     console.log('[code]:', params.get('code'));
  //     console.log('[엑세드 토큰 발급 시도]');
  //     try {
  //       await auth.loginCallback('google', params.get('code') || '');
  //     } finally {
  //       location.href = localStorage.getItem('URL') || '/';
  //     }
  //   })();
  // };

  useEffect(() => {
    // IFFE
    (async () => {
      const params = new URLSearchParams(locate.search.substring(1));
      console.log('[code]:', params.get('code'));
      console.log('[엑세드 토큰 발급 시도]');
      try {
        await auth.loginCallback('google', params.get('code') || '');
      } finally {
        location.href = localStorage.getItem('URL') || '/';
      }
    })();
  }, []);

  return (
    <>
      {/* <div onClick={clickHandler}>로그인 중 입니다...</div> */}
      <div> 로그인 중 입니다... </div>
    </>
  );
};

export default UserLoginLoadingPage;
