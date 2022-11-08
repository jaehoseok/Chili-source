// API & Library
import { ReactNode, useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
// Styles
import { StyledWidgetList, StyledWidgetListColumnContainer, styledType } from './style';

// Components
import { WidgetListColumn } from './WidgetListColumn';
import { WidgetDropSpace } from './WidgetDropSpace';
import { WidgetTrashCan } from './WidgetTrashCan';

// Types
interface propsType extends styledType {
  children?: ReactNode;
}

export interface itemType {
  id?: string;
  type?: string;
  path?: string;
  children?: itemType[];
}

export const WidgetList = ({}: propsType) => {
  const [layout, setLayout] = useState<itemType[]>([
    { id: '1', children: [{ id: '6' }, { id: '7' }] },
    { id: '2', children: [{ id: '8' }] },
    { id: '3', children: [{ id: '9' }, { id: '10' }, { id: '11' }] },
    { id: '4', children: [{ id: '12' }, { id: '13' }] },
    { id: '5', children: [{ id: '14' }, { id: '15' }, { id: '16' }] },
  ]);

  // 드롭 시, 레이아웃 순서를 바꾸는 콜백함수
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
        if (dropItem.type === 'ITEM') {
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
                children: [{ path: `${layout.length}-0`, children: [dropItem] }],
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
                  children: [{ children: [dropItem] }],
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
                  children: [{ children: [dropItem] }],
                },
                ...layout.slice(dropIndex + 1),
              ];
            }
          }
        }
      }

      if (dropSpace.type === 'ITEM') {
        // 컬럼 안에 다 집어넣기
        if (dropItem.type === 'COLUMN') {
          const dropIndex = Number(splitDropSpacePath[0]);
          const dropItemIndex = Number(splitDropSpacePath[1]);
          const columnIndex = Number(splitDropItemPath[0]);
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
              {
                ...layout[columnIndex],
                children: [],
              },
              ...layout.slice(columnIndex + 1),
            ];
          } else {
            updatedLayout = [
              ...layout.slice(0, columnIndex),
              {
                ...layout[columnIndex],
                children: [],
              },
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
        }
        if (dropItem.type === 'ITEM') {
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

  // 드롭 시, 레이아웃에서 컴포넌트를 제거하는 콜백함수
  const throwHandler = useCallback(
    (item: itemType) => {
      let updatedLayout: itemType[] = [];

      console.log('[throw]');

      // 컬럼 삭제
      if (item.type == 'COLUMN') {
        const splitItemPath = item.path ? item.path.split('-') : [''];
        console.log('[item.path]', splitItemPath);

        const index = Number(splitItemPath[0]);
        updatedLayout = [...layout.slice(0, index), ...layout.slice(index + 1)];
      }

      // 아이템 삭제
      if (item.type == 'ITEM') {
        const splitItemPath = item.path ? item.path.split('-') : [''];
        console.log('[item.path]', splitItemPath);
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

  return (
    <DndProvider backend={HTML5Backend}>
      <StyledWidgetList>
        <WidgetTrashCan onThrow={throwHandler} />
        {layout.map(({ id, children }, index) => {
          return (
            <StyledWidgetListColumnContainer key={index}>
              <WidgetDropSpace onDrop={dropHandler} type="COLUMN" path={`${index}`} />
              <WidgetListColumn
                id={id}
                dropHandler={dropHandler}
                path={`${index}`}
                children={children}
              />
              <WidgetDropSpace onDrop={dropHandler} type="COLUMN" path={`${index + 1}`} />
            </StyledWidgetListColumnContainer>
          );
        })}
        {/* <WidgetDropSpace isHorizontal={true} type="LAST" /> */}
      </StyledWidgetList>
    </DndProvider>
  );
};
