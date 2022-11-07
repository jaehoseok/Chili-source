// API & Library
import { useRef } from 'react';
import { useDrag } from 'react-dnd';

// Styles
import { StyledWidgetListColumn, StyledWidgetListItemContainer } from './style';

// Components
import { WidgetDropSpace } from '../WidgetDropSpace';
import { WidgetListItem } from '../WidgetListItem';
import { itemType } from '../';

interface propsType {
  id?: string;
  children?: itemType[];
  dropHandler?: any;
  path?: string;
}

export const WidgetListColumn = ({ id, path, dropHandler, children }: propsType) => {
  const col = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'COLUMN',
    item: {
      id,
      type: 'COLUMN',
      path,
      children,
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(col);

  return (
    <StyledWidgetListColumn ref={col} style={{ opacity }}>
      <div>컬럼{id}</div>
      {children
        ? children.map(({ id }, index) => {
            return (
              <StyledWidgetListItemContainer key={index}>
                <WidgetDropSpace
                  onDrop={dropHandler}
                  type="ITEM"
                  path={`${path}-${index}`}
                  isHorizontal={true}
                />
                <WidgetListItem id={id} path={`${path}-${index}`} />
                <WidgetDropSpace
                  onDrop={dropHandler}
                  type="ITEM"
                  path={`${path}-${index + 1}`}
                  isHorizontal={true}
                />
              </StyledWidgetListItemContainer>
            );
          })
        : ''}
    </StyledWidgetListColumn>
  );
};
