import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { MiddleBucket, StyledBucketHeader, StyledBucketBody, StyledIssue } from './style';
import IssueBar from 'components/molecules/IssueBar';
import InputBox from 'components/molecules/InputBox';
import Circle from 'components/atoms/Circle';
import Sheet from 'components/atoms/Sheet';
import Button from 'components/atoms/Button';
import issueAxios from 'api/rest/issue';
import { ImBin } from 'react-icons/im';
import { RiSave3Fill } from 'react-icons/ri';
import { HiPlus } from 'react-icons/hi';
import { theme } from 'styles/theme';
import { Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import { useGetUserInfoHandler } from 'hooks/user';
import { BsCardChecklist } from 'react-icons/bs';
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
    userImage: props.issue.userImage,
  };
  const getUser = useGetUserInfoHandler();
  const myImg = getUser.data ? getUser.data.image : '';
  const getSprintList = issueAxios.getSprintList(pjtId);
  const getMiddleBucketList = issueAxios.getMiddleBucketList(pjtId);

  const [sprintId, setSprintId] = useState<number>(-1);
  const [sprintList, setSprintList] = useState<sprintType[]>([]);
  const pushSprintList = async () => {
    const sList: sprintType[] = [];
    for (let i = 0; i < (await getSprintList).values.length; i++) {
      sList.push((await getSprintList).values[i]);
    }
    setSprintList(sList);
  };

  const [bucketId, setBucketId] = useState<number>(-1);
  const [middleBucketList, setMiddleBucketList] = useState<middleBucketType[]>([]);
  const pushMiddleBucketList = async () => {
    const mList: middleBucketType[] = [];
    for (let i = 0; i < (await getMiddleBucketList).length; i++) {
      mList.push((await getMiddleBucketList)[i]);
    }
    setMiddleBucketList(mList);
  };
  useEffect(() => {
    pushSprintList();
    pushMiddleBucketList();
  }, []);

  const [bucketList, setBucketList] = useState<bucketType[]>([]);
  const showMiddleBucket = async () => {
    const bList: bucketType[] = [];
    const bucket = issueAxios.getIssueList(bucketId);
    for (let i = 0; i < (await bucket).issueList.length; i++) {
      bList.push((await bucket).issueList[i]);
    }
    setBucketList(bList);
  };
  const [received, setReceived] = useState(props.isInsert);
  useEffect(() => {
    if (props.isInsert) {
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
      issueAxios.postAddIssue(bucketId, request);

      setReceived(true);
      props.setIsInsert(false);
      // showMiddleBucket();
    }
  }, [props.isInsert]);
  useEffect(() => {
    showMiddleBucket();
  }, [bucketId]);
  useEffect(() => {
    if (received) {
      showMiddleBucket();
      setReceived(false);
    }
  }, [received]);
  const deleteHandler = (issueId: number) => {
    setBucketList(bucketList.filter(issue => issue.issueId !== issueId));
    issueAxios.deleteIssue(bucketId, issueId);
  };

  const addMiddleBucketHandler = () => {
    console.log(pjtId);
    console.log(newMiddleBucketName);
    issueAxios.postCreateMiddleBucket(newMiddleBucketName, pjtId);
    window.location.reload();
  };
  const editMiddleBucketHandler = () => {
    console.log(bucketId);
    issueAxios.putEditMiddleBucket(newMiddleBucketName, bucketId);
    window.location.reload();
  };
  const deleteMiddleBucketHandler = () => {
    issueAxios.deleteMiddleBucket(bucketId);
    window.location.reload();
  };
  const sendToJiraHandler = () => {
    issueAxios.postSendToJira(bucketId, pjtId);
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [addButtonOpen, setAddButtonOpen] = useState(false);
  const [editButtonOpen, setEditButtonOpen] = useState(false);
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
      console.log(addButtonOpen);
      console.log(editButtonOpen);
      if (addButtonOpen) addMiddleBucketHandler();
      else if (editButtonOpen) editMiddleBucketHandler();
      setNewMiddleBucketName('');

      setAddButtonOpen(false);
      setEditButtonOpen(false);
    }
  }, [modalOpen]);
  const changeHandler = (e: any, content: string) => {
    const value = e.target.value;
    content === 'bucket' ? setBucketId(value) : content === 'sprint' ? setSprintId(value) : '';
  };

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
        userImage={myImg}
      />
    </StyledIssue>
  ));
  return (
    <MiddleBucket>
      <StyledBucketHeader>
        <div style={{ display: 'flex', alignItems: 'end' }}>
          <FormControl style={{ minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">미들버킷</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="우선순위"
              onChange={e => {
                changeHandler(e, 'bucket');
              }}
            >
              {middleBucketList.map((b, idx) => {
                return (
                  <MenuItem key={idx} value={b.middleBucketId}>
                    {b.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Button
            borderColor={theme.issue.task}
            width={'40px'}
            height={'40px'}
            margin={'5px'}
            clickHandler={() => {
              showModalHandler();
              setAddButtonOpen(true);
            }}
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
            {addButtonOpen && (
              <Button
                borderColor={theme.issue.task}
                clickHandler={() => {
                  setNewMiddleBucketName(inputBoxRef.current ? inputBoxRef.current.value : '');
                  closeModalHandler();
                }}
                isHover
              >
                Add Bucket
              </Button>
            )}
            {editButtonOpen && (
              <Button
                borderColor={theme.issue.task}
                clickHandler={() => {
                  setNewMiddleBucketName(inputBoxRef.current ? inputBoxRef.current.value : '');
                  closeModalHandler();
                }}
                isHover
              >
                Edit Bucket
              </Button>
            )}
          </Modal>
          <Button
            borderColor={theme.issue.story}
            width={'40px'}
            height={'40px'}
            margin={'5px'}
            clickHandler={() => {
              showModalHandler();
              setEditButtonOpen(true);
            }}
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
        <FormControl style={{ minWidth: 120 }}>
          <InputLabel id="demo-simple-select-label">스프린트</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="우선순위"
            onChange={e => {
              changeHandler(e, 'sprint');
            }}
          >
            {sprintList.map((s, idx) => {
              return (
                <MenuItem key={idx} value={s.id}>
                  {s.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Button
          borderColor={'#1973ee'}
          isHover
          margin={'5px'}
          clickHandler={() => {
            sendToJiraHandler();
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
