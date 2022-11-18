// API & Library
import { createAxiosApi } from 'api/axios';

// Init
const widgetDataAxios = createAxiosApi();

export default {
  getWidgetCalendarData: (projectId: number) => {
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

    return new Promise<responseType[]>((resolve, reject) => {
      widgetDataAxios
        .get(`/project-service/gantt?op=1&projectId=${projectId}`)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
};
