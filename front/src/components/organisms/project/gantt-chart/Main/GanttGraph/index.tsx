// API & Library
import { useState } from 'react';
import { Task, ViewMode, Gantt } from 'gantt-task-react';
import { ViewSwitcher } from './ViewSwitcher';

// Styles
import { StyledGanttGraph } from './style';
import 'gantt-task-react/dist/index.css';

export const GanttGraph = () => {
  // Init
  const currentDate = new Date();
  const initialTasks: Task[] = [
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      name: 'Some Project',
      id: 'ProjectSample',
      progress: 25,
      type: 'project',
      hideChildren: false,
      displayOrder: 1,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 2, 12, 28),
      name: 'Idea',
      id: 'Task 0',
      progress: 45,
      type: 'task',
      project: 'ProjectSample',
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

  // 뷰 모드 전환
  let columnWidth = 65;
  if (view === ViewMode.Year) {
    columnWidth = 350;
  } else if (view === ViewMode.Month) {
    columnWidth = 300;
  } else if (view === ViewMode.Week) {
    columnWidth = 250;
  }

  // Methods
  /**
   * @description
   * 프로젝트 시작일과 끝일 지정
   *
   * @param tasks
   * @param projectId
   * @returns
   */
  const getStartEndDateForProject = (tasks: Task[], projectId: string) => {
    const projectTasks = tasks.filter(t => t.project === projectId);
    let start = projectTasks[0].start;
    let end = projectTasks[0].end;

    for (let i = 0; i < projectTasks.length; i++) {
      const task = projectTasks[i];
      if (start.getTime() > task.start.getTime()) {
        start = task.start;
      }
      if (end.getTime() < task.end.getTime()) {
        end = task.end;
      }
    }
    return [start, end];
  };

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

  return (
    <>
      <StyledGanttGraph>
        <ViewSwitcher
          onViewModeChange={viewMode => setView(viewMode)}
          onViewListChange={setIsChecked}
          isChecked={isChecked}
        />

        <div>테스트 코드</div>
        <Gantt
          tasks={tasks}
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
      </StyledGanttGraph>
    </>
  );
};
