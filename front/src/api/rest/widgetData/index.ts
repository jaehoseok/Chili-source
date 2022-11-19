// API & Library
import { createAxiosApi } from 'api/axios';

// Init
const widgetDataAxios = createAxiosApi();

export default {
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
                tempDate.getFullYear() + '-' + tempDate.getMonth() + '-' + tempDate.getDate();
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
};
