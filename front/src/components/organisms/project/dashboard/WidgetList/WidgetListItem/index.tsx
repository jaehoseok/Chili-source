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
  url?: string | null;
}

export const WidgetListItem = ({ id, type, path, url }: propsType) => {
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
      <Widget id={id} type={type} url={url} path={path}></Widget>
    </StyledWidgetListItem>
  );
};
