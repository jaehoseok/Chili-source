import { useLocation, useNavigate } from 'react-router-dom';

import { useDeleteProject, useGetProjects } from 'hooks/project';

import {
  StyledContainer,
  StyledFlexBetween,
  StyledProjectWrapper,
  StyledFlexColCenter,
  StyledFlex,
  StyledH4,
} from './style';

import { FaPlus } from 'react-icons/fa';

// COMPONENTS
import Button from 'components/atoms/Button';
import Text from 'components/atoms/Text';
import ProjectSummary from 'components/molecules/ProjectSummary';
import { useEffect } from 'react';
import Sheet from 'components/atoms/Sheet';
import Circle from 'components/atoms/Circle';
import { theme } from 'styles/theme';

/**
 * @description
 * 프로젝트를 선택하는 페이지의 Main 영역
 *
 * @author bell
 */
const index = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getProjects = useGetProjects();
  const deleteProject = useDeleteProject();

  useEffect(() => {
    if (deleteProject.isSuccess) {
      getProjects.refetch();
    }
    if (location.state === 'created') {
      getProjects.refetch();
    }
  }, [deleteProject.isSuccess, location.state]);

  return (
    <StyledContainer>
      <StyledFlex className="sheet">
        <div onClick={() => navigate('/new-project')}>
          <Sheet minWidth="350px" height="450px" isShadow={true} isHover={true}>
            <StyledFlexColCenter>
              <Circle height="100px" backgroundColor={theme.color.primary}>
                <Circle height="90px" backgroundColor={theme.button.white}>
                  <FaPlus className="hover-text" fontSize={'2rem'} color={theme.color.primary} />
                </Circle>
              </Circle>
              <StyledH4 className="hover-text">
                칠리소스와 함께,
                <br />
                새로운 프로젝트를 추가해보세요!
              </StyledH4>
            </StyledFlexColCenter>
          </Sheet>
        </div>

        {getProjects.data &&
          getProjects.data.map((item, idx) => (
            <ProjectSummary item={item} idx={idx} deleteProject={deleteProject}></ProjectSummary>
          ))}
      </StyledFlex>
    </StyledContainer>
  );
};

export default index;
