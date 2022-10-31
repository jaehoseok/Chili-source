import {
  StyledProjectItem,
  ProjectLogo,
  ProjectInfo,
  ProjectOption,
  InfoElement,
  ElementCategory,
  ElementContent,
  styledType,
} from './style';
import Circle from '../../atoms/Circle';
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
  return (
    <StyledProjectItem title={title} leader={leader} members={members}>
      <ProjectLogo>
        <Circle height={100}>
          <img src={logoImg} />
        </Circle>
      </ProjectLogo>
      <ProjectInfo>
        <InfoElement>
          <ElementCategory>프로젝트명</ElementCategory>
          <ElementContent>{title}</ElementContent>
        </InfoElement>
        <InfoElement>
          <ElementCategory>팀장</ElementCategory>
          <ElementContent>{leader}</ElementContent>
        </InfoElement>
        <InfoElement>
          <ElementCategory>팀원</ElementCategory>
          <ElementContent>{members}</ElementContent>
          <ElementContent>
            <BiUser style={{ marginTop: '0.125rem' }} />
          </ElementContent>
          <ElementContent>{members.length}</ElementContent>
        </InfoElement>
      </ProjectInfo>
      <ProjectOption>
        <AiOutlinePushpin
          size={20}
          style={{ marginTop: `0.125rem`, color: isPinned ? '#2684FF' : 'black' }}
        />
        <SlOptionsVertical style={{ marginTop: `0.25rem` }} />
      </ProjectOption>
    </StyledProjectItem>
  );
};

export default index;
