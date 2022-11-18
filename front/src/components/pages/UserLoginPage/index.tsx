// API & Library
import { useEffect } from 'react';
import { auth } from 'api/rest';

interface propsType {
  path?: string;
}

const UserLoginLoadingPage = () => {
  // LifeCycle
  useEffect(() => {
    if (confirm('로그인이 필요한 기능입니다. 로그인 하시겠습니까?')) {
      (async () => await auth.login('google'))();
    } else {
      location.href = '/';
    }
  }, []);

  return (
    <>
      <div>잠시만 기다려주세요...</div>
    </>
  );
};

export default UserLoginLoadingPage;
