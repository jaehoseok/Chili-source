// API & Library
import { ReactNode, useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { widget } from 'api/rest';
import { useGetWidgetListHandler } from 'hooks/widget';

// Styles
import {
  StyledWidgetListContainer,
  StyledWidgetList,
  StyledWidgetListColumnContainer,
  styledType,
} from './style';

// Components
import { WidgetListColumn } from './WidgetListColumn';
import { WidgetDropSpace } from './WidgetDropSpace';
import { WidgetTrashCan } from './WidgetTrashCan';

// Types
interface propsType extends styledType {
  children?: ReactNode;
}

export interface itemType {
  id: number;
  type?: string;
  path?: string;
  children: itemType[];
}

export const WidgetList = ({}: propsType) => {
  // Init
  const location = useLocation();
  const getWidgetList = useGetWidgetListHandler(Number(location.pathname.split('/')[2]));

  const [layout, setLayout] = useState<itemType[]>([
    { id: 0, children: [] },
    {
      id: 0,
      children: [
        { id: 9, type: 'CALENLDAR', children: [] },
        { id: 10, type: 'GANTT', children: [] },
        { id: 11, type: 'JIRA', children: [] },
        { id: 12, type: 'SSAFYGITLAB', children: [] },
      ],
    },
    { id: 0, children: [] },
  ]);

  // Methods
  /**
   * 드롭 시, 레이아웃 순서를 바꾸는 콜백함수
   */
  const dropHandler = useCallback(
    (dropSpace: itemType, dropItem: itemType) => {
      let updatedLayout: itemType[] = [];

      // 변화 없음
      if (dropSpace.path == dropItem.path) {
        return;
      }

      // 드롭된 공간 주소
      const splitDropSpacePath = dropSpace.path ? dropSpace.path.split('-') : [''];

      // 드롭한 아이템의 원 주소
      const splitDropItemPath = dropItem.path ? dropItem.path.split('-') : [''];

      if (dropSpace.type === 'COLUMN') {
        // 컬럼 간 위치 이동
        if (dropItem.type === 'COLUMN') {
          // 집어넣을 아이템 복사
          const dropIndex = Number(splitDropSpacePath[0]);
          const columnIndex = Number(splitDropItemPath[0]);

          // 옮길 것이 내려둘 곳보다 앞인지 뒤인지
          if (dropIndex < columnIndex) {
            updatedLayout = [
              ...layout.slice(0, dropIndex),
              { ...dropItem },
              ...layout.slice(dropIndex, columnIndex),
              ...layout.slice(columnIndex + 1),
            ];
          } else {
            updatedLayout = [
              ...layout.slice(0, columnIndex),
              ...layout.slice(columnIndex + 1, dropIndex),
              { ...dropItem },
              ...layout.slice(dropIndex),
            ];
          }
        }

        // 아이템의 컬럼 이동
        else {
          // 새로만들기
          if (Number(splitDropSpacePath[0]) == layout.length) {
            const columnIndex = Number(splitDropItemPath[0]);
            const itemIndex = Number(splitDropItemPath[1]);
            const columnChild = [...(layout[columnIndex].children || [])];

            updatedLayout = [
              ...layout.slice(0, columnIndex),
              {
                ...layout[columnIndex],
                children: [...columnChild.slice(0, itemIndex), ...columnChild.slice(itemIndex + 1)],
              },
              ...layout.slice(columnIndex + 1),
              {
                id: 0,
                children: [dropItem],
              },
            ];
          }
          // 위치만 이동
          else {
            const dropIndex = Number(splitDropSpacePath[0]);
            const columnIndex = Number(splitDropItemPath[0]);
            const itemIndex = Number(splitDropItemPath[1]);
            const columnChild = [...(layout[columnIndex].children || [])];

            // 옮길 것이 내려둘 곳보다 앞인지 뒤인지
            if (dropIndex < columnIndex) {
              updatedLayout = [
                ...layout.slice(0, dropIndex),
                {
                  id: 0,
                  children: [dropItem],
                },
                ...layout.slice(dropIndex, columnIndex),
                {
                  ...layout[columnIndex],
                  children: [
                    ...columnChild.slice(0, itemIndex),
                    ...columnChild.slice(itemIndex + 1),
                  ],
                },
                ...layout.slice(columnIndex + 1),
              ];
            } else {
              updatedLayout = [
                ...layout.slice(0, columnIndex),
                {
                  ...layout[columnIndex],
                  children: [
                    ...columnChild.slice(0, itemIndex),
                    ...columnChild.slice(itemIndex + 1),
                  ],
                },
                ...layout.slice(columnIndex, dropIndex),
                {
                  id: 0,
                  children: [dropItem],
                },
                ...layout.slice(dropIndex + 1),
              ];
            }
          }
        }
      } else {
        // 컬럼 안에 다 집어넣고 삭제
        if (dropItem.type === 'COLUMN') {
          const dropIndex = Number(splitDropSpacePath[0]);
          const dropItemIndex = Number(splitDropSpacePath[1]);
          const columnIndex = Number(splitDropItemPath[0]);

          // 같은 곳에 또 두는 것은 의미 없음
          if (dropIndex == columnIndex) return;

          const dropChildren = [...(layout[dropIndex].children || [])];
          const columnChildren = [...(layout[columnIndex].children || [])];

          // 옮길 것이 내려둘 곳보다 앞인지 뒤인지
          if (dropIndex < columnIndex) {
            updatedLayout = [
              ...layout.slice(0, dropIndex),
              {
                ...layout[dropIndex],
                children: [
                  ...dropChildren.slice(0, dropItemIndex),
                  ...columnChildren,
                  ...dropChildren.slice(dropItemIndex),
                ],
              },
              ...layout.slice(dropIndex + 1, columnIndex),
              ...layout.slice(columnIndex + 1),
            ];
          } else {
            updatedLayout = [
              ...layout.slice(0, columnIndex),
              ...layout.slice(columnIndex + 1, dropIndex),
              {
                ...layout[dropIndex],
                children: [
                  ...dropChildren.slice(0, dropItemIndex),
                  ...columnChildren,
                  ...dropChildren.slice(dropItemIndex),
                ],
              },
              ...layout.slice(dropIndex + 1),
            ];
          }
        } else {
          // 같은 컬럼 안에서 순서만 바꾸기
          if (splitDropSpacePath[0] == splitDropItemPath[0]) {
            console.log('순서만 바꾸기');
            const dropIndex = Number(splitDropSpacePath[0]);
            const dropItemIndex = Number(splitDropSpacePath[1]);
            const itemIndex = Number(splitDropItemPath[1]);
            const columnChildren = [...(layout[dropIndex].children || [])];

            // 옮길 것이 내려둘 곳보다 앞인지 뒤인지
            if (dropItemIndex < itemIndex) {
              updatedLayout = [
                ...layout.slice(0, dropIndex),
                {
                  ...layout[dropIndex],
                  children: [
                    ...columnChildren.slice(0, dropItemIndex),
                    { ...dropItem },
                    ...columnChildren.slice(dropItemIndex, itemIndex),
                    ...columnChildren.slice(itemIndex + 1),
                  ],
                },
                ...layout.slice(dropIndex + 1),
              ];
            } else {
              updatedLayout = [
                ...layout.slice(0, dropIndex),
                {
                  ...layout[dropIndex],
                  children: [
                    ...columnChildren.slice(0, itemIndex),
                    ...columnChildren.slice(itemIndex + 1, dropItemIndex),
                    { ...dropItem },
                    ...columnChildren.slice(dropItemIndex),
                  ],
                },
                ...layout.slice(dropIndex + 1),
              ];
            }
          }
          // 다른 컬럼으로 바꿔주고 삭제하기
          else {
            console.log('컬럼 이동');
            const dropColumnIndex = Number(splitDropSpacePath[0]);
            const dropItemIndex = Number(splitDropSpacePath[1]);
            const dropColumnChildren = [...(layout[dropColumnIndex].children || [])];

            const columnIndex = Number(splitDropItemPath[0]);
            const itemIndex = Number(splitDropItemPath[1]);
            const columnChildren = [...(layout[columnIndex].children || [])];

            // 옮길 것이 내려둘 곳보다 앞인지 뒤인지
            if (dropColumnIndex < columnIndex) {
              updatedLayout = [
                ...layout.slice(0, dropColumnIndex),
                {
                  ...layout[dropColumnIndex],
                  children: [
                    ...dropColumnChildren.slice(0, dropItemIndex),
                    { ...dropItem },
                    ...dropColumnChildren.slice(dropItemIndex),
                  ],
                },
                ...layout.slice(dropColumnIndex + 1, columnIndex),
                {
                  ...layout[columnIndex],
                  children: [
                    ...columnChildren.slice(0, itemIndex),
                    ...columnChildren.slice(itemIndex + 1),
                  ],
                },
                ...layout.slice(columnIndex + 1),
              ];
            } else {
              updatedLayout = [
                ...layout.slice(0, columnIndex),
                {
                  ...layout[columnIndex],
                  children: [
                    ...columnChildren.slice(0, itemIndex),
                    ...columnChildren.slice(itemIndex + 1),
                  ],
                },
                ...layout.slice(columnIndex + 1, dropColumnIndex),
                {
                  ...layout[dropColumnIndex],
                  children: [
                    ...dropColumnChildren.slice(0, dropItemIndex),
                    { ...dropItem },
                    ...dropColumnChildren.slice(dropItemIndex),
                  ],
                },
                ...layout.slice(dropColumnIndex + 1),
              ];
            }
          }
        }
      }

      // updatedLayout = [{ id: '1' }, { id: '2' }, { id: '3' }];
      setLayout(updatedLayout);
    },
    [layout],
  );

  /**
   * 드롭 시, 레이아웃에서 컴포넌트를 제거하는 콜백함수
   */
  const throwHandler = useCallback(
    async (item: itemType) => {
      let updatedLayout: itemType[] = [];

      // 컬럼 삭제
      if (item.type == 'COLUMN') {
        const splitItemPath = item.path ? item.path.split('-') : [''];

        const index = Number(splitItemPath[0]);
        updatedLayout = [...layout.slice(0, index), ...layout.slice(index + 1)];
      }

      // 아이템 삭제
      else {
        // console.log('[delete widget]', await widget.deleteWidget(item.id));
        const splitItemPath = item.path ? item.path.split('-') : [''];
        const columnIndex = Number(splitItemPath[0]);
        const itemIndex = Number(splitItemPath[1]);
        const columnChild = [...(layout[columnIndex].children || [])];

        updatedLayout = [
          ...layout.slice(0, columnIndex),
          {
            ...layout[columnIndex],
            children: [...columnChild.slice(0, itemIndex), ...columnChild.slice(itemIndex + 1)],
          },
          ...layout.slice(columnIndex + 1),
        ];
      }

      setLayout(updatedLayout);
    },
    [layout],
  );

  // LifeCycle
  useEffect(() => {
    const updatedLayout: itemType[] = [];
    getWidgetList.data?.map(({ id, widgetCode, widgetRow, widgetCol }) => {
      console.log(getWidgetList.data);
      while (updatedLayout.length <= widgetCol) {
        updatedLayout.push({ id: 0, children: [] });
      }
      while ((updatedLayout[widgetCol].children.length || 0) <= widgetRow) {
        updatedLayout[widgetCol].children.push({ id: 0, children: [] });
      }
      if (updatedLayout[widgetCol].children) {
        updatedLayout[widgetCol].children[widgetRow] = { id, type: widgetCode, children: [] };
      }
    });

    // setLayout(updatedLayout);
  }, [getWidgetList.data]);

  return (
    <DndProvider backend={HTML5Backend}>
      <StyledWidgetListContainer className="widget-list-container">
        <WidgetTrashCan onThrow={throwHandler} />
        <StyledWidgetList className="widget-list">
          {layout.map(({ id, children }, index) => {
            return (
              <StyledWidgetListColumnContainer key={index}>
                <WidgetDropSpace onDrop={dropHandler} type="COLUMN" path={`${index}`} />
                <WidgetListColumn
                  id={id}
                  type="COLUMN"
                  dropHandler={dropHandler}
                  path={`${index}`}
                  children={children}
                />
                <WidgetDropSpace onDrop={dropHandler} type="COLUMN" path={`${index + 1}`} />
              </StyledWidgetListColumnContainer>
            );
          })}
        </StyledWidgetList>
      </StyledWidgetListContainer>
    </DndProvider>
  );
};
