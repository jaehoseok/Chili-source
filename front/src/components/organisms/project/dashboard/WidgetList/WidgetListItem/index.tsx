// API & Library
import { useRef } from 'react';
import { useDrag } from 'react-dnd';

// Styles
import { StyledWidgetListItem } from './style';

// Components
import { Widget } from 'components/molecules/Widget';

interface propsType {
  id?: number;
  type?: string;
  path?: string;
}

export const WidgetListItem = ({ id, type, path }: propsType) => {
  const item = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: type ? type : 'ITEM',
    item: {
      id,
      type,
      path,
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(item);

  return (
    <StyledWidgetListItem className="widget-list-item" ref={item} style={{ opacity }}>
      <Widget type={type}>{id}</Widget>
    </StyledWidgetListItem>
  );
};
