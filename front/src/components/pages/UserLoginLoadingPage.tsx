// API
import { auth } from 'api/rest';

// Components
import Button from 'components/atoms/Button';

const UserLoginLoadingPage = () => {
  // Active 되면 url 에서 code 챙겨

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
