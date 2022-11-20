// API & Library
import { createAxiosApi } from 'api/axios';
import { templateType } from 'components/pages/IssuesPage';

// Init
const issueAxios = createAxiosApi('issue-service');

/**
 * @description
 * http://k7b2071.p.ssafy.io/issue-service/ 이하의 url의 요청을 보낼 프라미스 객체를 리턴하는 함수들
 *
 * @example
 * ```
 * // rest 라이브러리 임포트
 * import { issue } from 'api/rest'
 *
 * // IFFE 방식 또는 프라미스 객체를 활용하는 어떤 방법이던 상관없음
 * ( async () => {const tokenCodes = await issue.getTokenCodes} )();
 * ```
 *
 * @author inte
 */
export default {
  /**
   * @description issue 서버의 token code 들을 받아옴
   *
   * @author inte
   */
  getTokenCodes: () => {
    return new Promise((resolve, reject) => {
      issueAxios
        .get(`/token-codes`)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  /**
   * @description
   * 가지고 있는 지라 토큰을 통해
   * 지라의 모든 프로젝트를 알려주는 API
   *
   * @author bell
   */
  getJiraProjectList: async () => {
    try {
      const response = await issueAxios.get('/jira/project-list');
      console.log(response);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
  /**
   * @description
   * 이슈 템플릿 조회 API
   * 자신이 작성한 이슈 템플릿 리스트를 조회한다.
   *
   * @author dbcs
   */
  getIssueTemplateList: async (projectId: number) => {
    return new Promise<templateType[]>((resolve, reject) => {
      issueAxios
        .get('/', {
          params: {
            projectId: projectId,
            me: true,
          },
        })
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
   * 이슈 템플릿 생성 API
   * 현 프로젝트 내에 자신의 이슈 템플릿을 생성한다.
   *
   * @author dbcs
   */
  postCreateIssueTemplate: async (
    projectId: number,
    issueType: string,
    summary: string,
    description: string,
    assignee: string,
    priority: string,
    epicLink: string,
    sprint: number,
    storyPoints: number,
  ) => {
    try {
      const data = {
        projectId,
        issueType,
        summary,
        description,
        assignee,
        priority,
        epicLink,
        sprint,
        storyPoints,
      };
      const response = await issueAxios.post('/', data);
      console.log(response);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
  putEditIssueTemplate: async (
    projectId: number,
    issueType: string,
    summary: string,
    description: string,
    priority: string,
    epicLink: string,
    storyPoints: number,
    issueTemplateId: number,
  ) => {
    try {
      const data = {
        projectId,
        issueType,
        summary,
        description,
        priority,
        epicLink,
        storyPoints,
      };
      const response = await issueAxios.put(`/${issueTemplateId}`, data);
      console.log(response);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
  deleteIssueTemplate: async (issueTemplateId: number) => {
    try {
      const response = await issueAxios.delete(`/${issueTemplateId}`);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
  getEpicList: async () => {
    interface responseType {
      issues: any;
    }
    return new Promise<responseType>((resolve, reject) => {
      issueAxios
        .get(`/jira/epic-list`)
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
   * 지라 이슈 가운데 아직 done 하지 않은 이슈 모두 가져오기
   *
   * @author bell
   */
  getIssuesNotDone: async (projectId: number) => {
    interface responseType {
      fields: {
        assignee: {
          accountId: string;
          displayName: string;
          emailAddress: string;
        };
        customfield_10020: [
          {
            goal: string;
            id: number;
            name: string;
            state: string;
          },
        ];
        customfield_10031: number;
        issuetype: {
          id: string;
          name: string;
        };
        parent: {
          fields: {
            summary: string;
          };
          id: string;
          key: string;
        };
        priority: {
          id: string;
          name: string;
        };
        project: {
          id: string;
          key: string;
          name: string;
        };
        reporter: {
          accountId: string;
          displayName: string;
          emailAddress: string;
        };
        status: {
          id: string;
          name: string;
        };
        summary: {
          summary: string;
        };
      };
      id: string;
      key: string;
    }

    return new Promise<responseType[]>((resolve, reject) => {
      issueAxios
        .get(`/jira/issues/todo/${projectId}`)
        .then(response => {
          resolve(response.data.issues);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getSprintList: async (projectId: number) => {
    interface responseType {
      values: any;
    }
    return new Promise<responseType>((resolve, reject) => {
      issueAxios
        .get(`/jira/sprint/${projectId}`)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getMiddleBucketList: async (projectId: number) => {
    interface responseType {
      middleBucketId: number;
      name: string;
    }
    return new Promise<responseType[]>((resolve, reject) => {
      issueAxios
        .get('/middle-buckets', {
          params: {
            me: true,
            projectId: projectId,
          },
        })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  postCreateMiddleBucket: async (name: string, projectId: number) => {
    interface responseType {
      data: any;
    }
    return new Promise<responseType[]>((resolve, reject) => {
      const data = {
        name: name,
        projectId: projectId,
      };
      issueAxios
        .post('/middle-buckets', data)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  putEditMiddleBucket: (middleBucketName: string, middleBucketId: number) => {
    interface responseType {
      name: string;
    }
    return new Promise<responseType[]>((resolve, reject) => {
      issueAxios
        .put(`/middle-buckets/${middleBucketId}`, {
          name: middleBucketName,
        })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  deleteMiddleBucket: async (middleBucketId: number) => {
    return new Promise((resolve, reject) => {
      issueAxios
        .delete(`/middle-buckets/${middleBucketId}`)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getIssueList: async (middleBucketId: number) => {
    interface responseType {
      issueList: issueType[];
      middleBucketId: number;
      middleBucketName: string;
    }
    interface issueType {
      assignee: string;
      description: string;
      epicLink: string;
      issueId: number;
      issueType: string;
      priority: string;
      sprint: number;
      storyPoints: number;
      summary: string;
    }
    return new Promise<responseType>((resolve, reject) => {
      issueAxios
        .get(`/middle-buckets/${middleBucketId}`)
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
   * issueKey를 통해 해당 Jira issue의 스토리 포인트와 summary를 업데이트 하는 API
   *
   * @author bell
   */
  updateIssueByIssueKey: async (
    issueKey: string,
    projectId: number,
    statusId: number,
    storyPoints: number,
    summary: string,
  ) => {
    try {
      await issueAxios.put(`/jira/issues/${issueKey}`, {
        projectId,
        statusId,
        storyPoints,
        summary,
      });
    } catch (e) {
      console.log(e);
    }
  },
  /**
   * @description
   * issueKey를 통해 해당 issue 데이터 가져오기
   *
   * @author bell
   */
  getIssueByIssueKey: async (issueKey: string) => {
    interface responseType {
      fields: {
        assignee: {
          accountId: string;
          displayName: string;
          emailAddress: string;
        };
        customfield_10020: [
          {
            goal: string;
            id: number;
            name: string;
            state: string;
          },
        ];
        customfield_10031: number;
        issuetype: {
          id: string;
          name: string;
        };
        parent: {
          fields: {
            summary: string;
          };
          id: string;
          key: string;
        };
        priority: {
          id: string;
          name: string;
        };
        project: {
          id: string;
          key: string;
          name: string;
        };
        reporter: {
          accountId: string;
          displayName: string;
          emailAddress: string;
        };
        status: {
          id: string;
          name: string;
        };
        summary: {
          summary: string;
        };
      };
      id: string;
      key: string;
    }

    return new Promise<responseType>((resolve, reject) => {
      issueAxios
        .get(`/jira/issues/${issueKey}`)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  postAddIssue: async (middleBucketId: number, request: any) => {
    interface responseType {
      data: any;
    }
    const data = {
      assignee: request.assignee,
      description: request.description,
      epicLink: request.epicLink,
      issueType: request.issueType,
      priority: request.priority,
      sprint: request.sprint,
      storyPoints: request.storyPoints,
      summary: request.summary,
    };
    return new Promise<responseType>((resolve, reject) => {
      issueAxios
        .post(`/middle-buckets/${middleBucketId}`, data)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  deleteIssue: async (middleBucketId: number, middleBucketIssueId: number) => {
    return new Promise((resolve, reject) => {
      issueAxios
        .delete(`/middle-buckets/${middleBucketId}/${middleBucketIssueId}`)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  postSendToJira: async (middleBucketId: number, projectId: number) => {
    const data = {
      middleBucketId: middleBucketId,
      projectId: projectId,
    };
    return new Promise((resolve, reject) => {
      issueAxios
        .post(`/jira/middle-bucket`, null, {
          params: {
            middleBucketId: middleBucketId,
            projectId: projectId,
          },
        })
        .then(response => {
          console.log(response.data);
          resolve(response.data);
        })
        .catch(error => {
          console.log('ㅈ됨');
          reject(error);
        });
    });
  },
};
