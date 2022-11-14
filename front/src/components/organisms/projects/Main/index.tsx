import { useNavigate } from 'react-router-dom';

import { useDeleteProject, useGetProjects } from 'hooks/project';

import { StyledContainer, StyledFlexBetween, StyledProjectWrapper } from './style';

// COMPONENTS
import Button from 'components/atoms/Button';
import Text from 'components/atoms/Text';
import ProjectSummary from 'components/molecules/ProjectSummary';
import { useEffect } from 'react';

const index = () => {
  const navigate = useNavigate();

  const clickToProjectCreateHandler = () => {
    navigate('/new-project');
  };

  const getProjects = useGetProjects();
  const deleteProject = useDeleteProject();

  useEffect(() => {
    if (deleteProject.isSuccess) {
      getProjects.refetch();
    }
  }, [deleteProject.isSuccess]);

  return (
    <StyledContainer>
      <StyledFlexBetween>
        <Text
          isFill={false}
          message={'프로젝트 선택'}
          fontSize={'2rem'}
          fontWeight={'900'}
          display={'block'}
        ></Text>
        <Button
          backgroundColor="#a9a9a9"
          width="150px"
          height="50px"
          clickHandler={clickToProjectCreateHandler}
        >
          <Text color="#ffffff" isFill={false} message={'프로젝트 생성'}></Text>
        </Button>
      </StyledFlexBetween>
      <StyledProjectWrapper>
        {getProjects.data &&
          getProjects.data.map((item, idx) => (
            <ProjectSummary item={item} idx={idx} deleteProject={deleteProject}></ProjectSummary>
          ))}
      </StyledProjectWrapper>
    </StyledContainer>
  );
};

export default index;
