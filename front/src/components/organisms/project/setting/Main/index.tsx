// REACT & REACT-ROUTER
import { useState, ChangeEvent, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// RECOIL
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { updateProjectState } from 'recoil/atoms/project/updateProject';

// REACT-QUERY
import {
  useDeleteFireTeam,
  useGetProject,
  useGetTeamForProject,
  usePostInviteTeam,
  useUpdateProject,
  useUpdateProjectImage,
  useUpdateTeamColor,
  useUpdateTeamRole,
} from 'hooks/project';
import { useGetUserInfoHandler, useGetUserSearch } from 'hooks/user';

import { Divider } from '@mui/material';

// STYLED-COMPONENT
import {
  StyledPadding,
  StyledMarginY,
  StyledFlex,
  StyledFlexRowEnd,
  StyledFlexCenter,
  StyledInputLogo,
  StyledLabel,
  StyledWrapper,
  StyledPaddingSM,
} from './style';

// COMPONENT - ATOMS
import Sheet from 'components/atoms/Sheet';
import Circle from 'components/atoms/Circle';
import Button from 'components/atoms/Button';
import Notification from 'components/atoms/Notification';
import FillButton from 'components/atoms/FillButton';

// COMPONENT - MOLECULES
import SettingAuth from 'components/molecules/SettingAuth';
import SettingColor from 'components/molecules/SettingColor';
import InviteUser from 'components/molecules/InviteUser';
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

  // update 요청시 필요한 recoil 작업
  const { projectName, projectDescription, projectInviteUser } = useRecoilValue(updateProjectState);
  const projectNameSetRecoilState = useSetRecoilState(updateProjectState);
  const projectDescriptionSetRecoilState = useSetRecoilState(updateProjectState);
  const projectInviteUserSerRecoilState = useSetRecoilState(updateProjectState);

  // 프로젝트 API
  const getUserInfo = useGetUserInfoHandler();
  const getProject = useGetProject(projectId);
  const getUserSearch = useGetUserSearch(projectInviteUser);
  const getTeamForProject = useGetTeamForProject(projectId);
  const postInviteTeam = usePostInviteTeam();
  const updateProject = useUpdateProject();
  const updateProjectImage = useUpdateProjectImage();
  const updateTeamRole = useUpdateTeamRole();
  const updateTeamColor = useUpdateTeamColor();
  const deleteFireTeam = useDeleteFireTeam();

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

    if (deleteFireTeam.isSuccess) {
      getTeamForProject.refetch();
    }

    if (postInviteTeam.isSuccess) {
      getTeamForProject.refetch();
      projectDescriptionSetRecoilState(prevData => {
        return { ...prevData, projectInviteUser: '' };
      });
      getUserSearch.remove();
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
    postInviteTeam.isSuccess,
    deleteFireTeam.isSuccess,
  ]);

  useEffect(() => {
    if (projectInviteUser !== '') getUserSearch.refetch();
  }, [projectInviteUser]);

  return (
    <StyledWrapper>
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
      {postInviteTeam.isSuccess && (
        <Notification
          check={true}
          message={'프로젝트에 해당 팀원을 초대하였습니다.'}
          width={'300px'}
        ></Notification>
      )}
      {deleteFireTeam.isSuccess && (
        <Notification
          check={true}
          message={'프로젝트에서 해당 팀원을 강퇴시켰습니다'}
          width={'300px'}
        ></Notification>
      )}
      {currentAuth !== 'DEVELOPER' && getProject.data && (
        <Sheet
          width={'70vw'}
          maxWidth={'900px'}
          height={'100%'}
          maxHeight={'700px'}
          isShadow={true}
        >
          <StyledFlex>
            <StyledPadding>
              <StyledMarginY>
                <StyledFlexCenter>
                  <Circle height="130px" backgroundColor={theme.color.primary}>
                    <Circle
                      height="120px"
                      isImage={true}
                      url={
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        image ? URL.createObjectURL(image.target.files[0]) : getProject.data.image
                      }
                    ></Circle>
                  </Circle>
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
                  <FillButton
                    width="100px"
                    backgroundColor={theme.button.green}
                    isHover={true}
                    clickHandler={() => {
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      updateProjectImage.mutate({ projectId, image });
                    }}
                    hoverColor={theme.button.darkgreen}
                  >
                    이미지 수정
                  </FillButton>
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
                  nonResize={true}
                ></TextAreaBox>
              </StyledMarginY>
              <StyledMarginY>
                <StyledFlexRowEnd>
                  <FillButton
                    width="100px"
                    backgroundColor={theme.button.green}
                    isHover={true}
                    clickHandler={() => {
                      updateProject.mutate({
                        projectId,
                        projectName,
                        projectDescription,
                      });
                    }}
                    hoverColor={theme.button.darkgreen}
                  >
                    수정
                  </FillButton>
                </StyledFlexRowEnd>
              </StyledMarginY>
            </StyledPadding>
          </StyledFlex>
        </Sheet>
      )}
      {getTeamForProject.data && (
        <StyledMarginY>
          <Sheet width={'70vw'} maxWidth={'900px'} isShadow={true}>
            <StyledFlex>
              <StyledPadding>
                <StyledMarginY>
                  <InputBox
                    labelName="팀원 초대"
                    isRow={true}
                    containerWidth={'100%'}
                    inputWidth={'70%'}
                    inputHeight={'40px'}
                    labelSize={'1.3rem'}
                    inputPlaceHolder={'초대하고 싶은 팀원의 이메일을 적어주세요!'}
                    useSetRecoilState={projectInviteUserSerRecoilState}
                    recoilParam={'projectInviteUser'}
                  ></InputBox>
                </StyledMarginY>
                {getUserSearch.data &&
                  getUserSearch.data.googleUsers.map(({ id, image, name }) => (
                    <InviteUser
                      userImage={image}
                      userName={name}
                      userId={id}
                      projectId={projectId}
                      postInviteTeam={postInviteTeam.mutate}
                    />
                  ))}
                <StyledPaddingSM />
                <Divider />
                <StyledPaddingSM />
                <StyledMarginY>
                  {currentAuth === 'MASTER' && <StyledLabel>팀원 권한 변경</StyledLabel>}
                  {currentAuth === 'MASTER' &&
                    getTeamForProject.data &&
                    getTeamForProject.data.map(
                      ({ role, userImage, userName, projectId, userId }) => (
                        <SettingAuth
                          roleId={role.id}
                          userImage={userImage}
                          userName={userName}
                          projectId={projectId}
                          userId={userId}
                          updateTeamRole={updateTeamRole.mutate}
                          deleteFireTeam={deleteFireTeam.mutate}
                        ></SettingAuth>
                      ),
                    )}
                </StyledMarginY>
                <StyledPaddingSM />
                <Divider />
                <StyledPaddingSM />
                <StyledMarginY>
                  {currentAuth !== 'DEVELOPER' && <StyledLabel>팀원 색상 변경</StyledLabel>}
                  {currentAuth !== 'DEVELOPER' &&
                    getTeamForProject.data &&
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
                    )}
                </StyledMarginY>
              </StyledPadding>
            </StyledFlex>
          </Sheet>
        </StyledMarginY>
      )}
    </StyledWrapper>
  );
};

export default index;
