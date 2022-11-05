import { StyledContainer, StyledFlex } from './style';

import Text from 'components/atoms/Text';
import Sheet from 'components/atoms/Sheet';

const index = () => {
  return (
    <StyledContainer>
      <Text
        isFill={false}
        message={'프로젝트 생성'}
        fontSize={'2rem'}
        fontWeight={'900'}
        display={'block'}
      ></Text>
      <StyledFlex>
        <Sheet width="100%" height="40vh"></Sheet>
      </StyledFlex>
    </StyledContainer>
  );
};

export default index;
