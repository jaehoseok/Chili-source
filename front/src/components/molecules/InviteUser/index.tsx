import React from 'react';

import { StyledMarginY, StyledFlexRowItemsCenter, StyledUserName } from './style';

import Circle from 'components/atoms/Circle';
import Button from 'components/atoms/Button';

import { theme } from 'styles/theme';
import { UseMutateFunction } from '@tanstack/react-query';

interface propsType {
  userImage: string;
  userName: string;
  projectId: number;
  userId: number;
  postInviteTeam: UseMutateFunction<void, unknown, { projectId: number; userId: number }, unknown>;
}

const index = ({ userImage, userName, projectId, userId, postInviteTeam }: propsType) => {
  return (
    <StyledMarginY>
      <StyledFlexRowItemsCenter>
        <Circle height="30px" isImage={true} url={userImage}></Circle>
        <StyledUserName>{userName}</StyledUserName>
        <Button
          width="70px"
          borderColor={theme.button.gray}
          backgroundColor={theme.button.green}
          isHover={true}
          clickHandler={() => {
            postInviteTeam({ projectId, userId });
          }}
        >
          초대
        </Button>
      </StyledFlexRowItemsCenter>
    </StyledMarginY>
  );
};

export default index;
