// LIBRARY
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { linkageTokenState } from 'recoil/atoms/auth/linkageToken';
import { useRecoilValue, useSetRecoilState } from 'recoil';

// HOOKS
import { usePostLinkageTokenHandler } from 'hooks/auth';
import { useGetTokens } from 'hooks/auth';
import { useGetGitlabRepositories } from 'hooks/widget';
import { usePostConnectTokenToProject } from 'hooks/project';
import { useGetUserInfoHandler } from 'hooks/user';

// STYLE
import { StyledMarginY, StyledFlexRowEnd, StyledPadding, StyledFlexCenter } from './style';
import { theme } from 'styles/theme';

// MOLECULES
import InputBox from 'components/molecules/InputBox';

// ATOMS
import Sheet from 'components/atoms/Sheet';
import FillButton from 'components/atoms/FillButton';
import Select from 'components/atoms/Select';
import Option from 'components/atoms/Option';
import Notification from 'components/atoms/Notification';
import Text from 'components/atoms/Text';

interface propsType {
  projectId: number | undefined;
  setIsLinkedGitLab: Dispatch<SetStateAction<boolean>>;
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
 * 프로젝트 생성 단계 가운데, 깃 연동을 담당하는 컴포넌트
 *
 * @author bell
 */
const index = ({ projectId, setIsLinkedGitLab }: propsType) => {
  // 현재 유저에게 연동된 토큰이 있는가 조회
  const [isGitLabToken, setGitLabToken] = useState(false);
  // 연동된 토큰이 있는 경우, 유저의 토큰 값을 저장
  const [gitLabTokenValue, setGitLabTokenValue] = useState('');
  // 토큰 연동시 필요한 데이터를 업데이트 및 불러오기 위한 리코일 작업
  const { gitLabToken } = useRecoilValue(linkageTokenState);
  const gitLabSetRecoilState = useSetRecoilState(linkageTokenState);

  // react-query
  // 토큰 이미 가지고 있는지 확인
  const getTokens = useGetTokens();
  // 토큰 연동
  const linkageToken = usePostLinkageTokenHandler();
  // 깃 리포지토리 모두 가져오기
  const getGitLabRepositories = useGetGitlabRepositories('ssafygitlab');
  // 토큰 함수에 필요한 유저데이터
  const getUserInfo = useGetUserInfoHandler();
  // 토큰과 생성된 프로젝트 연결
  const connectTokenToProject = usePostConnectTokenToProject();

  // 유저가 프로젝트를 바꿀 때 마다 Option값 저장
  const [getGitLabRepository, setGitLabRepository] = useState('');

  useEffect(() => {
    // 토큰이 있다면 연동하기로
    if (getTokens.isSuccess && getTokens.data.length > 0) {
      for (const item of getTokens.data) {
        if (item.tokenCodeId === 'SSAFYGITLAB') {
          setGitLabToken(true);
          setGitLabTokenValue(item.value);
        }
      }
    }
    // 이미 지라에서 한번 불렀기 때문에 .data가 있는지만 확인하면 된다.
    if (linkageToken.isSuccess || (isGitLabToken && gitLabTokenValue)) {
      getGitLabRepositories.refetch();
    }
    if (getGitLabRepositories.data) {
      setGitLabRepository(getGitLabRepositories.data[0].id + '');
    }
    if (connectTokenToProject.isSuccess) {
      setIsLinkedGitLab(true);
    }
  }, [
    linkageToken.isSuccess,
    isGitLabToken,
    gitLabTokenValue,
    getGitLabRepositories.data,
    getTokens.isSuccess,
    connectTokenToProject.isSuccess,
  ]);

  // 가지고 온 지라 프로젝트 Option 컴포넌트의 props 형태에 맞게 필터링
  const filteringGitRepositoryHandler = (datas: gitLabRepositoryType[]) => {
    const temp: string[] = [];
    for (const data of datas) temp.push(`${data.id}-${data.name}`);
    return temp;
  };

  // 버튼 입력 클릭 시 깃 토큰 연동 및 해당 깃 리포지토리 가져오기
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

  // 깃 토큰과 프로젝트를 연동
  const connectTokenToProjectHandler = () => {
    if (projectId && gitLabToken) {
      connectTokenToProject.mutate({
        detail: getGitLabRepository.split('-')[0],
        name: 'SSAFYGITLAB',
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
          message={'서비스와 깃 리포지토리가 연동되었습니다'}
        ></Notification>
      )}
      <StyledPadding>
        <Sheet width="100%" height="50vh" isShadow={true}>
          <StyledFlexCenter>
            <InputBox
              labelName="GitLab 토큰"
              labelSize="1.3rem"
              labelMarginBottom="10px"
              isRow={false}
              useSetRecoilState={gitLabSetRecoilState}
              recoilParam={'gitLabToken'}
              inputWidth={'100%'}
              inputValue={isGitLabToken ? gitLabTokenValue : ''}
            ></InputBox>
            <StyledMarginY>
              <StyledFlexRowEnd>
                <FillButton
                  width="100px"
                  backgroundColor={theme.color.primary}
                  isHover={true}
                  clickHandler={linkageGitLabTokenHandler}
                  hoverColor={theme.color.secondary}
                >
                  입력
                </FillButton>
              </StyledFlexRowEnd>
            </StyledMarginY>
            {getGitLabRepositories.data && (
              <>
                <Text
                  isFill={false}
                  message={'서비스와 연결할 깃 리포지토리 선택'}
                  color={theme.color.primary}
                  fontSize={'1.5rem'}
                  fontWeight={'700'}
                ></Text>
                <StyledMarginY>
                  <Select width="100%" setState={setGitLabRepository}>
                    <Option
                      messages={filteringGitRepositoryHandler(getGitLabRepositories.data)}
                    ></Option>
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
          </StyledFlexCenter>
        </Sheet>
      </StyledPadding>
    </>
  );
};

export default index;
