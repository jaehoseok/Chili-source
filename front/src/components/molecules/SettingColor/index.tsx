import { useState } from 'react';

import { StyledMarginY, StyledFlexRowItemsCenter, StyledMarginL, StyledUserName } from './style';

import Circle from 'components/atoms/Circle';
import Button from 'components/atoms/Button';

import { theme } from 'styles/theme';
import { UseMutateFunction } from '@tanstack/react-query';
import { HexColorPicker } from 'react-colorful';

interface propsType {
  userImage: string;
  userName: string;
  userColor: string;
}

const index = ({ userImage, userName, userColor }: propsType) => {
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
        <Button
          width="70px"
          borderColor={theme.button.gray}
          backgroundColor={theme.button.green}
          isHover={true}
        >
          변경
        </Button>
      </StyledFlexRowItemsCenter>
    </StyledMarginY>
  );
};

export default index;
