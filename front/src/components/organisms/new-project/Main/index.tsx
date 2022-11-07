// LIBRARY
import { ChangeEvent, useEffect, useState } from 'react';

import { AiOutlineCamera } from 'react-icons/ai';

import { linkageTokenState } from 'recoil/atoms/auth/linkageToken';
import { createProjectState } from 'recoil/atoms/project/createProject';
import { useRecoilValue, useSetRecoilState } from 'recoil';

// hooks
import { usePostLinkageTokenHandler } from 'hooks/auth';
import { useGetJiraProjectList } from 'hooks/issue';
import { useGetTokens } from 'hooks/auth';

// CSS
import { theme } from 'styles/theme';

// STYLED COMPONENT
import {
  StyledContainer,
  StyledFlex,
  StyledInputBox,
  StyledMarginY,
  StyledLabel,
  StyledFlexRow,
  StyledFlexRowEnd,
  StyledFlexAround,
  StyledWidth70,
} from './style';

// MOLECULES
import InputBox from 'components/molecules/InputBox';
import TextAreaBox from 'components/molecules/TextAreaBox';

// ATOMS
import Text from 'components/atoms/Text';
import Sheet from 'components/atoms/Sheet';
import Circle from 'components/atoms/Circle';
import Button from 'components/atoms/Button';
import Select from 'components/atoms/Select';
import Option from 'components/atoms/Option';
import Notification from 'components/atoms/Notification';
import { usePostCreateProjectHandler } from 'hooks/project';
import { useNavigate } from 'react-router-dom';
import { useGetUserInfoHandler } from 'hooks/user';

interface jiraProjectType {
  key: string;
  name: string;
}

/**
 * @description
 * 프로젝트 생성 페이지, 지라와 깃을 연동하고
 * 지라의 프로젝트를 가져와 서비스의 프로젝트와 연결하도록 해주는 페이지
 *
 * @author bell
 */
const index = () => {
  // project-logo용 state
  const [image, setImage] = useState();

  // 현재 유저에게 연동된 토큰이 있는가 조회
  const [isJiraToken, setJiraToken] = useState(false);
  const [isGitLabToken, setGitLabToken] = useState(false);

  // 연동된 토큰이 있는 경우, 유저의 토큰 값을 저장
  const [jiraTokenName, setJiraTokenName] = useState('');
  const [gitLabTokenName, setGitLabTokenName] = useState('');

  // 연동퇸 토크인 있는 경우, 유저의 토큰 이메일 값을 저장
  const [getJiraEmail, setJiraEmail] = useState('');

  const navigate = useNavigate();

  // 토큰 연동시 필요한 데이터를 업데이트 및 불러오기 위한 리코일 작업
  const { jiraToken } = useRecoilValue(linkageTokenState);
  const { jiraEmail } = useRecoilValue(linkageTokenState);
  // const { gitLabToken } = useRecoilValue(linkageTokenState);

  const jiraSetRecoilState = useSetRecoilState(linkageTokenState);
  const jiraEmailSetRecoilState = useSetRecoilState(linkageTokenState);
  const gitSetRecoilState = useSetRecoilState(linkageTokenState);

  // 프로젝트 생성 시 필요한 데이터를 업데이트 및 불러오기 위한 리코일 작업
  const { projectName } = useRecoilValue(createProjectState);
  const { projectDescription } = useRecoilValue(createProjectState);
  const { projectImage } = useRecoilValue(createProjectState);
  const nameSetRecoilState = useSetRecoilState(createProjectState);
  const descriptionSetRecoilState = useSetRecoilState(createProjectState);
  const imageSetRecoilState = useSetRecoilState(createProjectState);

  // 자신의 토큰이 연동되어 있는 것이 있는지 확인하기
  const getTokens = useGetTokens();

  // 토큰이 있다면 연동하기로
  useEffect(() => {
    if (getTokens.data && getTokens.data.length > 0) {
      for (const item of getTokens.data) {
        if (item.tokenCodeId === 'JIRA') {
          setJiraToken(true);
          setJiraTokenName(item.value);
          setJiraEmail(item.email);
        }
        if (item.tokenCodeId === 'SSAFYGITLAB') {
          setGitLabToken(true);
          setGitLabTokenName(item.value);
        }
      }
    }
  }, []);

  // query 처리
  // 토큰 연동
  const linkageJiraToken = usePostLinkageTokenHandler();
  const getUserInfo = useGetUserInfoHandler();
  // 지라 프로젝트 모두 가져오기
  const jiraProjectList = useGetJiraProjectList();
  const createProjectData = usePostCreateProjectHandler();

  // 이미 유저가 토큰 값을 가지고 있다면

  // 가지고 온 지라 프로젝트 Option 컴포넌트의 props 형태에 맞게 필터링
  const filteringJiraProjectHandler = (datas: jiraProjectType[]) => {
    const temp: string[] = [];
    for (const data of datas) temp.push(data.name);
    return temp;
  };

  // 생성 버튼 클릭시 프로젝트 생성 (POST) 요청 실행
  const creaetProjectHandler = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    createProjectData.mutate({ projectName, projectDescription, image });
  };

  // 지라 연동이 성공한 경우에만 jiraProject를 가져와라
  useEffect(() => {
    if (linkageJiraToken.isSuccess || (isJiraToken && jiraTokenName)) {
      jiraProjectList.refetch();
    }
  }, [linkageJiraToken.isSuccess, isJiraToken, jiraTokenName]);

  // 버튼 클릭 시 지라 토큰 연동 및 해당 지라 프로젝트 가져오기
  const linkageJiraTokenHandler = async () => {
    if (isJiraToken) {
      jiraProjectList.refetch();
    } else {
      if (getUserInfo.data) {
        console.log(jiraEmail, jiraToken);
        linkageJiraToken.mutate({
          email: jiraEmail,
          tokenCodeId: 'JIRA',
          value: jiraToken,
        });
      }
    }
  };

  return (
    <StyledContainer>
      {createProjectData.isSuccess && (
        <Notification
          width="300px"
          check={true}
          message={'프로젝트가 성공적으로 생성되었습니다!'}
        ></Notification>
      )}

      <Text
        isFill={false}
        message={'프로젝트 생성'}
        fontSize={'2rem'}
        fontWeight={'900'}
        display={'block'}
      ></Text>
      <StyledFlex>
        <Sheet width="100%" height="30vh" minHeight="450px" maxWidth="2000px">
          <StyledInputBox>
            <StyledMarginY>
              <InputBox
                labelName="프로젝트명"
                isRow={true}
                containerWidth={'100%'}
                inputWidth={'70%'}
                inputHeight={'40px'}
                labelSize={'1.3rem'}
                useSetRecoilState={nameSetRecoilState}
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
                useSetRecoilState={descriptionSetRecoilState}
                recoilParam={'projectDescription'}
              ></TextAreaBox>
            </StyledMarginY>
            <StyledMarginY>
              <StyledFlexRow>
                <StyledLabel>로고 이미지</StyledLabel>
                <StyledWidth70>
                  {projectImage ? (
                    <Circle
                      height="100px"
                      backgroundColor="#f6f6f6"
                      isImage={true}
                      url={projectImage}
                    ></Circle>
                  ) : (
                    <Circle height="100px" backgroundColor="#f6f6f6">
                      <AiOutlineCamera fontSize={'40px'} color={'#a0a0a0'}></AiOutlineCamera>
                    </Circle>
                  )}
                  <input
                    type="file"
                    id="project_logo"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      // 원래는 e.target.files[0] 를 직접 주고 싶었다.
                      // 근데 문제는 e.target.files[0]의 타입을 모른다... (안찾아지더라)
                      // 그래서 그냥 e 다주었다.
                      setImage(e);
                      imageSetRecoilState(prevData => {
                        return {
                          ...prevData,
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          // projectImage는 경로가 나오도록 했다.
                          projectImage: URL.createObjectURL(e.target.files[0]),
                        };
                      });
                    }}
                  />
                </StyledWidth70>
              </StyledFlexRow>
            </StyledMarginY>
          </StyledInputBox>
        </Sheet>

        <StyledMarginY>
          <StyledFlexRowEnd>
            <Button
              width="100px"
              borderColor={theme.button.gray}
              backgroundColor={theme.button.green}
              isHover={true}
              clickHandler={() => creaetProjectHandler()}
            >
              생성
            </Button>
          </StyledFlexRowEnd>
        </StyledMarginY>
      </StyledFlex>
      <StyledFlex>
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
                inputValue={isJiraToken ? jiraTokenName : ''}
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
              {/* {isLoading && <div>Loading...</div>} */}
              {jiraProjectList.isLoading && <div>isLoading...</div>}
              {jiraProjectList.data && (
                <>
                  <StyledMarginY>
                    <Select width="100%">
                      <Option
                        messages={filteringJiraProjectHandler(jiraProjectList.data)}
                        selected={jiraProjectList.data[0]}
                      ></Option>
                    </Select>
                  </StyledMarginY>
                  <StyledFlexRowEnd>
                    <Button
                      width="150px"
                      borderColor={theme.button.gray}
                      backgroundColor={theme.button.green}
                      isHover={true}
                      clickHandler={linkageJiraTokenHandler}
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
                useSetRecoilState={gitSetRecoilState}
                recoilParam={'gitLabToken'}
                inputValue={isGitLabToken ? gitLabTokenName : ''}
              ></InputBox>
              <InputBox
                labelName="Git 이메일"
                labelSize="1.3rem"
                labelMarginBottom="20px"
                isRow={false}
                containerWidth="100%"
                useSetRecoilState={jiraEmailSetRecoilState}
                recoilParam={'gitLabEmail'}
              ></InputBox>
              <StyledMarginY>
                <StyledFlexRowEnd>
                  <Button
                    width="100px"
                    borderColor={theme.button.gray}
                    backgroundColor={theme.button.green}
                    isHover={true}
                  >
                    입력
                  </Button>
                </StyledFlexRowEnd>
              </StyledMarginY>
              {/* <Select width="100%">
                <Option messages={['프로젝트 1', '프로젝트 2', '프로젝트 3']}></Option>
              </Select> */}
            </StyledMarginY>
          </StyledFlexAround>
        </Sheet>
      </StyledFlex>
    </StyledContainer>
  );
};

export default index;
