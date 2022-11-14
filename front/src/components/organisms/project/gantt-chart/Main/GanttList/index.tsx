// API & Library
import { useState } from 'react';
import { useGetUserInfoHandler } from 'hooks/user';
import {} from 'hooks/project';

// Styles
import { StyledGanttList } from './style';

// Components
import { GanttListItem } from '../GanttListItem';
import Button from 'components/atoms/Button';

// Types
export interface ganttType {
  id?: number;
}

export const GanttList = () => {
  // Init
  const [ganttList, setGanttList] = useState([{}, {}]);
  const getUserInfo = useGetUserInfoHandler().data;

  return (
    <>
      <StyledGanttList className="gantt-aside">
        {ganttList.map((item, index) => {
          return (
            <div key={index}>
              <GanttListItem />
            </div>
          );
        })}
        <Button borderColor="#000000">버튼</Button>
        <div>===간트 데이터===</div>
        <div>id: {getUserInfo?.id}</div>
        <div>name: {getUserInfo?.name}</div>
        <div>image: {getUserInfo?.image}</div>
        <div>================</div>

        <div>===유저 데이터===</div>
        <div>id: {getUserInfo?.id}</div>
        <div>name: {getUserInfo?.name}</div>
        <div>image: {getUserInfo?.image}</div>
        <div>================</div>
      </StyledGanttList>
    </>
  );
};
