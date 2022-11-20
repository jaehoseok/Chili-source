// API & Library
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetGanttTasks, useUpdateGantt, useDeleteGantt } from 'hooks/project';
import { Gantt, Task, ViewMode } from 'gantt-task-react';

// Styles
import 'gantt-task-react/dist/index.css';
import { StyledGanttGraph } from './style';

export const GanttGraph = () => {
  // Init
  const { projectId } = useParams();
  const ganttTasks = useGetGanttTasks(1, Number(projectId)).data;
  const updateGanttTask = useUpdateGantt().mutate;
  const deleteGanttTask = useDeleteGantt().mutate;

  const [isChecked, setIsChecked] = useState(true);
  const [view, setView] = useState<ViewMode>(ViewMode.Day);

  let columnWidth = 65;
  if (view === ViewMode.Year) {
    columnWidth = 350;
  } else if (view === ViewMode.Month) {
    columnWidth = 300;
  } else if (view === ViewMode.Week) {
    columnWidth = 250;
  }

  // Methods
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

  const dataChangeHandler = (task: Task) => {
    if (!ganttTasks) return;

    let newTasks = ganttTasks.map(t => (t.id === task.id ? task : t));
    if (task.project) {
      const [start, end] = getStartEndDateForProject(newTasks, task.project);
      const project = newTasks[newTasks.findIndex(t => t.id === task.project)];
      if (project.start.getTime() !== start.getTime() || project.end.getTime() !== end.getTime()) {
        const changedProject = { ...project, start, end };
        newTasks = newTasks.map(t => (t.id === task.project ? changedProject : t));
      }
    }

    task.start.setHours(task.start.getHours() + 9);
    task.end.setHours(task.end.getHours() + 9);

    const params = {
      userId: task.displayOrder,
      id: Number(task.id),
      startTime: task.start.toISOString(),
      endTime: task.end.toISOString(),
    };

    updateGanttTask(params);

    // setTasks(newTasks);
  };

  const doubleClickHandler = (task: Task) => {
    const conf = window.confirm(`${task.name} 이슈를 삭제해도될까요?`);
    if (conf) {
      deleteGanttTask(Number(task.id));
    }
    return conf;
  };

  const clickHandler = (task: Task) => {
    task.start.setHours(task.start.getHours() + 9);
    task.end.setHours(task.end.getHours() + 9);

    const params = {
      userId: task.displayOrder,
      id: Number(task.id),
      startTime: task.start.toISOString(),
      endTime: task.end.toISOString(),
      progress: task.progress,
    };

    updateGanttTask(params);
  };

  const renderGantt = () => {
    if (ganttTasks && ganttTasks.length != 0) {
      return (
        <>
          <Gantt
            tasks={ganttTasks}
            viewMode={view}
            onDateChange={dataChangeHandler}
            onProgressChange={clickHandler}
            onDoubleClick={doubleClickHandler}
            onClick={clickHandler}
            columnWidth={columnWidth}
            listCellWidth={isChecked ? '120px' : ''}
          />
        </>
      );
    } else {
      return (
        <>
          <div>현재 데이터가 없습니다.</div>
        </>
      );
    }
  };

  // Return
  return (
    <>
      <StyledGanttGraph>
        <div style={{ display: 'flex' }}>
          <button onClick={() => setView(ViewMode.Hour)}>시간별</button>
          <button onClick={() => setView(ViewMode.Day)}>일별</button>
          <button onClick={() => setView(ViewMode.Month)}>달별</button>
          <button onClick={() => setView(ViewMode.Year)}>년별</button>
          <div>이슈 보기</div>
          <input
            type="checkbox"
            defaultChecked={isChecked}
            onClick={() => setIsChecked(!isChecked)}
          />
        </div>
        {renderGantt()}
      </StyledGanttGraph>
    </>
  );
};
