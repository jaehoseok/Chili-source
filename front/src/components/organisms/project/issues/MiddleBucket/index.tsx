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
  const [issueId, setIssueId] = useState(0);
  interface sprintType {
    goal: string;
    id: number;
    name: string;
    originBoardId: number;
    state: string;
  }
  interface middleBucketType {
    middleBucketId: number;
    name: string;
  }
  // interface issueType {
  //   assignee: string;
  //   description: string;
  //   epicLink: string;
  //   issueType: string;
  //   priority: string;
  //   sprint: number;
  //   storyPoints: number;
  //   summary: string;
  // }
  const { projectId } = useParams();
  const pjtId = Number(projectId);
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
  const middleBucketRef = useRef<HTMLSelectElement>(null);
  const getSprintList = issueAxios.getSprintList(pjtId);
  const getMiddleBucketList = issueAxios.getMiddleBucketList(pjtId);
  const [sprint, setSprint] = useState<string>('');
  const [sprintList, setSprintList] = useState<sprintType[]>();
  const [sprintId, setSprintId] = useState<number>();
  const [sprintNameList, setSprintNameList] = useState<string[]>([]);
  const sList: sprintType[] = [];
  const sListName: string[] = [];
  const pushSprintList = async () => {
    sList.splice(0, sList.length);
    sListName.splice(0, sList.length);
    for (let i = 0; i < (await getSprintList).values.length; i++) {
      sList.push((await getSprintList).values[i]);
      sListName.push((await getSprintList).values[i].name);
    }
    console.log(sListName);
    setSprintList(sList);
    setSprintNameList(sListName);
    console.log(sprintList);
    console.log(sprintNameList);
  };
  const [middleBucket, setMiddleBucket] = useState<string>('');
  const [middleBucketList, setMiddleBucketList] = useState<middleBucketType[]>([]);
  const [middleBucketId, setMiddleBucketId] = useState<number>(-1);
  const [middleBucketNameList, setMiddleBucketNameList] = useState<string[]>([]);
  const mList: middleBucketType[] = [];
  const mListName: string[] = [];
  const pushMiddleBucketList = async () => {
    mList.splice(0, mList.length);
    mListName.splice(0, mList.length);
    for (let i = 0; i < (await getMiddleBucketList).length; i++) {
      mList.push((await getMiddleBucketList)[i]);
      mListName.push((await getMiddleBucketList)[i].name);
    }
    console.log(mList);
    setMiddleBucketList(mList);
    setMiddleBucketNameList(mListName);
  };
  useEffect(() => {
    pushSprintList();
    pushMiddleBucketList();
    // console.log(issueAxios.getIssueList(9));
    // setMiddleBucket(middleBucketRef.current ? middleBucketRef.current.value : '');
  }, []);
  useEffect(() => {
    if (props.isInsert) {
      bucket.push(issue);
      setBucket(bucket);
      setIssueId(issueId + 1);
      // issueAxios.postAddIssue(9, issue);
      props.setIsInsert(false);
    }
  }, [props.isInsert]);

  useEffect(() => {
    setMiddleBucketId(middleBucketList[middleBucketNameList.indexOf(middleBucket)].middleBucketId);
    // middleBucketList
    //   ? middleBucketList[middleBucketNameList.indexOf(middleBucket)].middleBucketId
    //   : -1,
    // console.log(middleBucketId ? issueAxios.getIssueList(middleBucketId) : '');
    pushIssueList(middleBucketId);
  }, [middleBucket]);
  useEffect(() => {
    setSprintId(sprintList ? sprintList[sprintNameList.indexOf(sprint)].id : -1);
  }, [sprint]);
  const deleteHandler = (issueId: number) => {
    setBucket(bucket.filter(issue => issue.issueId !== issueId));
  };

  const addMiddleBucketHandler = () => {
    issueAxios.postCreateMiddleBucket(middleBucketName, pjtId);
  };
  const editMiddleBucketHandler = () => {
    // issueAxios.putEditMiddleBucket();
    alert('');
  };
  const deleteMiddleBucketHandler = () => {
    alert('미들버킷 삭제');
  };
  const pushIssueList = (middleBucketId: number) => {
    console.log(issueAxios.getIssueList(middleBucketId));
  };
  const addIssueHandler = () => {
    alert('이슈 추가');
  };
  const deleteIssueHandler = () => {
    alert('이슈 삭제');
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
          <SelectBox
            labelName={'MiddleBucket'}
            ref={middleBucketRef}
            selectWidth={'160px'}
            setState={setMiddleBucket}
          >
            <Option
              messages={middleBucketNameList ? middleBucketNameList : ['']}
              selected={middleBucketRef.current?.value}
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
        <SelectBox labelName={'Sprint'} ref={sprintRef} selectWidth={'160px'} setState={setSprint}>
          <Option
            messages={sprintNameList ? sprintNameList : ['']}
            selected={props.issue.sprint}
          ></Option>
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
