import { Sheet } from 'components/atoms/Sheet';
import { Input } from 'components/atoms/Input';

const ProjectDashBoardPage = () => {
  return (
    <>
      <div>ProjectDashBoardPage</div>
      <div>Sheet 디폴트</div>
      <Sheet />

      <div>Sheet 적용 예시</div>
      <Sheet width={200} height={200} backgroundColor="red">
        <img src={require('assets/logo/logo.png')} alt="이미지" />
      </Sheet>

      <div>input 디폴트 값</div>
      <Input type="text" width={200} height={200} placeHolder="입력해주세요" value="초기값" />

      <div>input file 타입 디폴트 값</div>
      <Input type="file" />
    </>
  );
};

export default ProjectDashBoardPage;
