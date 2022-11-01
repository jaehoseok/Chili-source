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
import Sheet from '../../atoms/Sheet';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';
import { theme } from '../../../styles/theme';

import { AiOutlinePushpin } from 'react-icons/ai';
import { SlOptionsVertical } from 'react-icons/sl';
import { BiUser } from 'react-icons/bi';

type propsType = styledType;

const index = ({
  children,
  width,
  height,
  title,
  leader,
  members,
  logoImg,
  isPinned,
}: propsType) => {
  const [pin, setPin] = useState(isPinned);
  return (
    <StyledProjectItem title={title} leader={leader} members={members}>
      <Button
        width={'100%'}
        height={'100%'}
        clickHandler={() => console.log(`${title}프로젝트 대쉬보드 이동`)}
      >
        <ProjectLogo>
          <Circle height={100}>
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
