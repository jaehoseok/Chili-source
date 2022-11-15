import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { MiddleBucket, StyledBucketHeader, StyledBucketBody, StyledIssue } from './style';
import SelectBox from 'components/molecules/SelectBox';
import IssueBar from 'components/molecules/IssueBar';
import InputBox from 'components/molecules/InputBox';
import Circle from 'components/atoms/Circle';
import Sheet from 'components/atoms/Sheet';
import Button from 'components/atoms/Button';
import Option from 'components/atoms/Option';
import { issueType } from 'components/pages/IssuesPage';
import issueAxios from 'api/rest/issue';
import { ImBin } from 'react-icons/im';
import { RiSave3Fill } from 'react-icons/ri';
import { HiPlus } from 'react-icons/hi';
import { theme } from 'styles/theme';
const index = (props: any) => {
  const { projectId } = useParams();
  const pjtId = Number(projectId);
  const [issueId, setIssueId] = useState(0);
  const issue = {
    issueTemplateId: props.issue.issueTemplateId,
    issueId: issueId,
    projectId: props.issue.projectId,
    issueType: props.issue.issueType,
    summary: props.issue.summary,
    description: props.issue.description,
    reporter: props.issue.reporter,
    assignee: props.issue.assignee,
    priority: props.issue.priority,
    epicLink: props.issue.epicLink,
    sprint: props.issue.sprint,
    storyPoints: props.issue.storyPoints,
  };

  const [bucket, setBucket] = useState<issueType[]>([]);
  const sprintRef = useRef<HTMLSelectElement>(null);
  const MiddleBucketRef = useRef<HTMLSelectElement>(null);
  const getSprintList = issueAxios.getSprintList(pjtId);
  const getMiddleBucketList = issueAxios.getMiddleBucketList(pjtId);
  const [sprintList, setSprintList] = useState<string[]>();
  const sList: string[] = [];
  const pushSprintList = async () => {
    for (let i = 0; i < (await getSprintList).values.length; i++) {
      sList.push((await getSprintList).values[i].name);
    }
    setSprintList(sList);
  };
  const [middleBucketList, setMiddleBucketList] = useState<string[]>();
  const mList: string[] = [];
  const pushMiddleBucketList = async () => {
    for (let i = 0; i < (await getMiddleBucketList).length; i++) {
      mList.push((await getMiddleBucketList)[i].name);
    }
    setMiddleBucketList(mList);
  };
  useEffect(() => {
    pushSprintList();
    pushMiddleBucketList();
  }, []);
  useEffect(() => {
    if (props.isInsert) {
      bucket.push(issue);
      setBucket(bucket);
      setIssueId(issueId + 1);
      props.setIsInsert(false);
    }
  }, [props.isInsert]);

  const deleteHandler = (issueId: number) => {
    setBucket(bucket.filter(issue => issue.issueId !== issueId));
  };

  const addMiddleBucketHandler = () => {
    issueAxios.postCreateMiddleBucket(middleBucketName, pjtId);
  };
  const editMiddleBucketHandler = () => {
    alert('미들버킷 저장');
  };
  const deleteMiddleBucketHandler = () => {
    alert('미들버킷 삭제');
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [middleBucketName, setMiddleBucketName] = useState<string>('');
  const showModalHandler = () => {
    setModalOpen(true);
  };
  const closeModalHandler = () => {
    setModalOpen(false);
  };
  const inputBoxRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!modalOpen && middleBucketName) {
      console.log(middleBucketName);
      addMiddleBucketHandler();
      setMiddleBucketName('');
    }
  }, [modalOpen]);
  const BarList = bucket.map(issue => (
    <StyledIssue>
      <Circle
        height={'20px'}
        backgroundColor={'red'}
        margin={'10px'}
        fontColor={'white'}
        fontWeight={'bold'}
        isClickable
        clickHandler={() => deleteHandler(issue.issueId)}
      >
        -
      </Circle>
      <IssueBar
        issueTemplateId={issue.issueTemplateId}
        issueId={issue.issueId}
        projectId={issue.projectId}
        issueType={issue.issueType}
        summary={issue.summary}
        description={issue.description}
        epicLink={issue.epicLink}
        reporter={issue.reporter}
        assignee={issue.assignee}
        priority={issue.priority}
        sprint={issue.sprint}
        storyPoints={issue.storyPoints}
      />
    </StyledIssue>
  ));
  return (
    <MiddleBucket>
      <StyledBucketHeader>
        <div style={{ display: 'flex', alignItems: 'end' }}>
          <SelectBox labelName={'MiddleBucket'} ref={MiddleBucketRef} selectWidth={'160px'}>
            <Option
              messages={middleBucketList ? middleBucketList : ['']}
              selected={props.issue.sprint}
            ></Option>
          </SelectBox>
          <Button
            borderColor={theme.issue.task}
            width={'40px'}
            height={'40px'}
            margin={'5px'}
            clickHandler={showModalHandler}
            isHover
          >
            <HiPlus size={'1.2rem'} />
          </Button>
          <Modal isOpen={modalOpen}>
            <Button borderColor={theme.issue.bug} clickHandler={closeModalHandler} isHover>
              Close
            </Button>
            <InputBox
              ref={inputBoxRef}
              labelName={'Bucket Name'}
              isRow={true}
              inputPlaceHolder={'이름을 입력하세요'}
            />
            <Button
              borderColor={theme.issue.task}
              clickHandler={() => {
                setMiddleBucketName(inputBoxRef.current ? inputBoxRef.current.value : '');
                closeModalHandler();
              }}
              isHover
            >
              Add Bucket
            </Button>
          </Modal>
          <Button
            borderColor={theme.issue.story}
            width={'40px'}
            height={'40px'}
            margin={'5px'}
            clickHandler={editMiddleBucketHandler}
            isHover
          >
            <RiSave3Fill size={'1.2rem'} />
          </Button>
          <Button
            borderColor={theme.issue.bug}
            width={'40px'}
            height={'40px'}
            margin={'5px'}
            clickHandler={deleteMiddleBucketHandler}
            isHover
          >
            <ImBin size={'1rem'} />
          </Button>
        </div>
        <SelectBox labelName={'Sprint'} ref={sprintRef} selectWidth={'160px'}>
          <Option messages={sprintList ? sprintList : ['']} selected={props.issue.sprint}></Option>
        </SelectBox>
        <Button
          borderColor={'#1973ee'}
          isHover
          margin={'5px'}
          clickHandler={() => {
            alert('미들버킷 이슈 지라로 전송');
            console.log(props.issue);
            console.log(bucket);
          }}
        >
          Send To Jira
        </Button>
      </StyledBucketHeader>
      <Sheet isShadow={false} flex={'column'} height={'90%'} isOverflowYScroll={true}>
        <StyledBucketBody>{BarList}</StyledBucketBody>
      </Sheet>
    </MiddleBucket>
  );
};
export default index;
