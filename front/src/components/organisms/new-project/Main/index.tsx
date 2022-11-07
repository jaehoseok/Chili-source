// LIBRARY
import { ChangeEvent, useEffect, useState } from 'react';

import { linkageTokenState } from 'recoil/atoms/auth/linkageToken';
import { createProjectState } from 'recoil/atoms/project/createProject';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { AiOutlineCamera } from 'react-icons/ai';

// hooks
import { usePostLinkageTokenHandler } from 'hooks/auth';
import { useGetJiraProjectList } from 'hooks/issue';

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
  const navigate = useNavigate();

  // 토큰 연동시 필요한 데이터를 업데이트 및 불러오기 위한 리코일 작업
  const { jiraToken } = useRecoilValue(linkageTokenState);
  const { gitToken } = useRecoilValue(linkageTokenState);
  const jiraSetRecoilState = useSetRecoilState(linkageTokenState);
  const gitSetRecoilState = useSetRecoilState(linkageTokenState);

  // 프로젝트 생성 시 필요한 데이터를 업데이트 및 불러오기 위한 리코일 작업
  const { projectName } = useRecoilValue(createProjectState);
  const { projectDescription } = useRecoilValue(createProjectState);
  const { projectImage } = useRecoilValue(createProjectState);
  const nameSetRecoilState = useSetRecoilState(createProjectState);
  const descriptionSetRecoilState = useSetRecoilState(createProjectState);
  const imageSetRecoilState = useSetRecoilState(createProjectState);

  useEffect(() => {
    console.log(projectName, projectDescription, projectImage);
  }, [projectName, projectImage, projectDescription]);

  // query 처리
  // 토큰 연동
  const { mutate } = usePostLinkageTokenHandler();
  // 지라 프로젝트 모두 가져오기
  const { isError, error, refetch } = useGetJiraProjectList();
  const createProjectData = usePostCreateProjectHandler();

  const creaetProjectHandler = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    createProjectData.mutate({ projectName, projectDescription, image });
  };

  if (createProjectData.isSuccess) {
    navigate('/projects');
  }

  return (
    <StyledContainer>
      <Text
        isFill={false}
        message={'프로젝트 생성'}
        fontSize={'2rem'}
        fontWeight={'900'}
        display={'block'}
      ></Text>
      <StyledFlex>
        <Sheet width="100%" height="300px" minHeight="150px" maxWidth="2000px">
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
              ></InputBox>
              <StyledMarginY>
                <StyledFlexRowEnd>
                  <Button
                    width="100px"
                    borderColor={theme.button.gray}
                    backgroundColor={theme.button.green}
                    isHover={true}
                    clickHandler={() => {
                      mutate({
                        email: 'woaol@naver.com',
                        tokenCodeId: 'JIRA',
                        value: jiraToken,
                      });
                      refetch();
                    }}
                  >
                    입력
                  </Button>
                </StyledFlexRowEnd>
              </StyledMarginY>
              {/* {isLoading && <div>Loading...</div>} */}
              {/* {data && (
                <Select width="100%">
                  <Option messages={dat}></Option>
                </Select>
              )} */}
              {isError && (
                <Notification width="200px" check={false} message={error.message}></Notification>
              )}
            </StyledMarginY>
            <StyledMarginY>
              <InputBox
                labelName="Git 토큰"
                labelSize="1.3rem"
                labelMarginBottom="20px"
                isRow={false}
                useSetRecoilState={gitSetRecoilState}
                recoilParam={'gitToken'}
              ></InputBox>
              <StyledMarginY>
                <StyledFlexRowEnd>
                  <Button
                    width="100px"
                    borderColor={theme.button.gray}
                    backgroundColor={theme.button.green}
                    isHover={true}
                    clickHandler={() =>
                      mutate({
                        email: 'woaol@naver.com',
                        tokenCodeId: 'SSAFYGITLAB',
                        value: gitToken,
                      })
                    }
                  >
                    입력
                  </Button>
                </StyledFlexRowEnd>
              </StyledMarginY>
              <Select width="100%">
                <Option messages={['프로젝트 1', '프로젝트 2', '프로젝트 3']}></Option>
              </Select>
            </StyledMarginY>
          </StyledFlexAround>
        </Sheet>
      </StyledFlex>
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
      </StyledFlex>
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
    </StyledContainer>
  );
};

export default index;
