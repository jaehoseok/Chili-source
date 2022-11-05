// LIBRARY
import { AiOutlineCamera } from 'react-icons/ai';
import Slider from 'react-slick';

// STYLED COMPONENT
import {
  StyledContainer,
  StyledFlex,
  StyledInputBox,
  StyledMarginY,
  StyledLabel,
  StyledFlexRow,
  StyledWidth80,
} from './style';

// COMPONENTS
import Text from 'components/atoms/Text';
import Sheet from 'components/atoms/Sheet';
import InputBox from 'components/molecules/InputBox';
import TextAreaBox from 'components/molecules/TextAreaBox';
import Circle from 'components/atoms/Circle';

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
        <div>
          <StyledFlex>
            <Sheet width="100%" height="50vh" minHeight="450px" maxWidth="2000px">
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
        </div>
        <div>asdf</div>
      </Slider>
    </StyledContainer>
  );
};

export default index;
