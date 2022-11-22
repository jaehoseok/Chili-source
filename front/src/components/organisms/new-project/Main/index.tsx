// LIBRARY
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';

// HOOKS
import { useDeleteProject, useGetProjects } from 'hooks/project';

// STYLE
import {
  StyledContainer,
  StyledSliderContainer,
  StyledPadding,
  StyledFlexColCenter,
  StyledMarginY,
  StyledFlex,
} from './style';
import { theme } from 'styles/theme';

// MOLECULES
import ProjectCreate from 'components/molecules/ProjectCreate';
import JiraLinkageToken from 'components/molecules/JiraLinkageToken';
import GitLabLinkageToken from 'components/molecules/GitLabLinkageToken';

// ATOMS
import FillButton from 'components/atoms/FillButton';
import Sheet from 'components/atoms/Sheet';

/**
 * @description
 * 프로젝트 생성 페이지, 지라와 깃을 연동하고
 * 지라의 프로젝트를 가져와 서비스의 프로젝트와 연결하도록 해주는 페이지
 *
 * @author bell
 */
const index = () => {
  const navigate = useNavigate();

  // project 생성시 받을 프로젝트 id 값
  const [projectId, setProjectId] = useState<number>();
  // 프로젝트가 정상적으로 생성되었는지 체크
  const [isCreated, setIsCreated] = useState<boolean>(false);
  // 지라 프로젝트가 정상적으로 연동되었는지 체크
  const [isLinkedJira, setIsLinkedJira] = useState<boolean>(false);
  // 깃 리포지토리가 정상적으로 연동되었는지 체크
  const [isLinkedGitLab, setIsLinkedGitLab] = useState<boolean>(false);

  const deleteProject = useDeleteProject();
  const getProjects = useGetProjects();

  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <StyledContainer>
      <StyledSliderContainer>
        {/* 슬라이더 기능 */}
        <Slider {...settings}>
          <ProjectCreate setIsCreated={setIsCreated} setProjectId={setProjectId} />
          <JiraLinkageToken
            setIsLinkedJira={setIsLinkedJira}
            projectId={projectId}
          ></JiraLinkageToken>
          <GitLabLinkageToken
            setIsLinkedGitLab={setIsLinkedGitLab}
            projectId={projectId}
          ></GitLabLinkageToken>
          <StyledPadding>
            <Sheet width="100%" height={'50vh'} isShadow={true}>
              <StyledPadding style={{ width: '100%' }}>
                <StyledFlexColCenter>
                  {isCreated && isLinkedJira && isLinkedGitLab ? (
                    <>
                      <h2>
                        프로젝트 생성 및 지라 프로젝트,
                        <br />깃 리포지토리 연동이 모두 성공적으로 완료되었습니다!
                      </h2>
                      <StyledMarginY />
                      <StyledMarginY />
                      <FillButton
                        width="200px"
                        backgroundColor={theme.color.primary}
                        hoverColor={theme.color.secondary}
                        clickHandler={() => {
                          getProjects.refetch();
                          setIsCreated(false);
                          setIsLinkedGitLab(false);
                          setIsLinkedJira(false);
                          navigate('/projects');
                        }}
                      >
                        프로젝트 선택 페이지로 이동
                      </FillButton>
                    </>
                  ) : (
                    <>
                      <StyledFlex>
                        <h2>
                          프로젝트 생성 혹은 지라 프로젝트, 깃 리포지토리 연동 도중 문제가
                          발생하였습니다.
                        </h2>
                      </StyledFlex>
                      <StyledMarginY />
                      <StyledMarginY />
                      <FillButton
                        width="200px"
                        backgroundColor={theme.color.bug}
                        hoverColor={theme.color.primary}
                        clickHandler={() => {
                          deleteProject.mutateAsync({ projectId: projectId as number }).then(() => {
                            getProjects.refetch();
                          });
                          setIsCreated(false);
                          setIsLinkedGitLab(false);
                          setIsLinkedJira(false);
                          navigate('/projects');
                        }}
                      >
                        나가기
                      </FillButton>
                    </>
                  )}
                </StyledFlexColCenter>
              </StyledPadding>
            </Sheet>
          </StyledPadding>
        </Slider>
      </StyledSliderContainer>
    </StyledContainer>
  );
};

export default index;
