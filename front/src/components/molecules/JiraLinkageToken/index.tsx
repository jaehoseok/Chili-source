// LIBRARY
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { linkageTokenState } from 'recoil/atoms/auth/linkageToken';
import { useRecoilValue, useSetRecoilState } from 'recoil';

// HOOKS
import { usePostLinkageTokenHandler } from 'hooks/auth';
import { useGetTokens } from 'hooks/auth';
import { useGetJiraProjectList } from 'hooks/issue';
import { usePostConnectTokenToProject } from 'hooks/project';
import { useGetUserInfoHandler } from 'hooks/user';

// STYLE
import { StyledMarginY, StyledFlexRowEnd, StyledPadding, StyledFlexCenter } from './style';
import { theme } from 'styles/theme';

// MOLECULES
import InputBox from 'components/molecules/InputBox';

// ATOMS
import Sheet from 'components/atoms/Sheet';
import Select from 'components/atoms/Select';
import Option from 'components/atoms/Option';
import Notification from 'components/atoms/Notification';
import Text from 'components/atoms/Text';
import FillButton from 'components/atoms/FillButton';

interface propsType {
  projectId: number | undefined;
  setIsLinkedJira: Dispatch<SetStateAction<boolean>>;
}

interface jiraProjectType {
  key: string;
  name: string;
}

/**
 * @description
 * 프로젝트 생성 단계 가운데, 지라 연동을 담당하는 컴포넌트
 *
 * @author bell
 */
const index = ({ projectId, setIsLinkedJira }: propsType) => {
  // 현재 유저에게 연동된 토큰이 있는가 조회
  const [isJiraToken, setJiraToken] = useState(false);
  // 연동된 토큰이 있는 경우, 유저의 토큰 값을 저장
  const [jiraTokenValue, setjiraTokenValue] = useState('');
  // 연동된 토큰이 있는 경우, 유저의 토큰 이메일 값을 저장
  const [getJiraEmail, setJiraEmail] = useState('');

  // 토큰 연동시 필요한 데이터를 업데이트 및 불러오기 위한 리코일 작업
  const { jiraToken } = useRecoilValue(linkageTokenState);
  const { jiraEmail } = useRecoilValue(linkageTokenState);

  const jiraSetRecoilState = useSetRecoilState(linkageTokenState);
  const jiraEmailSetRecoilState = useSetRecoilState(linkageTokenState);

  // react-query
  // 토큰 이미 가지고 있는지 확인
  const getTokens = useGetTokens();
  // 토큰 연동
  const linkageToken = usePostLinkageTokenHandler();
  // 지라 프로젝트 모두 가져오기
  const jiraProjectList = useGetJiraProjectList();
  // 토큰 함수에 필요한 유저데이터
  const getUserInfo = useGetUserInfoHandler();
  // 토큰과 생성된 프로젝트 연결
  const connectTokenToProject = usePostConnectTokenToProject();

  // 유저가 프로젝트를 바꿀 때 마다 Option값 저장
  const [getJiraProject, setJiraProject] = useState('');

  useEffect(() => {
    // 토큰이 있다면 연동하기로
    if (getTokens.isSuccess && getTokens.data.length > 0) {
      for (const item of getTokens.data) {
        if (item.tokenCodeId === 'JIRA') {
          setJiraToken(true);
          setjiraTokenValue(item.value);
          setJiraEmail(item.email);
        }
      }
    }
    if (linkageToken.isSuccess || (isJiraToken && jiraTokenValue)) {
      jiraProjectList.refetch();
    }

    if (connectTokenToProject.isSuccess) {
      setIsLinkedJira(true);
    }

    if (jiraProjectList.data) {
      setJiraProject(jiraProjectList.data[0].name);
    }
  }, [
    linkageToken.isSuccess,
    isJiraToken,
    jiraTokenValue,
    jiraProjectList.data,
    getTokens.isSuccess,
    connectTokenToProject.isSuccess,
  ]);

  // 가지고 온 지라 프로젝트 Option 컴포넌트의 props 형태에 맞게 필터링
  const filteringJiraProjectHandler = (datas: jiraProjectType[]) => {
    const temp: string[] = [];
    for (const data of datas) temp.push(data.name);
    return temp;
  };

  // 버튼 입력 클릭 시 지라 토큰 연동 및 해당 지라 프로젝트 가져오기
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

  // 지라 토큰을 통해 프로젝트와 연동
  const connectTokenToProjectHandler = () => {
    if (projectId && jiraToken) {
      connectTokenToProject.mutate({
        detail: getJiraProject,
        name: 'JIRA',
        projectId,
      });
    }
  };

  return (
    <>
      {connectTokenToProject.isSuccess && (
        <Notification
          width="300px"
          check={true}
          message={'서비스와 지라 프로젝트가 서로 연동되었습니다'}
        ></Notification>
      )}
      <StyledPadding>
        <Sheet width="100%" height="65vh" isShadow={true}>
          <StyledFlexCenter>
            <InputBox
              labelName="Jira 토큰"
              labelSize="1.3rem"
              labelMarginBottom="10px"
              isRow={false}
              containerWidth="100%"
              useSetRecoilState={jiraSetRecoilState}
              recoilParam={'jiraToken'}
              inputValue={isJiraToken ? jiraTokenValue : ''}
              inputWidth="100%"
            ></InputBox>
            <StyledMarginY>
              <InputBox
                labelName="Jira 이메일"
                labelSize="1.3rem"
                labelMarginBottom="10px"
                isRow={false}
                containerWidth="100%"
                useSetRecoilState={jiraEmailSetRecoilState}
                recoilParam={'jiraEmail'}
                inputValue={isJiraToken ? getJiraEmail : ''}
                inputWidth="100%"
              ></InputBox>
            </StyledMarginY>
            <StyledFlexRowEnd>
              <StyledMarginY>
                <FillButton
                  width="100px"
                  backgroundColor={theme.color.primary}
                  isHover={true}
                  clickHandler={linkageJiraTokenHandler}
                  hoverColor={theme.color.secondary}
                >
                  입력
                </FillButton>
              </StyledMarginY>
            </StyledFlexRowEnd>

            {jiraProjectList.data && (
              <>
                <Text
                  isFill={false}
                  message={'서비스와 연결할 지라 프로젝트 선택'}
                  color={theme.color.primary}
                  fontSize={'1.5rem'}
                  fontWeight={'700'}
                ></Text>
                <StyledMarginY>
                  <Select width="100%" setState={setJiraProject}>
                    <Option messages={filteringJiraProjectHandler(jiraProjectList.data)}></Option>
                  </Select>
                </StyledMarginY>
                <StyledFlexRowEnd>
                  <FillButton
                    width="150px"
                    backgroundColor={theme.color.primary}
                    isHover={true}
                    clickHandler={connectTokenToProjectHandler}
                    hoverColor={theme.color.secondary}
                  >
                    프로젝트와 연동
                  </FillButton>
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
          </StyledFlexCenter>
        </Sheet>
      </StyledPadding>
    </>
  );
};

export default index;
