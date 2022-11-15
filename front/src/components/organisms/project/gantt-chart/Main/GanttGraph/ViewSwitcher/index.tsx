import { ViewMode } from 'gantt-task-react';

interface propsType {
  isChecked: boolean;
  onViewListChange: (isChecked: boolean) => void;
  onViewModeChange: (viewMode: ViewMode) => void;
}

export const ViewSwitcher = ({ onViewModeChange, onViewListChange, isChecked }: propsType) => {
  return (
    <>
      <div>뷰스위치</div>
      <div className="Switch">
        <label className="Switch_Toggle">
          <input
            type="checkbox"
            defaultChecked={isChecked}
            onClick={() => onViewListChange(!isChecked)}
          />
          <span className="Slider" />
        </label>
        Show Task List
      </div>
    </>
  );
};
