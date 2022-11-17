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
  interface requestType {
    assignee: string;
    description: string;
    epicLink: string;
    issueType: string;
    priority: string;
    sprint: number;
    storyPoints: number;
    summary: string;
  }
  const { projectId } = useParams();
  const pjtId = Number(projectId);
  interface bucketType extends requestType {
    issueId: number;
  }
  const issue = {
    issueId: issueId,
    issueType: props.issue.issueType,
    summary: props.issue.summary,
    description: props.issue.description,
    assignee: props.issue.assignee,
    priority: props.issue.priority,
    epicLink: props.issue.epicLink,
    sprint: props.issue.sprint,
    storyPoints: props.issue.storyPoints,
  };

  // const [bucket, setBucket] = useState<bucketType[]>([]);
  const sprintRef = useRef<HTMLSelectElement>(null);
  const middleBucketRef = useRef<HTMLSelectElement>(null);
  const getSprintList = issueAxios.getSprintList(pjtId);
  const getMiddleBucketList = issueAxios.getMiddleBucketList(pjtId);

  const [sprintId, setSprintId] = useState<number>(-1);
  const [sprintName, setSprintName] = useState<string>('');
  const [sprintNameList, setSprintNameList] = useState<string[]>([]);
  const [sprintList, setSprintList] = useState<sprintType[]>([]);
  const pushSprintList = async () => {
    const sList: sprintType[] = [];
    const sListName: string[] = [];
    for (let i = 0; i < (await getSprintList).values.length; i++) {
      sList.push((await getSprintList).values[i]);
      sListName.push((await getSprintList).values[i].name);
    }
    console.log(sListName);
    setSprintList(sList);
    setSprintNameList(sListName);
  };
  const [middleBucketId, setMiddleBucketId] = useState<number>(-1);
  const [middleBucketName, setMiddleBucketName] = useState<string>('');
  const [middleBucketNameList, setMiddleBucketNameList] = useState<string[]>([]);
  const [middleBucketList, setMiddleBucketList] = useState<middleBucketType[]>([]);
  const pushMiddleBucketList = async () => {
    const mList: middleBucketType[] = [];
    const mListName: string[] = [];
    for (let i = 0; i < (await getMiddleBucketList).length; i++) {
      mList.push((await getMiddleBucketList)[i]);
      mListName.push((await getMiddleBucketList)[i].name);
    }
    setMiddleBucketList(mList);
    setMiddleBucketNameList(mListName);
  };
  useEffect(() => {
    pushSprintList();
    pushMiddleBucketList();
  }, []);

  const iList: requestType[] = [];
  const [issueList, setIssueList] = useState<requestType[]>([]);
  const [bucketList, setBucketList] = useState<bucketType[]>([]);
  useEffect(() => {
    if (props.isInsert) {
      const bList: bucketType[] = [];
      issue.sprint = sprintId;
      const request: requestType = {
        assignee: issue.assignee,
        description: issue.description,
        epicLink: issue.epicLink,
        issueType: issue.issueType,
        priority: issue.priority,
        sprint: issue.sprint,
        storyPoints: issue.storyPoints,
        summary: issue.summary,
      };

      setIssueId(issueId + 1);
      console.log(bucketList);
      console.log(issue);
      issueAxios.postAddIssue(middleBucketId, request);

      const getIssueList = async () => {
        const bucket = issueAxios.getIssueList(middleBucketId);
        for (let i = 0; i < (await bucket).issueList.length; i++) {
          bList.push((await bucket).issueList[i]);
          console.log((await bucket).issueList[i]);
        }
        setBucketList(bList);
      };
      getIssueList();
      props.setIsInsert(false);
    }
  }, [props.isInsert]);
  useEffect(() => {
    const getBucketId = async () => {
      const index = middleBucketNameList.indexOf(middleBucketName);
      const bucketId = await middleBucketList[index].middleBucketId;
      console.log(bucketId);
      setMiddleBucketId(bucketId);
      const bucket = issueAxios.getIssueList(bucketId);
      const getIssueList = async () => {
        const bList: bucketType[] = [];
        for (let i = 0; i < (await bucket).issueList.length; i++) {
          bList.push((await bucket).issueList[i]);
          console.log((await bucket).issueList[i]);
        }
        setBucketList(bList);
      };
      getIssueList();
      console.log(issue);
    };
    getBucketId();
  }, [middleBucketName]);
  useEffect(() => {
    const getSprintId = async () => {
      const sprintId = await sprintList[sprintNameList.indexOf(sprintName)].id;
      setSprintId(sprintId);
      console.log(sprintId);
    };
    getSprintId();
  }, [sprintName]);
  const deleteHandler = (issueId: number) => {
    setBucketList(bucketList.filter(issue => issue.issueId !== issueId));
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
  const [newMiddleBucketName, setNewMiddleBucketName] = useState<string>('');
  const showModalHandler = () => {
    setModalOpen(true);
  };
  const closeModalHandler = () => {
    setModalOpen(false);
  };
  const inputBoxRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!modalOpen && newMiddleBucketName) {
      console.log(newMiddleBucketName);
      addMiddleBucketHandler();
      setNewMiddleBucketName('');
    }
  }, [modalOpen]);
  const BarList = bucketList.map(issue => (
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
        issueId={issue.issueId}
        issueType={issue.issueType}
        summary={issue.summary}
        description={issue.description}
        epicLink={issue.epicLink}
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
            setState={setMiddleBucketName}
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
        <SelectBox
          labelName={'Sprint'}
          ref={sprintRef}
          selectWidth={'160px'}
          setState={setSprintName}
        >
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
            console.log(bucketList);
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
