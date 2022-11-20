// REACT
import { useNavigate } from 'react-router-dom';
import { UseMutationResult } from '@tanstack/react-query';

// API
import { useGetUserInfoHandler } from 'hooks/user';
import { useGetTeamForProject } from 'hooks/project';

// ICONS
import { GiKing } from 'react-icons/gi';
import { FaUserFriends } from 'react-icons/fa';
import { BsFillTrashFill } from 'react-icons/bs';

// STYLE
import {
  StyledFlexColCenter,
  StyledH2,
  StyledFlexColumnItemsCenter,
  StyledMarginBottom,
  StyledInlineBlock,
} from './style';
import { theme } from 'styles/theme';

import Sheet from 'components/atoms/Sheet';
import Circle from 'components/atoms/Circle';
import FillButton from 'components/atoms/FillButton';

interface propsType {
  idx: number;
  item: {
    id: number;
    name: string;
    description: string;
    image: string;
    gitRepo: string | null;
    latestGanntVersion: 0;
    tokenList: string[];
  };
  deleteProject: UseMutationResult<void, unknown, { projectId: number }, unknown>;
}

/**
 *
 * @description
 * 프로젝트 선택페이지에서 프로젝트 하나 하나마다 쓰이는 sheet 컴포넌트 영역
 *
 * @author bell
 */
const index = ({ idx, item, deleteProject }: propsType) => {
  const navigate = useNavigate();

  // react-query
  const getTeamForProject = useGetTeamForProject(item.id);
  const getUserInfo = useGetUserInfoHandler();

  // project를 삭제하는 함수
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

  // project 링크 이동 함수
  const linkToDashBoardHandler = (projectId: number) => {
    navigate(`/project/${projectId}/dashboard`);
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
    <div key={idx}>
      <Sheet minWidth="350px" height="450px" isShadow={true} isHover={true}>
        <StyledFlexColCenter>
          {/* 마스터라는 것이 확인되면 바로 삭제할 수 있음 */}
          {isMasterHandler() && (
            <BsFillTrashFill
              className="hover-text"
              fontSize={'1.5rem'}
              style={{ position: 'absolute', top: '20px', right: '20px' }}
              onClick={() => deleteProjectHandler(item.id)}
            />
          )}
          <Circle height="100px" backgroundColor={theme.color.primary}>
            <Circle height="90px" isImage={true} url={item && item.image}></Circle>
          </Circle>
          <StyledFlexColumnItemsCenter>
            <StyledH2 className="hover-text">{item && item.name}</StyledH2>
            <StyledMarginBottom />
            <StyledMarginBottom />
            <StyledMarginBottom />
            <div>
              <GiKing
                className="hover-text"
                fontSize={'2rem'}
                style={{ position: 'relative', bottom: '3px' }}
              ></GiKing>
              <StyledInlineBlock>
                <Circle
                  height={'40px'}
                  isImage={true}
                  url={findProjectMasterHandler(getTeamForProject.data && getTeamForProject.data)}
                />
              </StyledInlineBlock>
            </div>
            <StyledMarginBottom />
            <div>
              <StyledInlineBlock>
                <FaUserFriends className="hover-text" fontSize={'1.5rem'} />
              </StyledInlineBlock>
              {getTeamForProject.data &&
                getTeamForProject.data.map(user => (
                  <StyledInlineBlock>
                    <Circle height={'25px'} isImage={true} url={user.userImage} />
                  </StyledInlineBlock>
                ))}
            </div>
            <StyledMarginBottom />
            <FillButton
              width="100px"
              backgroundColor={theme.button.green}
              isHover={true}
              hoverColor={theme.button.darkgreen}
              clickHandler={() => linkToDashBoardHandler(item.id)}
            >
              입장
            </FillButton>
          </StyledFlexColumnItemsCenter>
        </StyledFlexColCenter>
      </Sheet>
    </div>
  );
};

export default index;
