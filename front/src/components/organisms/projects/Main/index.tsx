import { useNavigate } from 'react-router-dom';

import {
  StyledContainer,
  StyledFlex,
  StyledFlexBetween,
  StyledFlexItemsCenter,
  StyledWidth80,
} from './style';

// COMPONENTS

import Sheet from 'components/atoms/Sheet';
import Button from 'components/atoms/Button';
import Text from 'components/atoms/Text';
import Circle from 'components/atoms/Circle';
const index = () => {
  const navigate = useNavigate();

  const clickToProjectCreateHandler = () => {
    navigate('/new-project');
  };

  return (
    <StyledContainer>
      <StyledFlexBetween>
        <Text
          isFill={false}
          message={'프로젝트 선택'}
          fontSize={'2rem'}
          fontWeight={'900'}
          display={'block'}
        ></Text>
        <Button
          backgroundColor="#a9a9a9"
          width="150px"
          height="50px"
          clickHandler={clickToProjectCreateHandler}
        >
          <Text color="#ffffff" isFill={false} message={'프로젝트 생성'}></Text>
        </Button>
      </StyledFlexBetween>
      <StyledFlex>
        <Sheet width="100%" height="25vh" minHeight="300px" maxWidth="1500px">
          <StyledWidth80>
            <StyledFlexItemsCenter>
              <Circle height={'150px'}>로고 이미지</Circle>
            </StyledFlexItemsCenter>
          </StyledWidth80>
        </Sheet>
      </StyledFlex>
    </StyledContainer>
  );
};

export default index;
