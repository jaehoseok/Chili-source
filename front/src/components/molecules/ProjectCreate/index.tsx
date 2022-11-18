import { ChangeEvent, useEffect, useState, Dispatch, SetStateAction } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { createProjectState } from 'recoil/atoms/project/createProject';

// STYLED COMPONENT
import {
  StyledInputBox,
  StyledMarginY,
  StyledLabel,
  StyledFlexRow,
  StyledFlexRowEnd,
  StyledWidth70,
  StyledPadding,
} from './style';
import { theme } from 'styles/theme';

// ICON
import { AiOutlineCamera } from 'react-icons/ai';

// HOOKS
import { usePostCreateProjectHandler } from 'hooks/project';

// MOLECULES
import InputBox from 'components/molecules/InputBox';
import TextAreaBox from 'components/molecules/TextAreaBox';

// ATOMS
import Notification from 'components/atoms/Notification';
import Sheet from 'components/atoms/Sheet';
import Circle from 'components/atoms/Circle';
import Button from 'components/atoms/Button';

interface propsType {
  setProjectId: Dispatch<SetStateAction<number | undefined>>;
  setIsCreated: Dispatch<SetStateAction<boolean>>;
}

/**
 * @description
 * 프로젝트 생성 페이지에서 프로젝트를 생성하는 영역
 *
 * @author bell
 */
const index = ({ setProjectId, setIsCreated }: propsType) => {
  // project-logo용 state
  const [image, setImage] = useState();

  // react-query
  const createProjectData = usePostCreateProjectHandler();

  // 프로젝트 생성 시 필요한 데이터를 업데이트 및 불러오기 위한 리코일 작업
  const { projectName } = useRecoilValue(createProjectState);
  const { projectDescription } = useRecoilValue(createProjectState);
  const { projectImage } = useRecoilValue(createProjectState);
  const nameSetRecoilState = useSetRecoilState(createProjectState);
  const descriptionSetRecoilState = useSetRecoilState(createProjectState);
  const imageSetRecoilState = useSetRecoilState(createProjectState);

  // 생성 버튼 클릭시 프로젝트 생성 (POST) 요청 실행
  const creaetProjectHandler = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    createProjectData.mutate({ projectName, projectDescription, image });
    nameSetRecoilState(prevData => {
      return { ...prevData, projectName: '' };
    });
    descriptionSetRecoilState(prevData => {
      return { ...prevData, projectDescription: '' };
    });
    imageSetRecoilState(prevData => {
      return { ...prevData, projectImage: '' };
    });
  };

  useEffect(() => {
    if (createProjectData.isSuccess) {
      setProjectId(createProjectData.data);
      setIsCreated(true);
    }
  }, [createProjectData.isSuccess]);

  return (
    <>
      {createProjectData.isSuccess && (
        <Notification
          width="300px"
          check={true}
          message={'프로젝트가 성공적으로 생성되었습니다!'}
        ></Notification>
      )}
      <StyledPadding>
        <Sheet width="100%" isShadow={true}>
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
                disabled={createProjectData.isSuccess}
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
                disabled={createProjectData.isSuccess}
                nonResize={true}
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
          </StyledInputBox>
        </Sheet>
      </StyledPadding>
    </>
  );
};

export default index;
