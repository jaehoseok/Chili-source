// LIBRARY
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { linkageTokenState } from 'recoil/atoms/auth/linkageToken';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Slider from 'react-slick';

// hooks
import { usePostLinkageTokenHandler } from 'hooks/auth';
import { useGetJiraProjectList } from 'hooks/issue';
import { useGetTokens } from 'hooks/auth';
import { usePostConnectTokenToProject } from 'hooks/project';

// STYLE
import {
  StyledContainer,
  StyledMarginY,
  StyledFlexRowEnd,
  StyledFlexAround,
  StyledSliderContainer,
} from './style';
import { theme } from 'styles/theme';

// MOLECULES
import InputBox from 'components/molecules/InputBox';
import ProjectCreate from 'components/molecules/ProjectCreate';

// ATOMS
import Sheet from 'components/atoms/Sheet';
import Button from 'components/atoms/Button';
import Select from 'components/atoms/Select';
import Option from 'components/atoms/Option';
import Notification from 'components/atoms/Notification';

import { useGetUserInfoHandler } from 'hooks/user';
import { useGetGitlabRepositories } from 'hooks/widget';

interface jiraProjectType {
  key: string;
  name: string;
}

interface gitLabRepositoryType {
  id: number;
  description: string;
  name: string;
  name_with_namespace: string;
  path: string;
  path_with_namespace: string;
  default_branch: string;
  ssh_rul_to_repo: string | null;
  http_url_to_repo: string;
  web_url: string;
}

/**
 * @description
 * 프로젝트 생성 페이지, 지라와 깃을 연동하고
 * 지라의 프로젝트를 가져와 서비스의 프로젝트와 연결하도록 해주는 페이지
 *
 * @author bell
 */
const index = () => {
  // project 생성시 받을 프로젝트 id 값
  const [getProjectId, setProjectId] = useState<number>();

  // 현재 유저에게 연동된 토큰이 있는가 조회
  const [isJiraToken, setJiraToken] = useState(false);
  const [isGitLabToken, setGitLabToken] = useState(false);

  // 연동된 토큰이 있는 경우, 유저의 토큰 값을 저장
  const [jiraTokenValue, setjiraTokenValue] = useState('');
  const [gitLabTokenValue, setGitLabTokenValue] = useState('');

  // 연동퇸 토크인 있는 경우, 유저의 토큰 이메일 값을 저장
  const [getJiraEmail, setJiraEmail] = useState('');

  // 유저가 프로젝트를 바꿀 때 마다 Option값 저장
  const [getJiraProject, setJiraProject] = useState('');
  const [getGitLabRepository, setGitLabRepository] = useState('');

  const navigate = useNavigate();

  // 토큰 연동시 필요한 데이터를 업데이트 및 불러오기 위한 리코일 작업
  const { jiraToken } = useRecoilValue(linkageTokenState);
  const { jiraEmail } = useRecoilValue(linkageTokenState);
  const { gitLabToken } = useRecoilValue(linkageTokenState);

  const jiraSetRecoilState = useSetRecoilState(linkageTokenState);
  const jiraEmailSetRecoilState = useSetRecoilState(linkageTokenState);
  const gitLabSetRecoilState = useSetRecoilState(linkageTokenState);

  // 자신의 토큰이 연동되어 있는 것이 있는지 확인하기
  const getTokens = useGetTokens();

  // 토큰이 있다면 연동하기로
  useEffect(() => {
    if (getTokens.data && getTokens.data.length > 0) {
      for (const item of getTokens.data) {
        if (item.tokenCodeId === 'JIRA') {
          setJiraToken(true);
          setjiraTokenValue(item.value);
          setJiraEmail(item.email);
        }
        if (item.tokenCodeId === 'SSAFYGITLAB') {
          setGitLabToken(true);
          setGitLabTokenValue(item.value);
        }
      }
    }
  }, []);

  // query 처리
  // 토큰 연동
  const linkageToken = usePostLinkageTokenHandler();
  const getUserInfo = useGetUserInfoHandler();
  // 지라 프로젝트 모두 가져오기
  const jiraProjectList = useGetJiraProjectList();
  // 깃 리포지토리 모두 가져오기
  const getGitLabRepositories = useGetGitlabRepositories('ssafygitlab');

  // 프로젝트 생성
  const connectTokenToProject = usePostConnectTokenToProject();

  // 가지고 온 지라 프로젝트 Option 컴포넌트의 props 형태에 맞게 필터링
  const filteringJiraProjectHandler = (datas: jiraProjectType[]) => {
    const temp: string[] = [];
    for (const data of datas) temp.push(data.name);
    return temp;
  };

  // 가지고 온 지라 프로젝트 Option 컴포넌트의 props 형태에 맞게 필터링
  const filteringGitRepositoryHandler = (datas: gitLabRepositoryType[]) => {
    const temp: string[] = [];
    for (const data of datas) temp.push(`${data.id}-${data.name}`);
    return temp;
  };

  // 지라 연동이 성공한 경우에만 jiraProject를 가져와라
  useEffect(() => {
    if (linkageToken.isSuccess || (isJiraToken && jiraTokenValue)) {
      jiraProjectList.refetch();
    }
    if (linkageToken.isSuccess || (isGitLabToken && gitLabTokenValue)) {
      getGitLabRepositories.refetch();
    }

    if (jiraProjectList.data) {
      setJiraProject(jiraProjectList.data[0].name);
    }
    if (getGitLabRepositories.data) {
      setGitLabRepository(getGitLabRepositories.data[0].name);
    }
  }, [
    linkageToken.isSuccess,
    isJiraToken,
    jiraTokenValue,
    connectTokenToProject.isSuccess,
    jiraProjectList.data,
  ]);

  // 버튼 클릭 시 지라 토큰 연동 및 해당 지라 프로젝트 가져오기
  const linkageJiraTokenHandler = () => {
    if (isJiraToken) {
      jiraProjectList.refetch();
    } else {
      if (getUserInfo.data) {
        linkageToken.mutate({
          email: jiraEmail,
          tokenCodeId: 'JIRA',
          value: jiraToken,
        });
      }
    }
  };

  const linkageGitLabTokenHandler = () => {
    if (isGitLabToken) {
      getGitLabRepositories.refetch();
    } else {
      if (getUserInfo.data) {
        linkageToken.mutate({
          tokenCodeId: 'SSAFYGITLAB',
          value: gitLabToken,
        });
      }
    }
  };

  // 프로젝트 생성 후 지라 토큰을 통해 지라 프로젝트와 연동
  const connectTokenToProjectHandler = () => {
    if (getProjectId && jiraToken) {
      connectTokenToProject.mutate({
        detail: getJiraProject,
        name: 'JIRA',
        projectId: getProjectId,
      });
    }
    if (getProjectId && gitLabToken) {
      connectTokenToProject.mutate({
        detail: getGitLabRepository.split('-')[0],
        name: 'SSAFYGITLAB',
        projectId: getProjectId,
      });
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <StyledContainer>
      {connectTokenToProject.isSuccess && (
        <Notification
          width="300px"
          check={true}
          message={'프로젝트끼리 서로 연동되었습니다'}
        ></Notification>
      )}

      {/* <Text
        isFill={false}
        message={'프로젝트 생성'}
        fontSize={'2rem'}
        fontWeight={'900'}
        display={'block'}
      ></Text> */}
      <StyledSliderContainer>
        <Slider {...settings}>
          <ProjectCreate />
          <Sheet width="100%" height="25vh" minHeight="400px" maxWidth="2000px">
            <StyledFlexAround>
              <StyledMarginY>
                <InputBox
                  labelName="Jira 토큰"
                  labelSize="1.3rem"
                  labelMarginBottom="20px"
                  isRow={false}
                  containerWidth="100%"
                  useSetRecoilState={jiraSetRecoilState}
                  recoilParam={'jiraToken'}
                  inputValue={isJiraToken ? jiraTokenValue : ''}
                ></InputBox>
                <InputBox
                  labelName="Jira 이메일"
                  labelSize="1.3rem"
                  labelMarginBottom="20px"
                  isRow={false}
                  containerWidth="100%"
                  useSetRecoilState={jiraEmailSetRecoilState}
                  recoilParam={'jiraEmail'}
                  inputValue={isJiraToken ? getJiraEmail : ''}
                ></InputBox>
                <StyledMarginY>
                  <StyledFlexRowEnd>
                    <Button
                      width="100px"
                      borderColor={theme.button.gray}
                      backgroundColor={theme.button.green}
                      isHover={true}
                      clickHandler={linkageJiraTokenHandler}
                    >
                      입력
                    </Button>
                  </StyledFlexRowEnd>
                </StyledMarginY>
                {jiraProjectList.data && (
                  <>
                    <StyledMarginY>
                      <Select width="100%" setState={setJiraProject}>
                        <Option
                          messages={filteringJiraProjectHandler(jiraProjectList.data)}
                        ></Option>
                      </Select>
                    </StyledMarginY>
                    <StyledFlexRowEnd>
                      <Button
                        width="150px"
                        borderColor={theme.button.gray}
                        backgroundColor={theme.button.green}
                        isHover={true}
                        clickHandler={connectTokenToProjectHandler}
                      >
                        프로젝트와 연동
                      </Button>
                    </StyledFlexRowEnd>
                  </>
                )}
                {jiraProjectList.isError && (
                  <Notification
                    width="200px"
                    check={false}
                    message={jiraProjectList.error.message}
                  ></Notification>
                )}
              </StyledMarginY>
              <StyledMarginY>
                <InputBox
                  labelName="GitLab 토큰"
                  labelSize="1.3rem"
                  labelMarginBottom="20px"
                  isRow={false}
                  useSetRecoilState={gitLabSetRecoilState}
                  recoilParam={'gitLabToken'}
                  inputValue={isGitLabToken ? gitLabTokenValue : ''}
                ></InputBox>
                <StyledMarginY>
                  <StyledFlexRowEnd>
                    <Button
                      width="100px"
                      borderColor={theme.button.gray}
                      backgroundColor={theme.button.green}
                      isHover={true}
                      clickHandler={linkageGitLabTokenHandler}
                    >
                      입력
                    </Button>
                  </StyledFlexRowEnd>
                </StyledMarginY>
                {getGitLabRepositories.data && (
                  <>
                    <StyledMarginY>
                      <Select width="100%" setState={setGitLabRepository}>
                        <Option
                          messages={filteringGitRepositoryHandler(getGitLabRepositories.data)}
                        ></Option>
                      </Select>
                    </StyledMarginY>
                    <StyledFlexRowEnd>
                      <Button
                        width="150px"
                        borderColor={theme.button.gray}
                        backgroundColor={theme.button.green}
                        isHover={true}
                        clickHandler={connectTokenToProjectHandler}
                      >
                        프로젝트와 연동
                      </Button>
                    </StyledFlexRowEnd>
                  </>
                )}
              </StyledMarginY>
            </StyledFlexAround>
          </Sheet>
          <StyledMarginY>
            <StyledFlexRowEnd>
              <Button
                width="250px"
                borderColor={theme.button.gray}
                backgroundColor={theme.button.green}
                isHover={true}
                clickHandler={() => navigate('/projects', { state: 'created' })}
              >
                프로젝트 선택 페이지로 이동
              </Button>
            </StyledFlexRowEnd>
          </StyledMarginY>
          {/* </StyledFlex> */}
        </Slider>
        <StyledMarginY>
          <StyledFlexRowEnd>
            <Button
              width="100px"
              borderColor={theme.button.gray}
              backgroundColor={theme.button.green}
              isHover={true}
            >
              이전
            </Button>
            <Button
              width="100px"
              borderColor={theme.button.gray}
              backgroundColor={theme.button.green}
              isHover={true}
            >
              다음
            </Button>
          </StyledFlexRowEnd>
        </StyledMarginY>
      </StyledSliderContainer>
    </StyledContainer>
  );
};

export default index;
