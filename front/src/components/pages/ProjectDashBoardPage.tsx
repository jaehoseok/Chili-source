import InputBox from 'components/molecules/InputBox';

const ProjectDashBoardPage = () => {
  return (
    <>
      <InputBox
        containerWidth="33rem"
        containerPadding="20px"
        inputWidth="30rem"
        isRow={true}
        labelName={'이름'}
      ></InputBox>
      {/* <div>ProjectDashBoardPage</div> */}
    </>
  );
};

export default ProjectDashBoardPage;
