import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { widget } from 'api/rest';

/**
 * @description
 * 커스텀 훅
 *
 * @author inte
 */
export const useGetWidgetListHandler = (projectId: number) => {
  return useQuery(['widget-list'], () => widget.getWidgetList(projectId), {
    staleTime: Infinity,
  });
};

export const useSetWidgetListHandler = () => {
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
        console.log('onSuccess');
        queryClient.invalidateQueries(['widget-list']); // queryKey 유효성 제거
      },
    },
  );
};

export const useGetLayoutHandler = (projectId: number) => {
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

export const usePostTestHandler = () => {
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
        console.log('[onSuccess]');
        queryClient.invalidateQueries(['test']); // queryKey 유효성 제거
      },
    },
  );
};
