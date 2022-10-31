import { StyledLabel, styledLabelType } from './style';
import Select from 'components/atoms/Select';
import { ReactNode } from 'react';

interface propsType extends styledLabelType {
  labelName: string;
  selectWidth?: string;
  selectSize?: string;
  children?: ReactNode;
}

/**
 * @description
 * InputBox를 생성하는 컴포넌트
 * Row 형태의 InputBox 혹은
 * Column 형태의 InputBox를 생성할 수 있다.
 *
 * @example
 * <SelectBox labelName="이슈유형" selectWidth="30rem">
 *  <Option messages={['스토리', '태스크', '버그']}></Option>
 * </SelectBox>
 *
 * @param {string}  labelName         - label 태그에 쓰일 label에 이름
 * @param {string?} labelWeight       - label 태그의 font-weight
 * @param {string?} labelSize         - label 태그의 font-size
 * @param {string?} labelMarginBottom - label 태그의 margin-bottom
 *
 * @param {string?} selectWidth       - select 태그의 width
 * @param {string?} selectSize        - select 태그 및 option 태그의 font 크기
 * @param {string?} children          - Select 컴포넌트가 이어받을 children 컴포넌트 (<option>)
 *
 * @author bell
 */
const index = ({
  labelName,
  labelSize,
  labelWeight,
  labelMarginBottom,
  selectWidth,
  selectSize,
  children,
}: propsType) => {
  return (
    <>
      <StyledLabel
        labelSize={labelSize}
        labelWeight={labelWeight}
        labelMarginBottom={labelMarginBottom}
      >
        {labelName}
      </StyledLabel>
      <Select width={selectWidth} fontSize={selectSize} children={children}></Select>
    </>
  );
};

export default index;
