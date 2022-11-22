import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
// import Modal from 'react-modal';
import {
  MiddleBucket,
  StyledBucketHeader,
  StyledBucketBody,
  StyledIssue,
  StyledBetween,
  StyledCenter,
  StyledEnd,
} from './style';
import IssueBar from 'components/molecules/IssueBar';
import InputBox from 'components/molecules/InputBox';
import Circle from 'components/atoms/Circle';
import Sheet from 'components/atoms/Sheet';
import Button from 'components/atoms/Button';
import Text from 'components/atoms/Text';
import issueAxios from 'api/rest/issue';
import { ImBin } from 'react-icons/im';
import { RiSave3Fill } from 'react-icons/ri';
import { HiPlus, HiPencil } from 'react-icons/hi';
import { theme } from 'styles/theme';
import { Select, FormControl, InputLabel, MenuItem, Modal, Box, Typography } from '@mui/material';
import { useGetUserInfoHandler } from 'hooks/user';
import { BsCardChecklist } from 'react-icons/bs';
const index = (props: any) => {
  const [issueId, setIssueId] = useState(0);
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
  const getMiddleBucketList = issueAxios.getMiddleBucketList(pjtId);

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
  const [received, setReceived] = useState(false);
  useEffect(() => {
    if (props.isInsert) {
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
  const showModalHandler = () => {
    setModalOpen(true);
  };
  const closeModalHandler = () => {
    setModalOpen(false);
    setAddButtonOpen(false);
    setEditButtonOpen(false);
  };
  const inputBoxRef = useRef<HTMLInputElement>(null);
  const changeHandler = (e: any, content: string) => {
    const value = e.target.value;
    content === 'bucket' ? setBucketId(value) : '';
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
          <FormControl style={{ minWidth: 200 }}>
            <InputLabel id="demo-simple-select-label">미들버킷</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="미들버킷"
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
            margin={'5px 5px 5px 10px'}
            clickHandler={() => {
              showModalHandler();
              setAddButtonOpen(true);
            }}
            isHover
          >
            <HiPlus size={'1.2rem'} />
          </Button>
          <Modal
            open={modalOpen}
            onClose={closeModalHandler}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: 'absolute' as const,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 480,
                bgcolor: 'background.paper',
                p: 4,
                outline: 'none',
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <StyledBetween>
                  {addButtonOpen && (
                    <Text
                      isFill={false}
                      message={'Add MiddleBucket'}
                      fontSize={'1.5rem'}
                      fontWeight={'bold'}
                    />
                  )}
                  {editButtonOpen && (
                    <Text
                      isFill={false}
                      message={'Edit MiddleBucket'}
                      fontSize={'1.5rem'}
                      fontWeight={'bold'}
                    />
                  )}
                </StyledBetween>
              </Typography>
              <Typography id="modal-modal-inputbox" variant="h6" component="h2">
                <InputBox
                  ref={inputBoxRef}
                  labelName={'Bucket Name'}
                  isRow={false}
                  containerPadding={'0 0 16px'}
                  inputPlaceHolder={'이름을 입력하세요'}
                />
              </Typography>
              <StyledCenter>
                {addButtonOpen && (
                  <Button
                    borderColor={theme.issue.story}
                    clickHandler={() => {
                      const name = inputBoxRef.current ? inputBoxRef.current.value : '';
                      issueAxios.postCreateMiddleBucket(name, pjtId);
                      closeModalHandler();
                      window.location.reload();
                    }}
                    isHover
                  >
                    Add Bucket
                  </Button>
                )}
                {editButtonOpen && (
                  <Button
                    borderColor={theme.issue.story}
                    clickHandler={() => {
                      const name = inputBoxRef.current ? inputBoxRef.current.value : '';
                      console.log(name);
                      console.log(bucketId);
                      issueAxios.putEditMiddleBucket(name, bucketId);
                      closeModalHandler();
                      window.location.reload();
                    }}
                    isHover
                  >
                    Edit Bucket
                  </Button>
                )}
              </StyledCenter>
            </Box>
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
            <HiPencil size={'1.2rem'} />
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
      <Sheet
        isShadow={true}
        flex={'column'}
        height={'90%'}
        isOverflowYScroll={true}
        maxWidth={'538px'}
      >
        <StyledBucketBody>{BarList}</StyledBucketBody>
      </Sheet>
    </MiddleBucket>
  );
};
export default index;
