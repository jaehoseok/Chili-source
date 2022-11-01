import TextAreaBox from 'components/molecules/TextAreaBox';

const ProjectDashBoardPage = () => {
  return (
    <>
      <TextAreaBox
        isRow={false}
        containerWidth={'40rem'}
        textAreaWidth={'40rem'}
        textAreaHeight={'20rem'}
        labelName="나이"
      ></TextAreaBox>
      <div>ProjectDashBoardPage</div>
    </>
  );
};

export default ProjectDashBoardPage;
