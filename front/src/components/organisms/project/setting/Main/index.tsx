// REACT & REACT-ROUTER
import { useState, ChangeEvent, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// RECOIL
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { updateProjectState } from 'recoil/atoms/project/updateProject';

// REACT-QUERY
import {
  useGetProject,
  useGetTeamForProject,
  useUpdateProject,
  useUpdateProjectImage,
  useUpdateTeamColor,
  useUpdateTeamRole,
} from 'hooks/project';
import { useGetUserInfoHandler } from 'hooks/user';

// STYLED-COMPONENT
import {
  StyledPadding,
  StyledMarginY,
  StyledFlex,
  StyledFlexRowEnd,
  StyledFlexCenter,
  StyledInputLogo,
  StyledLabel,
} from './style';

// COMPONENT - ATOMS
import Sheet from 'components/atoms/Sheet';
import Circle from 'components/atoms/Circle';
import Button from 'components/atoms/Button';
import Notification from 'components/atoms/Notification';

// COMPONENT - MOLECULES
import SettingAuth from 'components/molecules/SettingAuth';
import SettingColor from 'components/molecules/SettingColor';
import InputBox from 'components/molecules/InputBox';
import TextAreaBox from 'components/molecules/TextAreaBox';

// ETC
import { theme } from 'styles/theme';

/**
 * @description
 * 프로젝트 정보를 업데이트 하는 프로젝트 설정 페이지
 *
 * @author bell
 */
const index = () => {
  const location = useLocation();
  // const navigate = useNavigate();

  // 프로젝트 ID
  const projectId = +location.pathname.split('/')[2];

  // 프로젝트 API
  const getUserInfo = useGetUserInfoHandler();
  const getProject = useGetProject(projectId);
  const getTeamForProject = useGetTeamForProject(projectId);
  const updateProject = useUpdateProject();
  const updateProjectImage = useUpdateProjectImage();
  const updateTeamRole = useUpdateTeamRole();
  const updateTeamColor = useUpdateTeamColor();

  // update 요청시 필요한 recoil 작업
  const { projectName, projectDescription } = useRecoilValue(updateProjectState);
  const projectNameSetRecoilState = useSetRecoilState(updateProjectState);
  const projectDescriptionSetRecoilState = useSetRecoilState(updateProjectState);

  const myInfo = () => {
    if (getTeamForProject.data && getUserInfo.data) {
      const idx = getTeamForProject.data.findIndex(item => item.userId === getUserInfo.data.id);
      if (idx > -1) {
        return getTeamForProject.data[idx];
      }
    }
  };

  // 현재 로그인한 유저의 프로젝트 등급
  const currentAuth = myInfo()?.role.id;

  // project-logo용 state
  const [image, setImage] = useState();

  useEffect(() => {
    // update 요청을 통해 성공하면 getProject를 다시금 불러온다.
    if (updateProject.isSuccess) {
      getProject.refetch();
    }

    if (updateProjectImage.isSuccess) {
      getProject.refetch();
      setImage(undefined);
    }

    if (updateTeamRole.isSuccess) {
      getTeamForProject.refetch();
    }

    if (updateTeamColor.isSuccess) {
      getTeamForProject.refetch();
    }

    // getProject가 refetch를 시도하는 경우
    // localStorage를 업데이트하여 탭의 값도 바꾼다!
    if (updateProject.isSuccess && getProject.isRefetching) {
      const newProjectList = [...JSON.parse(localStorage.getItem('project-tab-list') as string)];
      const idx = newProjectList.findIndex(item => item.id === projectId);
      newProjectList[idx].title = getProject.data?.name;
      localStorage.setItem('project-tab-list', JSON.stringify(newProjectList));
    }
  }, [
    updateProject.isSuccess,
    getProject.isRefetching,
    updateProjectImage.isSuccess,
    updateTeamRole.isSuccess,
    updateTeamColor.isSuccess,
  ]);

  return (
    <>
      {updateProject.isSuccess && (
        <Notification
          check={true}
          message={'프로젝트 명과 상세가 정상적으로 수정되었습니다.'}
          width={'300px'}
        ></Notification>
      )}
      {updateProjectImage.isSuccess && (
        <Notification
          check={true}
          message={'프로젝트 로고가 정상적으로 수정되었습니다.'}
          width={'300px'}
        ></Notification>
      )}
      {updateTeamRole.isSuccess && (
        <Notification
          check={true}
          message={'프로젝트 팀원의 권한이 수정되었습니다.'}
          width={'300px'}
        ></Notification>
      )}
      {updateTeamColor.isSuccess && (
        <Notification
          check={true}
          message={'프로젝트 팀원의 색상이 수정되었습니다.'}
          width={'300px'}
        ></Notification>
      )}
      <StyledPadding>
        {currentAuth !== 'DEVELOPER' && getProject.data ? (
          <Sheet width={'70vw'} maxWidth={'900px'} isShadow={true}>
            <StyledFlex>
              <StyledPadding>
                <StyledMarginY>
                  <StyledFlexCenter>
                    <Circle
                      height="120px"
                      isImage={true}
                      url={
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        image ? URL.createObjectURL(image.target.files[0]) : getProject.data.image
                      }
                    ></Circle>
                    <StyledMarginY>
                      <StyledInputLogo>
                        <input
                          type="file"
                          id="project_update_logo"
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            // 원래는 e.target.files[0] 를 직접 주고 싶었다.
                            // 근데 문제는 e.target.files[0]의 타입을 모른다... (안찾아지더라)
                            // 그래서 그냥 e 다주었다.
                            setImage(e);
                          }}
                        />
                      </StyledInputLogo>
                    </StyledMarginY>
                  </StyledFlexCenter>
                  <StyledFlexRowEnd>
                    <Button
                      width="100px"
                      borderColor={theme.button.gray}
                      backgroundColor={theme.button.green}
                      isHover={true}
                      clickHandler={() => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        updateProjectImage.mutate({ projectId, image });
                      }}
                    >
                      이미지 수정
                    </Button>
                  </StyledFlexRowEnd>
                </StyledMarginY>
                <StyledMarginY>
                  <InputBox
                    labelName="프로젝트명"
                    isRow={true}
                    containerWidth={'100%'}
                    inputWidth={'70%'}
                    inputHeight={'40px'}
                    labelSize={'1.3rem'}
                    inputValue={getProject.data.name}
                    useSetRecoilState={projectNameSetRecoilState}
                    recoilParam={'projectName'}
                  ></InputBox>
                </StyledMarginY>
                <StyledMarginY>
                  <TextAreaBox
                    labelName="프로젝트 상세"
                    isRow={true}
                    containerWidth={'100%'}
                    textAreaWidth={'70%'}
                    textAreaHeight={'100px'}
                    labelSize={'1.3rem'}
                    textAreaValue={getProject.data.description}
                    useSetRecoilState={projectDescriptionSetRecoilState}
                    recoilParam={'projectDescription'}
                  ></TextAreaBox>
                </StyledMarginY>
                <StyledMarginY>
                  <StyledFlexRowEnd>
                    <Button
                      width="100px"
                      borderColor={theme.button.gray}
                      backgroundColor={theme.button.green}
                      isHover={true}
                      clickHandler={() => {
                        updateProject.mutate({
                          projectId,
                          projectName,
                          projectDescription,
                        });
                      }}
                    >
                      수정
                    </Button>
                  </StyledFlexRowEnd>
                </StyledMarginY>
              </StyledPadding>
            </StyledFlex>
          </Sheet>
        ) : (
          <Notification
            message="프로젝트를 수정할 권한을 가지고 있지 않습니다!"
            check={false}
            width="300px"
          ></Notification>
        )}
        {getTeamForProject.data && (
          <StyledMarginY>
            <Sheet width={'70vw'} maxWidth={'900px'} isShadow={true}>
              <StyledFlex>
                <StyledPadding>
                  {currentAuth !== 'DEVELOPER' && (
                    <>
                      <StyledMarginY>
                        <InputBox
                          labelName="팀원 초대"
                          isRow={true}
                          containerWidth={'100%'}
                          inputWidth={'70%'}
                          inputHeight={'40px'}
                          labelSize={'1.3rem'}
                          inputPlaceHolder={'초대하고 싶은 팀원의 이메일을 적어주세요!'}
                        ></InputBox>
                      </StyledMarginY>
                      <StyledMarginY>
                        <StyledFlexRowEnd>
                          <Button
                            width="100px"
                            borderColor={theme.button.gray}
                            backgroundColor={theme.button.green}
                            isHover={true}
                          >
                            팀원 초대
                          </Button>
                        </StyledFlexRowEnd>
                      </StyledMarginY>
                    </>
                  )}
                  <StyledMarginY>
                    {currentAuth === 'MASTER' && <StyledLabel>팀원 권한 변경</StyledLabel>}
                    {currentAuth === 'MASTER' && getTeamForProject.data ? (
                      getTeamForProject.data.map(
                        ({ role, userImage, userName, projectId, userId }) => (
                          <SettingAuth
                            roleId={role.id}
                            userImage={userImage}
                            userName={userName}
                            projectId={projectId}
                            userId={userId}
                            updateTeamRole={updateTeamRole.mutate}
                          ></SettingAuth>
                        ),
                      )
                    ) : (
                      <Notification
                        message="팀원 정보를 수정할 권한을 가지고 있지 않습니다!"
                        check={false}
                        width="300px"
                      ></Notification>
                    )}
                  </StyledMarginY>
                  <StyledMarginY>
                    {currentAuth !== 'DEVELOPER' && <StyledLabel>팀원 색상 변경</StyledLabel>}
                    {currentAuth !== 'DEVELOPER' && getTeamForProject.data ? (
                      getTeamForProject.data.map(
                        ({ userName, userImage, userColor, projectId, userId }) => (
                          <SettingColor
                            userImage={userImage}
                            userName={userName}
                            userColor={userColor}
                            projectId={projectId}
                            userId={userId}
                            updateTeamColor={updateTeamColor.mutate}
                          />
                        ),
                      )
                    ) : (
                      <Notification
                        message="팀원 정보를 수정할 권한을 가지고 있지 않습니다!"
                        check={false}
                        width="300px"
                      ></Notification>
                    )}
                  </StyledMarginY>
                </StyledPadding>
              </StyledFlex>
            </Sheet>
          </StyledMarginY>
        )}
      </StyledPadding>
    </>
  );
};

export default index;
