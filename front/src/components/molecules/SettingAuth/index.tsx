import { useState } from 'react';

import { StyledMarginY, StyledFlexRowItemsCenter, StyledMarginL, StyledUserName } from './style';

import Circle from 'components/atoms/Circle';
import Button from 'components/atoms/Button';
import Select from 'components/atoms/Select';
import Option from 'components/atoms/Option';

import { theme } from 'styles/theme';
import { UseMutateFunction } from '@tanstack/react-query';

interface propsType {
  roleId: string;
  userImage: string;
  userName: string;
  projectId: number;
  userId: number;
  updateTeamRole: UseMutateFunction<
    void,
    unknown,
    { projectId: number; roleId: string; userId: number },
    unknown
  >;
}

/**
 * @description
 * 프로젝트 팀원의 권한을 변경하는 컴포넌트
 *
 * @author bell
 */
const index = ({ roleId, userImage, userName, projectId, userId, updateTeamRole }: propsType) => {
  // 권한 설정용 state
  const [authorization, setAuthorization] = useState(roleId as string);

  return (
    <StyledMarginY>
      <StyledFlexRowItemsCenter>
        <Circle height="60px" isImage={true} url={userImage}></Circle>
        <StyledUserName>{userName}</StyledUserName>
        <Select setState={setAuthorization}>
          <Option
            messages={['MASTER', 'MAINTAINER', 'DEVELOPER']}
            selected={authorization}
          ></Option>
        </Select>
        <StyledMarginL />
        <Button
          width="70px"
          borderColor={theme.button.gray}
          backgroundColor={theme.button.green}
          isHover={true}
          clickHandler={() => {
            updateTeamRole({
              projectId: projectId,
              roleId: authorization,
              userId: userId,
            });
          }}
        >
          변경
        </Button>
        <StyledMarginL />
        <Button
          width="70px"
          borderColor={theme.button.gray}
          backgroundColor={theme.color.bug}
          isHover={true}
        >
          강퇴
        </Button>
      </StyledFlexRowItemsCenter>
    </StyledMarginY>
  );
};

export default index;
