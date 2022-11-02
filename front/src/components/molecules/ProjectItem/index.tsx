import { useState } from 'react';

import {
  StyledProjectItem,
  ProjectLogo,
  ProjectInfo,
  InfoCategory,
  InfoContent,
  ProjectOption,
  styledType,
} from './style';

import Circle from '../../atoms/Circle';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';
import { theme } from '../../../styles/theme';

import { AiOutlinePushpin } from 'react-icons/ai';
import { SlOptionsVertical } from 'react-icons/sl';
import { BiUser } from 'react-icons/bi';

interface propsType extends styledType {
  logoImg?: string;
  title: string;
  leader: string;
  members: string[];
}

/**
 * @description
 * 미들 버킷에 추가된 IssueBar를 생성하는 컴포넌트
 * 이슈 유형(story, task, bug)에 따라 IssueBar를 생성할 수 있다.
 * +) 팀원 리스트 코드는 추후 수정 예정. (<Text isFill={false} message={members[0]} />)
 *
 * @example
 * <ProjectItem logoImg={이미지 경로} title={'Project 1'} leader={'dbcs'} members={['dbcs', 'inte', 'bell']}/>
 *
 * @param {string?} width       - 이슈 템플릿 넓이 [default: 900px]
 * @param {string?} height      - 이슈 템플릿 높이 [default: 160px]
 * @param {string?} logoImg     - 프로젝트 로고 이미지 경로
 * @param {string} title        - 프로젝트명
 * @param {string} leader       - 팀장
 * @param {string[]} members    - 팀원(팀장 포함)
 * @param {boolean?} isPinned   - 상단 고정 여부 [default : false]
 *
 * @author dbcs
 */

const index = ({ width, height, title, leader, members, logoImg, isPinned }: propsType) => {
  const [pin, setPin] = useState(isPinned);
  return (
    <StyledProjectItem>
      <Button
        width={'100%'}
        height={'100%'}
        clickHandler={() => console.log(`${title}프로젝트 대쉬보드 이동`)}
      >
        <ProjectLogo>
          <Circle height={'100px'}>
            <img src={logoImg} />
          </Circle>
        </ProjectLogo>
        <ProjectInfo>
          <InfoCategory>
            <Text isFill={false} message={'프로젝트명'} />
            <Text isFill={false} message={'팀장'} />
            <Text isFill={false} message={'팀원'} />
          </InfoCategory>
          <InfoContent>
            <Text isFill={false} message={title} />
            <Text isFill={false} message={leader} />
            <Text isFill={false} message={members[0]} />
          </InfoContent>
        </ProjectInfo>
        <ProjectOption>
          <Button width={'36px'} height={'36px'} clickHandler={() => setPin(!pin)}>
            <AiOutlinePushpin size={24} style={{ color: pin ? '#2684FF' : 'black' }} />
          </Button>
          <Button width={'36px'} height={'36px'} clickHandler={() => console.log('setting modal')}>
            <SlOptionsVertical size={18} style={{ color: 'black', marginTop: '4px' }} />
          </Button>
        </ProjectOption>
      </Button>
    </StyledProjectItem>
  );
};

export default index;
