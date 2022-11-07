// API & Library
import { useEffect, useState } from 'react';
import { project } from 'api/rest';

// Components
import HeaderInitNav from 'components/organisms/common/HeaderInitNav';
import ProjectSelectPage from 'components/organisms/projects/Main';

const index = () => {
  const [projectList, setProjectList] =
    useState<Awaited<ReturnType<typeof project.getProjectList>>>();

  useEffect(() => {
    (async () => {
      const ans = await project.getProjectList();
      setProjectList(ans);
    })();
  }, []);

  return (
    <>
      <HeaderInitNav />
      <ProjectSelectPage />
      {/* {projectList
        ? projectList.map((item, index) => (
            <div key={index}>
              <div>[id]: {item.id}</div>
              <div>[name]: {item.name}</div>
              <div>[description]: {item.description}</div>
              <div>[image]: {item.image}</div>
              <div>[latestGanttVersion]: {item.latestGanttVersion}</div>
              <div>[jiraProject]: {item.jiraProject}</div>
              <div>[gitRepo]: {item.gitRepo}</div>
              <div>==========</div>
            </div>
          ))
        : ''} */}
    </>
  );
};

export default index;
