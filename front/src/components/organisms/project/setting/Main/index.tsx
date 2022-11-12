import {
  StyledPadding,
  StyledMarginY,
  StyledFlex,
  StyledFlexRowEnd,
  StyledFlexCenter,
  StyledFlexRowItemsCenter,
  StyledInputLogo,
  StyledUserName,
  StyledLabel,
  StyledMarginL,
} from './style';

import Sheet from 'components/atoms/Sheet';
import Circle from 'components/atoms/Circle';
import Button from 'components/atoms/Button';
import Select from 'components/atoms/Select';
import Option from 'components/atoms/Option';
import InputBox from 'components/molecules/InputBox';
import TextAreaBox from 'components/molecules/TextAreaBox';

import { theme } from 'styles/theme';

const index = () => {
  return (
    <>
      <StyledPadding>
        <Sheet width={'70vw'} maxWidth={'900px'} isShadow={true}>
          <StyledFlex>
            <StyledPadding>
              <StyledMarginY>
                <StyledFlexCenter>
                  <Circle height="120px"></Circle>
                  <StyledMarginY>
                    <StyledInputLogo>
                      <input type="file" id="project_update_logo" />
                    </StyledInputLogo>
                  </StyledMarginY>
                </StyledFlexCenter>
                <StyledFlexRowEnd>
                  <Button
                    width="100px"
                    borderColor={theme.button.gray}
                    backgroundColor={theme.button.green}
                    isHover={true}
                  >
                    이미지 수정
                  </Button>
                </StyledFlexRowEnd>
              </StyledMarginY>
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
                <StyledFlexRowEnd>
                  <Button
                    width="100px"
                    borderColor={theme.button.gray}
                    backgroundColor={theme.button.green}
                    isHover={true}
                  >
                    수정
                  </Button>
                </StyledFlexRowEnd>
              </StyledMarginY>
            </StyledPadding>
          </StyledFlex>
        </Sheet>
        <StyledMarginY>
          <Sheet width={'70vw'} maxWidth={'900px'} isShadow={true}>
            <StyledFlex>
              <StyledPadding>
                <StyledMarginY>
                  <InputBox
                    labelName="팀원 초대"
                    isRow={true}
                    containerWidth={'100%'}
                    inputWidth={'70%'}
                    inputHeight={'40px'}
                    labelSize={'1.3rem'}
                    inputPlaceHolder={'초대하고 싶은 팀원의 이메일을 적어주세요!'}
                  ></InputBox>
                </StyledMarginY>
                <StyledMarginY>
                  <StyledFlexRowEnd>
                    <Button
                      width="100px"
                      borderColor={theme.button.gray}
                      backgroundColor={theme.button.green}
                      isHover={true}
                    >
                      팀원 초대
                    </Button>
                  </StyledFlexRowEnd>
                </StyledMarginY>
                <StyledMarginY>
                  <StyledLabel>팀원 변경</StyledLabel>
                  <StyledMarginY>
                    <StyledFlexRowItemsCenter>
                      <Circle height="60px">유저 이미지</Circle>
                      <StyledUserName>김종현</StyledUserName>
                      <Select>
                        <Option messages={['MASTER', 'DEVELOPER']}></Option>
                      </Select>
                      <StyledMarginL />
                      <Button
                        width="70px"
                        borderColor={theme.button.gray}
                        backgroundColor={theme.button.green}
                        isHover={true}
                      >
                        변경
                      </Button>
                      <StyledMarginL />
                      <Button
                        width="70px"
                        borderColor={theme.button.gray}
                        backgroundColor={theme.color.bug}
                        isHover={true}
                      >
                        강퇴
                      </Button>
                    </StyledFlexRowItemsCenter>
                  </StyledMarginY>
                </StyledMarginY>
              </StyledPadding>
            </StyledFlex>
          </Sheet>
        </StyledMarginY>
      </StyledPadding>
    </>
  );
};

export default index;
