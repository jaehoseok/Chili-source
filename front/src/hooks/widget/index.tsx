//  API & Library
import { useParams } from 'react-router-dom';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { widget } from 'api/rest';

/**
 * @description
 * 위젯의 레이아웃을 서버 단에서 가져와 생성하고 클라이언트 단에 저장하는 커스텀 훅
 *
 * @author inte
 */
export const useGetLayout = () => {
  interface itemType {
    id: number;
    type?: string;
    path?: string;
    children: itemType[];
  }

  const { projectId } = useParams();

  return useQuery(
    ['layout', projectId],
    async () => {
      const updatedLayout: itemType[] = [{ id: 0, children: [] }];

      const response = await widget.getWidgetList(Number(projectId));

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

/**
 * @description
 * 위젯 추가가 있었을 경우, 재조정을 하는 함수
 *
 * @returns
 */
export const useAddLayout = () => {
  //  Init
  interface requestType {
    projectId: number;
    widgetCodeId: string;
    widgetCol: number;
    widgetRow: number;
  }

  const queryClient = useQueryClient();

  return useMutation(
    async ({ projectId, widgetCodeId, widgetCol, widgetRow }: requestType) =>
      await widget.addWidget(projectId, widgetCodeId, widgetCol, widgetRow),
    {
      onSuccess: () => {
        // 요청이 성공한 경우
        console.log('[add layout success]');
        queryClient.invalidateQueries(['layout']); // queryKey 유효성 제거
      },
    },
  );
};

/**
 * @description
 * 위젯 삭제가 있었을 경우, 재조정을 하는 함수
 *
 * @returns
 */
export const useDeleteLayout = () => {
  //  Init
  interface itemType {
    id: number;
    type?: string;
    path?: string;
    children: itemType[];
  }

  interface paramsType {
    deletedItems: itemType[];
    updatedLayout: itemType[];
  }

  interface requestType {
    id: number;
    widgetCol: number;
    widgetRow: number;
  }

  const queryClient = useQueryClient();

  return useMutation(
    async ({ deletedItems, updatedLayout }: paramsType) => {
      const updatedWidgetList: requestType[] = [];
      updatedLayout.map((item, index) => {
        const widgetCol = index;
        item.children.map(({ id }, index) => {
          if (id == 0) return;
          const widgetRow = index;
          updatedWidgetList.push({
            id,
            widgetCol,
            widgetRow,
          });
        });
      });
      console.log('[삭제할 위젯]', deletedItems);
      console.log('[변경된 레이아웃]', updatedWidgetList);
      await deletedItems.map(async ({ id }) => {
        await widget.deleteWidget(id);
      });

      await widget.setWidgetList(updatedWidgetList);
    },
    {
      onSuccess: () => {
        // 요청이 성공한 경우
        console.log('[delete layout success]');
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
  interface itemType {
    id: number;
    type?: string;
    path?: string;
    children: itemType[];
  }

  interface requestType {
    id: number;
    widgetCol: number;
    widgetRow: number;
  }

  const queryClient = useQueryClient();

  return useMutation(
    async (updatedLayout: itemType[]) => {
      const updatedWidgetList: requestType[] = [];

      updatedLayout.map((item, index) => {
        const widgetCol = index;
        item.children.map(({ id }, index) => {
          if (id == 0) return;
          const widgetRow = index;

          updatedWidgetList.push({
            id,
            widgetCol,
            widgetRow,
          });
        });
      });

      console.log('[변경할 데이터]', updatedWidgetList);
      await widget.setWidgetList(updatedWidgetList);
    },
    {
      onSuccess: () => {
        // 요청이 성공한 경우
        console.log('[set layout success]');
        queryClient.invalidateQueries(['layout']); // queryKey 강제로 만기 시키기 -> 당장 다시 값 얻어와
        console.log('[layout invalid]');
      },
    },
  );
};

export const useGetGitlabRepositories = (tokenCodeId: string) => {
  return useQuery(['get-repositories'], () => widget.getGitlabRepositories(tokenCodeId), {
    enabled: false,
  });
};
