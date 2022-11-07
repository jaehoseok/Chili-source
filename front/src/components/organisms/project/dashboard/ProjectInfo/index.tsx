// Library
import { ReactNode } from 'react';

// Styles
import { StyledProjectInfo, StyledProjectInfoLine, styledType } from './style';

// Components
import Circle from 'components/atoms/Circle';

interface propsType extends styledType {
  children?: ReactNode;
}

/**
 * @description
 * 만드는 중 입니다.
 *
 * @author inte
 */
export const ProjectInfo = ({ children }: propsType) => {
  return (
    <>
      <StyledProjectInfo>
        <Circle></Circle>
        <div>프로젝트 명</div>
        <div>프로젝트 상세 설명</div>
        <div>{children}</div>
        <StyledProjectInfoLine />
      </StyledProjectInfo>
    </>
  );
};
