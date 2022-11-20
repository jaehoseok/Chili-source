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
  StyledH4,
  StyledWidth,
  StyledHeight,
  StyledDescription,
  StyledBar,
  StyledLinkageToken,
  StyledProjectUser,
  StyledUserName,
  StyledRoleId,
  StyledOverFlowX,
  StyledUnderLine,
  StyledMarginBottom,
  StyledFlexColCenter,
} from './style';
import { theme } from 'styles/theme';
import { FaLightbulb } from 'react-icons/fa';

// Components
import Circle from 'components/atoms/Circle';
import Sheet from 'components/atoms/Sheet';

// 가이드 팁
const guideList: JSX.Element[] = [
  <StyledFlexColCenter>
    <StyledH4 className="hover-text">
      미들 버킷
      <span className="hover-text">
        <FaLightbulb style={{ position: 'relative', top: '2px', left: '8px' }} />
      </span>
    </StyledH4>
    <StyledMarginBottom />
    <StyledDescription className="hover-text">
      칠리소스에서는 이슈를 생성하기 전, 한곳에 모아두는 것이 가능합니다. 자주 사용하는 이슈들을
      모아서, 대량의 이슈를 클릭 한번에 생성해보세요!!
    </StyledDescription>
  </StyledFlexColCenter>,
  <StyledFlexColCenter>
    <StyledH4 className="hover-text">
      이슈 템플릿
      <span className="hover-text">
        <FaLightbulb style={{ position: 'relative', top: '2px', left: '8px' }} />
      </span>
    </StyledH4>
    <StyledMarginBottom />
    <StyledDescription className="hover-text">
      스크럼, 회의 등 자주 사용하는 이슈들이 있지 않나요?, 칠리소스의 이슈 템플릿이라면 매번
      번거롭게 이슈를 생성하지 않으셔도 됩니다. 자주 사용하는 이슈들을 이슈 템플릿으로 저장하면
      이슈를 쉽게 불러올 수 있어요.
    </StyledDescription>
  </StyledFlexColCenter>,
  <StyledFlexColCenter>
    <StyledH4 className="hover-text">
      캘린더
      <span className="hover-text">
        <FaLightbulb style={{ position: 'relative', top: '2px', left: '8px' }} />
      </span>
    </StyledH4>
    <StyledMarginBottom />
    <StyledDescription className="hover-text">
      일정에 맞게 이슈를 처리해보세요. 캘린더에서는 아직 처리하지 않는 이슈를 확인하여 날짜별로
      등록하는 것이 가능합니다. 캘린더에서 반영된 이슈 사항은 간트 차트에서도 동일하게 적용됩니다.
    </StyledDescription>
  </StyledFlexColCenter>,
  <StyledFlexColCenter>
    <StyledH4 className="hover-text">
      간트 차트
      <span className="hover-text">
        <FaLightbulb style={{ position: 'relative', top: '2px', left: '8px' }} />
      </span>
    </StyledH4>
    <StyledMarginBottom />
    <StyledDescription className="hover-text">
      칠리 소스의 간트차트에서는 이슈를 시간 단위로 표현하는 것이 가능합니다. 등록한 이슈를
      세분화하여 달성도를 나타내 보세요. 다른 팀원의 일정도 함께 확인이 가능하니, 일정에 맞게 이슈를
      등록해보세요.
    </StyledDescription>
  </StyledFlexColCenter>,
];

const idx = Math.floor(Math.random() * guideList.length);
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

  return (
    <>
      <StyledFlex>
        <Sheet
          minWidth="700px"
          maxWidth="1200px"
          minHeight="300px"
          maxHeight="500px"
          isShadow={true}
          isHover={true}
        >
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
                            <StyledFlexCol>
                              <StyledUserName>{userName}</StyledUserName>
                              <StyledRoleId>{role.id}</StyledRoleId>
                              <StyledUnderLine color={userColor}></StyledUnderLine>
                            </StyledFlexCol>
                          </StyledFlexCol>
                        </Sheet>
                      ))}
                  </StyledProjectUser>
                </StyledOverFlowX>
              </StyledSheetPadding>
            </StyledHeight>
          </StyledWidth>
        </Sheet>
        <Sheet minWidth="500px" maxWidth="800px" isShadow={true}>
          <StyledSheetPadding>
            <StyledH2 className="hover-text">가이드</StyledH2>
            <StyledMarginBottom />
            <Sheet
              width="400px"
              height="200px"
              isShadow={true}
              backgroundColor={'#f7f7f7'}
              isHover={true}
            >
              <StyledSheetPadding>{guideList[idx]}</StyledSheetPadding>
            </Sheet>
          </StyledSheetPadding>
        </Sheet>
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
