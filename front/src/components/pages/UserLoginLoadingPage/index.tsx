// API & Library
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { auth } from 'api/rest';

// Components
import Button from 'components/atoms/Button';

const UserLoginLoadingPage = () => {
  // Data
  const location = useLocation();

  // Mounted
  useEffect(() => {
    const params = new URLSearchParams(location.search.substring(1));
    console.log('[code]:', params.get('code'));
    // 코드를 받고 다시 백에 넘겨주는 코드
  }, []);

  const clickHandler = async () => {
    console.log('눌렸당');
    // const testData = await auth.login('google');
    const testData = await auth.tokenCodes();
    console.log(testData);
  };

  return (
    <>
      <div>로그인 중 입니다...</div>
      <Button clickHandler={clickHandler} borderColor="red">
        그냥있는 버튼 입니다.
      </Button>
    </>
  );
};

export default UserLoginLoadingPage;
