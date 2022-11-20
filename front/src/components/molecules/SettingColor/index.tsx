import { useState } from 'react';

import { StyledMarginY, StyledFlexRowItemsCenter, StyledMarginL, StyledUserName } from './style';

import Circle from 'components/atoms/Circle';
import FillButton from 'components/atoms/FillButton';

import { theme } from 'styles/theme';
import { UseMutateFunction } from '@tanstack/react-query';
import { HexColorPicker } from 'react-colorful';

interface propsType {
  userImage: string;
  userName: string;
  userColor: string;
  projectId: number;
  userId: number;
  updateTeamColor: UseMutateFunction<
    void,
    unknown,
    { projectId: number; userColor: string; userId: number },
    unknown
  >;
}

/**
 * @description
 * 프로젝트 팀원의 색상을 변경하는 컴포넌트
 *
 * @author bell
 */
const index = ({
  userImage,
  userName,
  userColor,
  projectId,
  userId,
  updateTeamColor,
}: propsType) => {
  // 색 변경용 state
  const [color, setColor] = useState(userColor as string);

  return (
    <StyledMarginY>
      <StyledFlexRowItemsCenter>
        <Circle height="60px" isImage={true} url={userImage}></Circle>
        <StyledUserName>{userName}</StyledUserName>
        <div
          style={{
            width: '40px',
            height: '20px',
            border: '3px solid #e9e9e9',
            backgroundColor: color,
          }}
        ></div>
        <StyledMarginL />
        <HexColorPicker
          style={{ width: '200px', height: '100px' }}
          onChange={setColor}
          color={color}
        ></HexColorPicker>
        <StyledMarginL />
        <FillButton
          width="70px"
          backgroundColor={theme.button.green}
          isHover={true}
          hoverColor={theme.button.darkgreen}
          clickHandler={() => {
            updateTeamColor({
              projectId: projectId,
              userColor: color,
              userId: userId,
            });
          }}
        >
          변경
        </FillButton>
      </StyledFlexRowItemsCenter>
    </StyledMarginY>
  );
};

export default index;
