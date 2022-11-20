// LIBRARY
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// HOOKS
import { useDeleteProject, useGetProjects } from 'hooks/project';
import { useGetUserInfoHandler } from 'hooks/user';

// STYLE
import { StyledContainer, StyledFlexColCenter, StyledFlex, StyledH4 } from './style';
import { theme } from 'styles/theme';

// ICON
import { FaPlus } from 'react-icons/fa';

// COMPONENTS
import ProjectSummary from 'components/molecules/ProjectSummary';
import Notification from 'components/atoms/Notification';
import Sheet from 'components/atoms/Sheet';
import Circle from 'components/atoms/Circle';
import Text from 'components/atoms/Text';

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
  const getUserInfo = useGetUserInfoHandler();

  useEffect(() => {
    if (deleteProject.isSuccess) {
      getProjects.refetch();
    }
    if (location.state === 'created') {
      getProjects.refetch();
    }
  }, [deleteProject.isSuccess, location.state]);

  return (
    <>
      {deleteProject.isSuccess && (
        <Notification
          check={true}
          message="프로젝트가 성공적으로 삭제 되었습니다"
          width="300px"
        ></Notification>
      )}
      <StyledContainer>
        {getProjects.data && getUserInfo.data && (
          <Text
            isFill={false}
            message={`현재 ${getUserInfo.data.name} 님 께서 참여하고 있는 프로젝트는 총 ${getProjects.data.length} 개입니다.`}
            fontSize={'2rem'}
            fontWeight={'700'}
          ></Text>
        )}
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
    </>
  );
};

export default index;
