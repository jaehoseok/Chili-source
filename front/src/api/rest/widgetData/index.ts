// API & Library
import { createAxiosApi } from 'api/axios';

// Init
const widgetDataAxios = createAxiosApi();

export default {
  /**
   * @description
   * 서버에서 캘린더 이슈들 얻어와서 데이터화 함
   *
   * @param projectId
   * @author inte
   */
  getWidgetCalendarData: (projectId: number) => {
    // Init
    interface responseType {
      id: number;
      startTime: Date;
      endTime: Date;
      issueSummary: string;
      version: number;
      issueCode: string;
      progress: number;
      userId: number;
      parentId: number;
    }

    const startYear = new Date().getFullYear();
    const endYear = startYear + 1;
    const calenderDataCounter = new Map<string, number>();
    const calenderData: (
      | (number | Date)[]
      | {
          type: string;
          id: string;
        }[]
    )[] = [];

    // Return
    return new Promise<
      (
        | (number | Date)[]
        | {
            type: string;
            id: string;
          }[]
      )[]
    >((resolve, reject) => {
      widgetDataAxios
        .get(
          `/project-service/gantt?start=${startYear}-01-01T00%3A00%3A00&end=${endYear}-01-01T00%3A00%3A00&op=1&projectId=${projectId}`,
        )
        .then(response => {
          response.data.map((item: responseType) => {
            const tempDate = new Date(item.startTime);
            const endDate = new Date(item.endTime);

            while (tempDate <= endDate) {
              const tempKey =
                tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate();
              calenderDataCounter.set(tempKey, (calenderDataCounter.get(tempKey) || 0) + 1);
              tempDate.setDate(tempDate.getDate() + 1);
            }
          });

          calenderData.push([
            { type: 'date', id: 'Date' },
            { type: 'number', id: 'Won/Loss' },
          ]);

          calenderDataCounter.forEach((value, key) => {
            calenderData.push([new Date(key), value]);
          });
          resolve(calenderData);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  /**
   * @description
   * 서버에서 당일의 간트 이슈들 얻어와서 데이터화 함
   *
   * @param projectId
   * @author inte
   */
  getWidgetGanttData: (projectId: number) => {
    // Init
    interface responseType {
      endTime: Date;
      id: number;
      issueCode: string;
      issueSummary: string;
      progress: number;
      startTime: Date;
      userId: number;
      version: number;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const nextday = new Date(today);
    nextday.setDate(nextday.getDate() + 1);

    // Return
    return new Promise<responseType[]>((resolve, reject) => {
      widgetDataAxios
        .get(
          `/project-service/gantt?start=${today.toISOString()}&end=${nextday.toISOString()}&op=1&projectId=${projectId}`,
        )
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  /**
   * @description
   * 서버에서 지라 데이터 얻어와서 데이터화 함
   *
   * @param projectId
   * @author inte
   */
  getWidgetJiraData: (projectId: number) => {
    // Init

    // Return
    return new Promise<number>((resolve, reject) => {
      widgetDataAxios
        .get(`/issue-service/jira/sprint/${projectId}`)
        .then(async response => {
          // const sprintId = response.data.values[response.data.values.length - 1].id;
          const sprintId = response.data.values[0].id;

          const sprintResp = await widgetDataAxios.get(
            `/issue-service/jira/widget?projectId=${projectId}&sprintId=${sprintId}`,
          );

          const result: number =
            ((100 * (sprintResp.data.done | 0)) / (sprintResp.data.total | 1)) | 0;

          resolve(Math.floor(result));
        })
        .catch(error => {
          reject(error);
        });
    });
  },
};
