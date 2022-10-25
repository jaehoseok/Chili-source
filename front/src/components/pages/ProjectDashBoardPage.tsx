import { Sheet } from 'components/atoms/Sheet';
import { Input } from 'components/atoms/Input';

const ProjectDashBoardPage = () => {
  return (
    <>
      <div>ProjectDashBoardPage</div>
      {/* Sheet 디폴트 값 */}
      <Sheet />

      {/* Sheet 적용 예시 */}
      <Sheet width={200} height={200} backgroundColor="red">
        <img src={require('assets/logo/logo.png')} alt="이미지" />
      </Sheet>

      {/* Input 디폴트 값 */}
      <Input />
    </>
  );
};

export default ProjectDashBoardPage;
