// LIBRARY
import { AiOutlineCamera } from 'react-icons/ai';
import Slider from 'react-slick';

import { theme } from 'styles/theme';

// STYLED COMPONENT
import {
  StyledContainer,
  StyledFlex,
  StyledInputBox,
  StyledMarginY,
  StyledLabel,
  StyledFlexRow,
  StyledFlexRowEnd,
  StyledFlexAround,
  StyledWidth80,
  StyledUl,
  StyledLi,
} from './style';

// MOLECULES
import InputBox from 'components/molecules/InputBox';
import TextAreaBox from 'components/molecules/TextAreaBox';

// ATOMS
import Text from 'components/atoms/Text';
import Sheet from 'components/atoms/Sheet';
import Circle from 'components/atoms/Circle';
import Button from 'components/atoms/Button';
import Select from 'components/atoms/Select';
import Option from 'components/atoms/Option';

const index = () => {
  const setting = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <StyledContainer>
      <Text
        isFill={false}
        message={'프로젝트 생성'}
        fontSize={'2rem'}
        fontWeight={'900'}
        display={'block'}
      ></Text>
      <Slider {...setting}>
        <StyledFlex>
          <Sheet width="100%" height="30vh" minHeight="450px" maxWidth="2000px">
            <StyledFlexAround>
              <StyledMarginY>
                <InputBox
                  labelName="Jira 토큰"
                  labelSize="1.3rem"
                  labelMarginBottom="20px"
                  isRow={false}
                  containerWidth="100%"
                ></InputBox>
                <StyledMarginY>
                  <StyledFlexRowEnd>
                    <Button
                      width="100px"
                      borderColor={theme.button.gray}
                      backgroundColor={theme.button.green}
                      isHover={true}
                    >
                      입력
                    </Button>
                  </StyledFlexRowEnd>
                </StyledMarginY>
                <Select width="100%">
                  <Option messages={['프로젝트 1', '프로젝트 2', '프로젝트 3']}></Option>
                </Select>
              </StyledMarginY>
              <StyledMarginY>
                <InputBox
                  labelName="Git 토큰"
                  labelSize="1.3rem"
                  labelMarginBottom="20px"
                  isRow={false}
                ></InputBox>
                <StyledMarginY>
                  <StyledFlexRowEnd>
                    <Button
                      width="100px"
                      borderColor={theme.button.gray}
                      backgroundColor={theme.button.green}
                      isHover={true}
                    >
                      입력
                    </Button>
                  </StyledFlexRowEnd>
                </StyledMarginY>
                <Select width="100%">
                  <Option messages={['프로젝트 1', '프로젝트 2', '프로젝트 3']}></Option>
                </Select>
              </StyledMarginY>
            </StyledFlexAround>
          </Sheet>
        </StyledFlex>
        <StyledFlex>
          <Sheet width="100%" height="30vh" minHeight="450px" maxWidth="2000px">
            <StyledInputBox>
              <StyledMarginY>
                <InputBox
                  labelName="프로젝트명"
                  isRow={true}
                  containerWidth={'100%'}
                  inputWidth={'70%'}
                  inputHeight={'40px'}
                  labelSize={'1.3rem'}
                ></InputBox>
              </StyledMarginY>
              <StyledMarginY>
                <TextAreaBox
                  labelName="프로젝트 상세"
                  isRow={true}
                  containerWidth={'100%'}
                  textAreaWidth={'70%'}
                  textAreaHeight={'100px'}
                  labelSize={'1.3rem'}
                ></TextAreaBox>
              </StyledMarginY>
              <StyledMarginY>
                <StyledFlexRow>
                  <StyledLabel>로고 이미지</StyledLabel>
                  <StyledWidth80>
                    <Circle height="100px" backgroundColor="#f6f6f6">
                      <AiOutlineCamera fontSize={'40px'} color={'#a0a0a0'}></AiOutlineCamera>
                    </Circle>
                    <input type="file" id="project_logo" />
                  </StyledWidth80>
                </StyledFlexRow>
              </StyledMarginY>
            </StyledInputBox>
          </Sheet>
        </StyledFlex>
      </Slider>
    </StyledContainer>
  );
};

export default index;
