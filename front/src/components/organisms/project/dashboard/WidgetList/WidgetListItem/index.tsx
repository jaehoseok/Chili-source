// API & Library
import { useRef } from 'react';
import { useDrag } from 'react-dnd';

// Styles
import { StyledWidgetListItem } from './style';

// Components
import { Widget } from 'components/molecules/Widget';

interface propsType {
  id?: number;
  path?: string;
}

export const WidgetListItem = ({ id, path }: propsType) => {
  const item = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'ITEM',
    item: {
      id,
      type: 'ITEM',
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
      <Widget type="TEST">{id}</Widget>
    </StyledWidgetListItem>
  );
};
