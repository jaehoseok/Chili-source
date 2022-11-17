// Library

import { useParams } from 'react-router-dom';
import { useGetProject, useGetTeamForProject } from 'hooks/project';

// Styles
import {
  // StyledProjectInfo,
  // StyledProjectInfoLine,
  StyledFlex,
  StyledFlexCenter,
  StyledFlexCol,
  StyledSheetPadding,
  StyledH2,
  StyledWidth,
  StyledHeight,
  StyledDescription,
  StyledBar,
  StyledLinkageToken,
  StyledProjectUser,
  StyledUserName,
  StyledRoleId,
  StyledTextCenter,
  StyledOverFlowX,
} from './style';
import { theme } from 'styles/theme';

// Components
import Circle from 'components/atoms/Circle';
import Sheet from 'components/atoms/Sheet';

/**
 * @description
 * 만드는 중 입니다.
 *
 * @author inte
 */
export const ProjectInfo = () => {
  // Init
  const { projectId } = useParams();
  const getProject = useGetProject(Number(projectId)).data;
  const getTeamForProject = useGetTeamForProject(Number(projectId));

  console.log(getProject);
  console.log(getTeamForProject);

  return (
    <>
      <StyledFlex>
        <Sheet width="700px" height="300px" isShadow={true} isHover={true}>
          <StyledWidth>
            <StyledHeight>
              <StyledSheetPadding>
                <StyledFlexCenter>
                  <Circle height="80px" backgroundColor={theme.color.primary} isInnerShadow={true}>
                    <Circle
                      height={'70px'}
                      isImage={true}
                      url={getProject ? getProject.image : ''}
                    />
                  </Circle>
                  <StyledBar className="hover-bg"></StyledBar>
                  <StyledHeight>
                    <StyledH2 className="hover-text">
                      {getProject && getProject.name ? getProject.name : '[빈 프로젝트 명]'}
                    </StyledH2>
                    <StyledDescription className="hover-text">
                      {getProject && getProject.description
                        ? getProject.description
                        : '[빈 프로젝트 설명]'}
                    </StyledDescription>
                    <StyledLinkageToken>
                      <p className="hover-text">
                        {getProject &&
                          getProject.gitRepo &&
                          `gitRepository : ${getProject.gitRepo}`}
                      </p>
                      <p className="hover-text">
                        {getProject &&
                          getProject.jiraProject &&
                          `jiraProject : ${getProject.jiraProject}`}
                      </p>
                    </StyledLinkageToken>
                  </StyledHeight>
                </StyledFlexCenter>
                <StyledOverFlowX>
                  <StyledProjectUser>
                    {getTeamForProject.data &&
                      getTeamForProject.data.map(({ userColor, userImage, userName, role }) => (
                        <Sheet minWidth="100px" height="135px" isShadow={true}>
                          <StyledFlexCol>
                            <Circle
                              height={'40px'}
                              isImage={true}
                              url={userImage}
                              isDropShadow={true}
                            />
                            <StyledTextCenter>
                              <StyledUserName>{userName}</StyledUserName>
                              <StyledRoleId>{role.id}</StyledRoleId>
                            </StyledTextCenter>
                          </StyledFlexCol>
                        </Sheet>
                      ))}
                  </StyledProjectUser>
                </StyledOverFlowX>
              </StyledSheetPadding>
            </StyledHeight>
          </StyledWidth>
        </Sheet>
        <Sheet width="500px" height="300px" isShadow={true}></Sheet>
      </StyledFlex>
      {/* <StyledProjectInfo>
        <Circle height={'150px'} isImage={true} url={getProject ? getProject.image : ''} />
        <div>{getProject && getProject.name ? getProject.name : '[빈 프로젝트 명]'}</div>
        <div>{getProject && getProject.description ? getProject.description : '[빈 프로젝트]'}</div>
        <div>{children}</div>
        <StyledProjectInfoLine />
      </StyledProjectInfo> */}
    </>
  );
};
