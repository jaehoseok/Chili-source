import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { widget } from 'api/rest';

/**
 * @description
 * 위젯의 레이아웃을 서버 단에서 가져와 생성하고 클라이언트 단에 저장하는 커스텀 훅
 *
 * @author inte
 */
export const useGetLayout = (projectId: number) => {
  interface itemType {
    id: number;
    type?: string;
    path?: string;
    children: itemType[];
  }

  return useQuery(
    ['layout'],
    async () => {
      const updatedLayout: itemType[] = [{ id: 0, children: [] }];

      const response = await widget.getWidgetList(projectId);

      response.map(({ id, widgetCode, widgetRow, widgetCol }) => {
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

      return updatedLayout;
    },
    {
      staleTime: Infinity,
    },
  );
};

export const usePostLayout = () => {
  //  Init
  interface requestType {
    projectId: number;
    widgetCodeId: string;
    widgetCol: number;
    widgetRow: number;
  }

  const queryClient = useQueryClient();

  return useMutation(
    ({ projectId, widgetCodeId, widgetCol, widgetRow }: requestType) =>
      widget.addWidget(projectId, widgetCodeId, widgetCol, widgetRow),
    {
      onSuccess: () => {
        // 요청이 성공한 경우
        console.log('[post layout success]');
        queryClient.invalidateQueries(['layout']); // queryKey 유효성 제거
      },
    },
  );
};

/**
 * @description
 * 위젯들의 위치 변경이 있을 경우, 재조정을 하는 함수
 *
 * @returns
 */
export const useSetLayout = () => {
  //  Init
  interface requestType {
    projectId: number;
    widgetCodeId: string;
    widgetCol: number;
    widgetRow: number;
  }

  const queryClient = useQueryClient();

  return useMutation(
    ({ projectId, widgetCodeId, widgetCol, widgetRow }: requestType) =>
      widget.addWidget(projectId, widgetCodeId, widgetCol, widgetRow),
    {
      onSuccess: () => {
        // 요청이 성공한 경우
        console.log('[post layout success]');
        queryClient.invalidateQueries(['layout']); // queryKey 유효성 제거
      },
    },
  );
};
