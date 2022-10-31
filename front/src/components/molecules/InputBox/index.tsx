import { StyledLabel, StyledFlex, styledLabelType, styledFlexType } from './style';
import Input from 'components/atoms/Input';

interface propsType extends styledFlexType, styledLabelType {
  labelName: string;
  inputPlaceHolder?: string;
  inputValue?: string;
  inputHeight?: string;
  inputWidth?: string;
  inputType?: string;
}

const index = ({
  inputHeight,
  inputWidth,
  inputValue,
  inputType,
  inputPlaceHolder,
  labelName,
  isRow,
  containerWidth,
  containerPadding,
}: propsType) => {
  return (
    <StyledFlex isRow={isRow} containerPadding={containerPadding} containerWidth={containerWidth}>
      <StyledLabel>{labelName}</StyledLabel>
      <Input
        height={inputHeight}
        width={inputWidth}
        type={inputType}
        placeHolder={inputPlaceHolder}
        value={inputValue}
      ></Input>
    </StyledFlex>
  );
};

export default index;
