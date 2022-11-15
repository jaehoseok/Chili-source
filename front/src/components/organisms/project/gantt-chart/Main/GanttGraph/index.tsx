// API & Library
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Task, ViewMode, Gantt } from 'gantt-task-react';
import { ViewSwitcher } from './ViewSwitcher';
import { useGetGanttChart, useGetGanttTasks } from 'hooks/project';
import { useGetUserInfoHandler } from 'hooks/user';

// Styles
import { StyledGanttGraph } from './style';
import 'gantt-task-react/dist/index.css';

export const GanttGraph = () => {
  // Init
  const currentDate = new Date();
  const initialTasks: Task[] = [
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 2, 12, 28),
      name: 'Idea',
      id: 'Task 0',
      progress: 45,
      type: 'task',
      displayOrder: 2,
    },
  ];
  const [view, setView] = useState<ViewMode>(ViewMode.Day);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isChecked, setIsChecked] = useState(true);

  const { projectId } = useParams();
  const getUserInfo = useGetUserInfoHandler().data;
  const getGanttChart = useGetGanttChart(1, Number(projectId));
  const getGanttTasks = useGetGanttTasks(1, Number(projectId)).data;

  let columnWidth = 65;
  if (view === ViewMode.Year) {
    columnWidth = 350;
  } else if (view === ViewMode.Month) {
    columnWidth = 300;
  } else if (view === ViewMode.Week) {
    columnWidth = 250;
  }

  // Methods
  const handleTaskChange = () => {
    console.log('[change]');
  };

  const handleTaskDelete = () => {
    console.log('[delete]');
  };

  const handleProgressChange = () => {
    console.log('[progress]');
  };

  const handleDblClick = () => {
    console.log('[double click]');
  };

  const handleClick = () => {
    console.log('[click]');
  };
  const handleSelect = () => {
    console.log('[select]');
  };

  const handleExpanderClick = () => {
    console.log('[expander click]');
  };

  // Return
  return (
    <>
      <StyledGanttGraph>
        <ViewSwitcher
          onViewModeChange={viewMode => setView(viewMode)}
          onViewListChange={setIsChecked}
          isChecked={isChecked}
        />
        <Gantt
          tasks={getGanttTasks && getGanttTasks.length != 0 ? getGanttTasks : tasks}
          viewMode={view}
          onDateChange={handleTaskChange}
          onDelete={handleTaskDelete}
          onProgressChange={handleProgressChange}
          onDoubleClick={handleDblClick}
          onClick={handleClick}
          onSelect={handleSelect}
          onExpanderClick={handleExpanderClick}
          listCellWidth={isChecked ? '155px' : ''}
          ganttHeight={300}
          columnWidth={columnWidth}
        />
        <div>=====DB 간트 이슈=====</div>
        {getGanttChart.data?.map((item, index) => {
          return (
            <div key={index}>
              <div>[id]: {item.id}</div>
              <div>[name]: {item.issueSummary}</div>
              <div>[start]: {item.startTime}</div>
              <div>[prog]: {item.progress}</div>
              <div>[end]: {item.endTime}</div>
              <div>[end]: {item.issueCode}</div>
              <div>&nbsp;</div>
            </div>
          );
        })}
        <div>======================</div>
      </StyledGanttGraph>
    </>
  );
};
