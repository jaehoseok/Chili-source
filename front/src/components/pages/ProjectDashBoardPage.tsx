import SelectBox from 'components/molecules/SelectBox';
import Option from 'components/atoms/Option';

const ProjectDashBoardPage = () => {
  return (
    <>
      <SelectBox labelName="이슈유형" selectWidth="30rem">
        <Option messages={['스토리', '태스크', '버그']}></Option>
      </SelectBox>
      {/* <div>ProjectDashBoardPage</div> */}
    </>
  );
};

export default ProjectDashBoardPage;
