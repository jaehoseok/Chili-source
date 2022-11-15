import { useState, ChangeEvent, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { updateUserState } from 'recoil/atoms/user/updateUser';

import { useGetUserInfoHandler, useUpdateUserImage, useUpdateUserName } from 'hooks/user';
import { useDeleteLinkageToken, useGetTokens, usePostLinkageTokenHandler } from 'hooks/auth';

import {
  StyledFlexColItemsCenter,
  StyledPadding,
  StyledInputLogo,
  StyledMarginY,
  StyledFlexRowEnd,
} from './style';

import Sheet from 'components/atoms/Sheet';
import Circle from 'components/atoms/Circle';
import Button from 'components/atoms/Button';
import Notification from 'components/atoms/Notification';
import InputBox from 'components/molecules/InputBox';

// ETC
import { theme } from 'styles/theme';

const index = () => {
  // user의 프로필 이미지 용 state
  const [image, setImage] = useState();

  // react-query
  const getUserInfo = useGetUserInfoHandler();
  const updateUserImage = useUpdateUserImage();
  const updateUserName = useUpdateUserName();
  const getTokens = useGetTokens();
  const postLinkageToken = usePostLinkageTokenHandler();
  const deleteLinkageToken = useDeleteLinkageToken();

  // update 요청시 필요한 recoil 작업
  const { userName, myGitLabToken, myJiraToken, myJiraEmail } = useRecoilValue(updateUserState);
  const userNameSetRecoilState = useSetRecoilState(updateUserState);
  const myGitLabTokenSetRecoilState = useSetRecoilState(updateUserState);
  const myJiraTokenSetRecoilState = useSetRecoilState(updateUserState);
  const myJiraEmailSetRecoilState = useSetRecoilState(updateUserState);

  useEffect(() => {
    if (updateUserImage.isSuccess) {
      getUserInfo.refetch();
    }
    if (updateUserName.isSuccess) {
      getUserInfo.refetch();
    }
    if (postLinkageToken.isSuccess) {
      getTokens.refetch();
    }
    if (deleteLinkageToken.isSuccess) {
      getTokens.refetch();
    }
  }, [updateUserImage.isSuccess, updateUserName, postLinkageToken]);

  const findValueForTokenCodeIdHandler = (tokenCodeId: string) => {
    if (getTokens.data) {
      for (const item of getTokens.data) {
        if (tokenCodeId === 'JIRAEMAIL') return item.email;
        else if (tokenCodeId === item.tokenCodeId) {
          return item.value;
        }
      }
    }
  };

  return (
    <>
      {/* 알림 창 메시지 나오게 하기 */}
      {updateUserImage.isSuccess && (
        <Notification
          check={true}
          message={'유저 이미지가 성공적으로 업데이트 되었습니다'}
          width={'300px'}
        ></Notification>
      )}
      {updateUserName.isSuccess && (
        <Notification
          check={true}
          message={'유저의 이름이 성공적으로 업데이트 되었습니다'}
          width={'300px'}
        ></Notification>
      )}
      {postLinkageToken.isSuccess && (
        <Notification
          check={true}
          message={'토큰이 성공적으로 업데이트 되었습니다'}
          width={'300px'}
        ></Notification>
      )}
      {deleteLinkageToken.isSuccess && (
        <Notification
          check={true}
          message={'토큰 연동이 해제되었습니다'}
          width={'300px'}
        ></Notification>
      )}
      <StyledFlexColItemsCenter>
        {/* 유저 설정 컴포넌트의 Container */}
        {getUserInfo.data && (
          <Sheet isShadow={true} width={'40vw'} maxWidth={'700px'} height={'1000px'}>
            <StyledPadding>
              <StyledFlexColItemsCenter>
                {/* 유저 프로필 이미지 자리 */}
                <Circle
                  height="120px"
                  isImage={true}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  url={image ? URL.createObjectURL(image.target.files[0]) : getUserInfo.data.image}
                ></Circle>
                <StyledMarginY>
                  <StyledInputLogo>
                    <input
                      type="file"
                      id="user_image"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        setImage(e);
                      }}
                    />
                  </StyledInputLogo>
                </StyledMarginY>
              </StyledFlexColItemsCenter>
              <StyledFlexRowEnd>
                <Button
                  width="100px"
                  borderColor={theme.button.green}
                  isHover={true}
                  clickHandler={() => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    updateUserImage.mutate(image);
                  }}
                >
                  이미지 수정
                </Button>
              </StyledFlexRowEnd>
              <StyledMarginY>
                <InputBox
                  labelName="사용자 이름"
                  isRow={false}
                  labelMarginBottom="10px"
                  containerWidth={'100%'}
                  inputWidth={'100%'}
                  inputHeight={'40px'}
                  labelSize={'1.1rem'}
                  inputValue={getUserInfo.data.name}
                  useSetRecoilState={userNameSetRecoilState}
                  recoilParam={'userName'}
                ></InputBox>
              </StyledMarginY>
              <StyledFlexRowEnd>
                <Button
                  width="150px"
                  borderColor={theme.button.green}
                  isHover={true}
                  clickHandler={() => {
                    updateUserName.mutate(userName);
                  }}
                >
                  사용자 이름 수정
                </Button>
              </StyledFlexRowEnd>
              <>
                <StyledMarginY>
                  <InputBox
                    labelName="지라 토큰"
                    isRow={false}
                    labelMarginBottom="10px"
                    containerWidth={'100%'}
                    inputWidth={'100%'}
                    inputHeight={'40px'}
                    labelSize={'1.1rem'}
                    inputValue={getTokens.data ? findValueForTokenCodeIdHandler('JIRA') : ''}
                    useSetRecoilState={myJiraTokenSetRecoilState}
                    recoilParam={'myJiraToken'}
                  ></InputBox>
                  <InputBox
                    labelName="지라 이메일"
                    isRow={false}
                    labelMarginBottom="10px"
                    containerWidth={'100%'}
                    inputWidth={'100%'}
                    inputHeight={'40px'}
                    labelSize={'1.1rem'}
                    inputValue={getTokens.data ? findValueForTokenCodeIdHandler('JIRAEMAIL') : ''}
                    useSetRecoilState={myJiraEmailSetRecoilState}
                    recoilParam={'myJiraEmail'}
                  ></InputBox>
                </StyledMarginY>
                <StyledFlexRowEnd>
                  {getTokens.data &&
                    getTokens.data?.findIndex(item => item.tokenCodeId === 'JIRA') >= 0 && (
                      <Button
                        width="150px"
                        borderColor={theme.color.bug}
                        isHover={true}
                        clickHandler={() => {
                          deleteLinkageToken.mutate('JIRA');
                        }}
                      >
                        지라 토큰 연동 해제
                      </Button>
                    )}
                  <Button
                    width="150px"
                    borderColor={theme.button.green}
                    isHover={true}
                    clickHandler={() => {
                      postLinkageToken.mutate({
                        tokenCodeId: 'JIRA',
                        value: myJiraToken,
                        email: myJiraEmail,
                      });
                    }}
                  >
                    {getTokens.data &&
                    getTokens.data?.findIndex(item => item.tokenCodeId === 'JIRA') >= 0
                      ? '지라 토큰 변경'
                      : '지라 토큰 연동'}
                  </Button>
                </StyledFlexRowEnd>
                <StyledMarginY>
                  <InputBox
                    labelName="깃랩 토큰"
                    isRow={false}
                    labelMarginBottom="10px"
                    containerWidth={'100%'}
                    inputWidth={'100%'}
                    inputHeight={'40px'}
                    labelSize={'1.1rem'}
                    inputValue={getTokens.data ? findValueForTokenCodeIdHandler('SSAFYGITLAB') : ''}
                    useSetRecoilState={myGitLabTokenSetRecoilState}
                    recoilParam={'myGitLabToken'}
                  ></InputBox>
                </StyledMarginY>
                <StyledFlexRowEnd>
                  {getTokens.data &&
                    getTokens.data?.findIndex(item => item.tokenCodeId === 'SSAFYGITLAB') >= 0 && (
                      <Button
                        width="150px"
                        borderColor={theme.color.bug}
                        isHover={true}
                        clickHandler={() => {
                          deleteLinkageToken.mutate('SSAFYGITLAB');
                        }}
                      >
                        깃랩 토큰 연동 해제
                      </Button>
                    )}
                  <Button
                    width="150px"
                    borderColor={theme.button.green}
                    isHover={true}
                    clickHandler={() => {
                      postLinkageToken.mutate({
                        tokenCodeId: 'SSAFYGITLAB',
                        value: myGitLabToken,
                      });
                    }}
                  >
                    {getTokens.data &&
                    getTokens.data?.findIndex(item => item.tokenCodeId === 'SSAFYGITLAB') >= 0
                      ? '깃랩 토큰 변경'
                      : '깃랩 토큰 연동'}
                  </Button>
                </StyledFlexRowEnd>
              </>
            </StyledPadding>
          </Sheet>
        )}
      </StyledFlexColItemsCenter>
    </>
  );
};

export default index;
