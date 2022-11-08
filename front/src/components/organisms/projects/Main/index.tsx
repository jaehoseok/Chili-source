import { useNavigate } from 'react-router-dom';

import { useDeleteProject, useGetProjects } from 'hooks/project';

import { theme } from 'styles/theme';

import {
  StyledContainer,
  StyledFlex,
  StyledFlexBetween,
  StyledFlexItemsCenter,
  StyledFlexColumn,
  StyledWidth100px,
  StyledWidth80,
  StyledMarginY,
  StyledProjectWrapper,
} from './style';

// IMAGE
// import example from 'assets/logo/ssafyLogo2.png';
// import user1 from 'assets/images/user1.png';

// COMPONENTS
import Sheet from 'components/atoms/Sheet';
import Button from 'components/atoms/Button';
import Text from 'components/atoms/Text';
import Circle from 'components/atoms/Circle';
import { useEffect } from 'react';

const index = () => {
  const navigate = useNavigate();

  const clickToProjectCreateHandler = () => {
    navigate('/new-project');
  };

  const getProjects = useGetProjects();
  const deleteProject = useDeleteProject();

  const deleteProjectHandler = (projectId: number) => {
    deleteProject.mutate({ projectId });
  };

  const linkToDashBoardHandler = (projectId: number) => {
    navigate(`/project/${projectId}/dashboard`);
  };

  useEffect(() => {
    getProjects.refetch();
  }, [getProjects.data, deleteProject.isSuccess]);

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
            <StyledFlex key={idx}>
              <Sheet width="100%" height="25vh" minHeight="300px">
                <StyledWidth80>
                  <StyledFlexItemsCenter>
                    <Circle height={'150px'} isImage={true} url={item.image} />
                    <StyledFlexColumn>
                      <StyledMarginY>
                        <StyledWidth100px>
                          <Text
                            message="프로젝트 명"
                            isFill={false}
                            fontSize={'1.5rem'}
                            fontWeight={'700'}
                          ></Text>
                        </StyledWidth100px>
                        <Text message={item.name} isFill={false}></Text>
                      </StyledMarginY>
                      {/* <StyledMarginY>
                      <StyledWidth100px>
                        <Text
                          message="팀장"
                          isFill={false}
                          fontSize={'1.5rem'}
                          fontWeight={'700'}
                        ></Text>
                      </StyledWidth100px>
                      <StyledInlineBlock>
                        <Circle height={'25px'} isImage={true} url={user1} />
                      </StyledInlineBlock>
                    </StyledMarginY>
                    <StyledMarginY>
                      <StyledWidth100px>
                        <Text
                          message="멤버"
                          isFill={false}
                          fontSize={'1.5rem'}
                          fontWeight={'700'}
                        ></Text>
                      </StyledWidth100px>
                      <StyledInlineBlock>
                        <Circle height={'25px'} isImage={true} url={user1} />
                      </StyledInlineBlock>
                      <StyledInlineBlock>
                        <Circle height={'25px'} isImage={true} url={user1} />
                      </StyledInlineBlock>
                      <StyledInlineBlock>
                        <Circle height={'25px'} isImage={true} url={user1} />
                      </StyledInlineBlock>
                      <StyledInlineBlock>
                        <Circle height={'25px'} isImage={true} url={user1} />
                      </StyledInlineBlock>
                    </StyledMarginY> */}
                    </StyledFlexColumn>
                  </StyledFlexItemsCenter>
                </StyledWidth80>
                <Button
                  backgroundColor={theme.color.primary}
                  isHover={true}
                  clickHandler={() => linkToDashBoardHandler(item.id)}
                >
                  이동
                </Button>
                {
                  <Button
                    backgroundColor={theme.color.bug}
                    clickHandler={() => deleteProjectHandler(item.id)}
                  >
                    삭제
                  </Button>
                }
              </Sheet>
            </StyledFlex>
          ))}
      </StyledProjectWrapper>
    </StyledContainer>
  );
};

export default index;
