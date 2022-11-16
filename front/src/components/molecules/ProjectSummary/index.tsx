import { useNavigate } from 'react-router-dom';

import {
  StyledFlex,
  StyledWidth80,
  StyledFlexItemsCenter,
  StyledFlexColumn,
  StyledMarginY,
  StyledWidth100px,
  StyledInlineBlock,
  StyledFlexCenter,
} from './style';

import Sheet from 'components/atoms/Sheet';
import Circle from 'components/atoms/Circle';
import Text from 'components/atoms/Text';
import Button from 'components/atoms/Button';

import { useGetTeamForProject } from 'hooks/project';

import { theme } from 'styles/theme';

import { UseMutationResult } from '@tanstack/react-query';
import { useGetUserInfoHandler } from 'hooks/user';

interface propsType {
  idx: number;
  item: {
    id: number;
    name: string;
    descripton: string;
    image: string;
    gitRepo: string | null;
    latestGanntVersion: 0;
    tokenList: string[];
  };
  deleteProject: UseMutationResult<void, unknown, { projectId: number }, unknown>;
}

const index = ({ idx, item, deleteProject }: propsType) => {
  const navigate = useNavigate();

  const getTeamForProject = useGetTeamForProject(item.id);
  const getUserInfo = useGetUserInfoHandler();


  const deleteProjectHandler = (projectId: number) => {
    deleteProject.mutate({ projectId });

    // 프로젝트 삭제시 localStorage의 데이터 역시 함께 삭제해주어야 함
    if (localStorage.getItem('project-tab-list')) {
      const projectTabList = JSON.parse(localStorage.getItem('project-tab-list') as string);
      const newTabs = [...projectTabList];
      localStorage.setItem(
        'project-tab-list',
        JSON.stringify(newTabs.filter(tab => tab.id !== projectId)),
      );
    }
  };

  const linkToDashBoardHandler = (projectId: number) => {
    navigate(`/project/${projectId}/dashboard`);
  };

  const linkToSettingHandler = (projectId: number) => {
    navigate(`/project/${projectId}/setting`);
  };

  // 가져온 팀원 목록에서 MASTER를 찾아, 마스터의 이미지를 반환
  const findProjectMasterHandler = (data: typeof getTeamForProject.data) => {
    if (data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].role.id === 'MASTER') {
          return data[i].userImage;
        }
      }
    }
  };

  // 현재 렌더링한 프로젝트 중, 내가 MASTER인지 아닌지 확인하는 함수
  // 마스터의 경우에만 프로젝트 삭제 버튼이 보인다.
  const isMasterHandler = () => {
    const users = getTeamForProject.data;
    if (users) {
      for (const user of users) {
        if (user.role.id === 'MASTER') {
          return user.userId === getUserInfo.data?.id;
        }
      }
    }
  };

  return (
    <StyledFlex key={idx}>
      <Sheet width="100%" height="25vh" minHeight="300px">
        <StyledWidth80>
          <StyledFlexItemsCenter>
            <Circle height={'150px'} isImage={true} url={item.image} />
            <StyledFlexColumn>
              <StyledMarginY>
                <StyledWidth100px>
                  <Text
                    message="프로젝트 명"
                    isFill={false}
                    fontSize={'1.5rem'}
                    fontWeight={'700'}
                  ></Text>
                </StyledWidth100px>
                <Text message={item.name} isFill={false}></Text>
              </StyledMarginY>
              <StyledMarginY>
                <StyledFlexCenter>
                  <StyledWidth100px>
                    <Text
                      message="팀장"
                      isFill={false}
                      fontSize={'1.5rem'}
                      fontWeight={'700'}
                    ></Text>
                  </StyledWidth100px>
                  <StyledInlineBlock>
                    <Circle
                      height={'40px'}
                      isImage={true}
                      url={findProjectMasterHandler(
                        getTeamForProject.data && getTeamForProject.data,
                      )}
                    />
                  </StyledInlineBlock>
                </StyledFlexCenter>
              </StyledMarginY>
              <StyledMarginY>
                <StyledFlexCenter>
                  <StyledWidth100px>
                    <Text
                      message="멤버"
                      isFill={false}
                      fontSize={'1.5rem'}
                      fontWeight={'700'}
                    ></Text>
                  </StyledWidth100px>
                  {getTeamForProject.data &&
                    getTeamForProject.data.map(user => (
                      <StyledInlineBlock>
                        <Circle height={'40px'} isImage={true} url={user.userImage} />
                      </StyledInlineBlock>
                    ))}
                </StyledFlexCenter>
              </StyledMarginY>
            </StyledFlexColumn>
          </StyledFlexItemsCenter>
        </StyledWidth80>
        <Button
          backgroundColor={theme.color.primary}
          isHover={true}
          clickHandler={() => linkToDashBoardHandler(item.id)}
          borderColor={theme.button.gray}
        >
          이동
        </Button>
        {isMasterHandler() && (
          <Button
            backgroundColor={theme.color.bug}
            clickHandler={() => deleteProjectHandler(item.id)}
            isHover={true}
            borderColor={theme.button.gray}
          >
            삭제
          </Button>
        )}
      </Sheet>
    </StyledFlex>
  );
};

export default index;
