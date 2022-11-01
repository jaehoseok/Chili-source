import { StyledLabel, StyledContainer, styledLabelType, styledContainerType } from './style';
import TextArea from 'components/atoms/TextArea';

interface propsType extends styledContainerType, styledLabelType {
  labelName: string;
  textAreaPlaceHolder?: string;
  textAreaValue?: string;
  textAreaWidth?: string;
  textAreaHeight?: string;
}

/**
 * @description
 * TextAreaBox를 생성하는 컴포넌트
 * Row 형태의 InputBox 혹은
 * Column 형태의 InputBox를 생성할 수 있다.
 *
 * @example
 * // flex-column 시
 * <InputBox containerWidth="38rem" containerPadding="20px" inputWidth="30rem" isRow={false} labelName={'이름'}></InputBox>
 * // flex-row 시
 * <InputBox containerWidth="38rem" containerPadding="20px" inputWidth="30rem" isRow={true} labelName={'이름'}></InputBox>
 *
 *
 * @param {string}  labelName         - label 태그에 쓰일 label에 이름
 * @param {string?} labelWeight       - label 태그의 font-weight
 * @param {string?} labelSize         - label 태그의 font-size
 * @param {string?} labelMarginBottom - label 태그의 margin-bottom
 *
 * @param {boolean} isRow             - 현재 InputBox의 flex 방향을 지정하는 값, true-> row, false -> column
 * @param {string?} containerWidth    - flex-container의 전체 width
 * @param {string?} containerPadding  - flex-container의 전체 padding
 *
 * @author bell
 */
const index = ({
  textAreaValue,
  textAreaPlaceHolder,
  textAreaWidth,
  textAreaHeight,
  labelName,
  labelSize,
  labelWeight,
  labelMarginBottom,
  isRow,
  containerWidth,
  containerPadding,
}: propsType) => {
  return (
    <StyledContainer
      isRow={isRow}
      containerPadding={containerPadding}
      containerWidth={containerWidth}
    >
      <StyledLabel
        isRow={isRow}
        labelSize={labelSize}
        labelWeight={labelWeight}
        labelMarginBottom={labelMarginBottom}
      >
        {labelName}
      </StyledLabel>
      <TextArea
        width={textAreaWidth}
        height={textAreaHeight}
        placeholder={textAreaPlaceHolder}
        defaultValue={textAreaValue}
      ></TextArea>
    </StyledContainer>
  );
};

export default index;
