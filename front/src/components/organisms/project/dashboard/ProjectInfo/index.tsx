// Library
import { ReactNode, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProject } from 'hooks/project';

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
  // Init
  const { projectId } = useParams();
  const getProject = useGetProject(Number(projectId)).data;

  return (
    <>
      <StyledProjectInfo>
        <Circle height={'150px'} isImage={true} url={getProject ? getProject.image : ''} />
        <div>{getProject && getProject.name ? getProject.name : '[빈 프로젝트 명]'}</div>
        <div>{getProject && getProject.description ? getProject.description : '[빈 프로젝트]'}</div>
        <div>{children}</div>
        <StyledProjectInfoLine />
      </StyledProjectInfo>
    </>
  );
};
