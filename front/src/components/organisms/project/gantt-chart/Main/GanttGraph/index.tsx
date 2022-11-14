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
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 2),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4, 0, 0),
      name: 'Research',
      id: 'Task 1',
      progress: 25,
      dependencies: ['Task 0'],
      type: 'task',
      project: 'ProjectSample',
      displayOrder: 3,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8, 0, 0),
      name: 'Discussion with team',
      id: 'Task 2',
      progress: 10,
      dependencies: ['Task 1'],
      type: 'task',
      project: 'ProjectSample',
      displayOrder: 4,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 9, 0, 0),
      name: 'Developing',
      id: 'Task 3',
      progress: 2,
      dependencies: ['Task 2'],
      type: 'task',
      project: 'ProjectSample',
      displayOrder: 5,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
      name: 'Review',
      id: 'Task 4',
      type: 'task',
      progress: 70,
      dependencies: ['Task 2'],
      project: 'ProjectSample',
      displayOrder: 6,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      name: 'Release',
      id: 'Task 6',
      progress: currentDate.getMonth(),
      type: 'milestone',
      dependencies: ['Task 4'],
      project: 'ProjectSample',
      displayOrder: 7,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 19),
      name: 'Party Time',
      id: 'Task 9',
      progress: 0,
      isDisabled: true,
      type: 'task',
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
          tasks={getGanttTasks ? getGanttTasks : tasks}
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
