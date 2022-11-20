// API & Library
import { useNavigate, useParams } from 'react-router-dom';

// Styles
import { StyledWidgetData, styledType } from '../style';

interface propsType extends styledType {
  url?: string | null;
  path?: string;
}

/**
 * @description 위젯을 추가하는 버튼
 * @author inte
 */
export const ADD = ({ path }: propsType) => {
  // Init
  const navigate = useNavigate();
  const { projectId } = useParams();
  const splitPath = path ? path.split('-') : ['0'];

  // Methods
  const clickHandler = () => {
    navigate(`/project/${projectId}/widgets/${splitPath[0]}`);
  };

  // Return
  return (
    <>
      <StyledWidgetData
        className="widget-add-btn"
        onClick={clickHandler}
        col={4}
        height="40px"
        backgroundColor="#d4d4d4"
      >
        <div>+</div>
      </StyledWidgetData>
    </>
  );
};
