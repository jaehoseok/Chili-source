import { useEffect, useState } from 'react';

import { MiddleBucket } from './style';
import Sheet from '../../atoms/Sheet';
import Button from '../../atoms/Button';

const index = (props: any) => {
  const issue = {
    project: props.info.project,
    type: props.info.type,
    summary: props.info.summary,
    reporter: props.info.reporter,
    assignee: props.info.assignee,
    rank: props.info.rank,
    epicLink: props.info.epicLink,
    sprint: props.info.sprint,
    storyPoints: props.info.storyPoints,
  };

  const bucket = [];
  useEffect(() => {
    bucket.push(issue);
  }, [issue]);
  return (
    <MiddleBucket>
      <Sheet isShadow={false}></Sheet>
      <Button
        borderColor={'red'}
        clickHandler={() => {
          console.log(props.info);
        }}
      >
        Bucket Test
      </Button>
    </MiddleBucket>
  );
};
export default index;
