// API & Library
import { useState } from 'react';
import { useGetUserInfoHandler } from 'hooks/user';
import { useGetGanttChart, useGetGanttTasks } from 'hooks/project';

// Styles
import { StyledGanttList } from './style';

// Components
import { useParams } from 'react-router-dom';
import { GanttListItem } from '../GanttListItem';
import Button from 'components/atoms/Button';

// Types
export interface ganttType {
  id?: number;
}

export const GanttList = () => {
  // Init
  const { projectId } = useParams();
  const [ganttList, setGanttList] = useState([{}, {}]);
  const getGanttTasks = useGetGanttTasks(1, Number(projectId)).data;

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
        {getGanttTasks?.map((item, index) => {
          return (
            <div key={index}>
              <div>[id]: {item.id}</div>
              <div>[name]: {item.name}</div>
              <div>[start]: {item.start.toDateString()}</div>
              <div>[prog]: {item.progress}</div>
              <div>[end]: {item.end.toDateString()}</div>
              <div>&nbsp;</div>
            </div>
          );
        })}
        <div>======================</div>
      </StyledGanttList>
    </>
  );
};
