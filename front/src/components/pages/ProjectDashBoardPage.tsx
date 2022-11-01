import { MouseEventHandler } from 'react';

import SelectBox from 'components/molecules/SelectBox';
import Option from 'components/atoms/Option';
import Sheet from 'components/atoms/Sheet';
import Button from 'components/atoms/Button';

const ProjectDashBoardPage = () => {
  const clickHandler = () => {
    console.log('버튼클릭');
  };

  return (
    <>
      <SelectBox labelName="이슈유형" selectWidth="30rem">
        <Option messages={['스토리', '태스크', '버그']}></Option>
      </SelectBox>
      {/* <div>ProjectDashBoardPage</div> */}
      <Button onClick={clickHandler} height={100} width={100} borderColor={'red'}>
        10
      </Button>
      <Sheet height="100px"></Sheet>
    </>
  );
};

export default ProjectDashBoardPage;
