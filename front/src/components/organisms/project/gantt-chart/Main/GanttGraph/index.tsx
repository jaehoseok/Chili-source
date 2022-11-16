// API & Library
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Task, ViewMode, Gantt } from 'gantt-task-react';
import { ViewSwitcher } from './ViewSwitcher';
import { useGetGanttTasks } from 'hooks/project';

// Styles
import { StyledGanttGraph } from './style';
import 'gantt-task-react/dist/index.css';

export const GanttGraph = () => {
  // Init
  const [view, setView] = useState<ViewMode>(ViewMode.Day);
  const [isChecked, setIsChecked] = useState(true);

  const { projectId } = useParams();

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

  const renderGantt = () => {
    if (getGanttTasks && getGanttTasks.length != 0) {
      return (
        <>
          <Gantt
            tasks={getGanttTasks}
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
        <ViewSwitcher
          onViewModeChange={viewMode => setView(viewMode)}
          onViewListChange={setIsChecked}
          isChecked={isChecked}
        />

        {renderGantt()}

        {/* <Gantt
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
        /> */}

        {/* <div>=====DB 간트 이슈=====</div>
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
        <div>======================</div> */}
      </StyledGanttGraph>
    </>
  );
};
