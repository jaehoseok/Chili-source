// REACT
import { useEffect, useState } from 'react';

// API HOOKS
import { useGetIssueByIssueKey, useUpdateIssueByIssueKey } from 'hooks/issue';

// STYLE
import { StyledFlex, StyledIconCloseBtn, StyledFlexEnd } from './style';
import { theme } from 'styles/theme';

// MUI
import FillButton from 'components/atoms/Button';
import Notification from 'components/atoms/Notification';
import Input from '@mui/material/Input';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// ETC
import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { AiFillCloseCircle } from 'react-icons/ai';

interface propsType {
  issueCode: string;
  ganttChartId: number;
  projectId: number;
  deleteGantt: UseMutationResult<void, unknown, number, unknown>;
  getGanttChart: UseQueryResult;
}

/**
 * @description
 * 서버 db에 저장된 지라 이슈를 가져오는 캘린더 전용 간트
 * 수정할 수 있는 모달을 가지고 있다.
 *
 * @author bell
 */
const index = ({ issueCode, ganttChartId, deleteGantt, projectId }: propsType) => {
  // MUI 모달 관리용 state
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // react-query
  const getIssueByIssueKey = useGetIssueByIssueKey(issueCode);
  const updateIssueByIssueKey = useUpdateIssueByIssueKey();

  // 참조용 값 (state 값을 input에 그대로 적용시키면, 수정하고 반영안해도 프론트 단에서는 변경되어있다.)
  const [ref_issueSummary, ref_storyPoint] = [
    getIssueByIssueKey.data ? getIssueByIssueKey.data.fields.summary.summary : '',
    getIssueByIssueKey.data ? getIssueByIssueKey.data.fields.customfield_10031 : 0,
  ];

  // 실제 요청시 보낼 issueSummary state
  const [getIssueSummary, setIssueSummary] = useState(
    getIssueByIssueKey.data ? getIssueByIssueKey.data.fields.summary.summary : '',
  );

  // 실제 요청시 보낼 storyPoint state
  const [getStoryPoint, setStoryPoint] = useState<number>(
    getIssueByIssueKey.data ? getIssueByIssueKey.data.fields.customfield_10031 : 0,
  );

  useEffect(() => {
    if (
      getIssueByIssueKey.data?.fields.summary.summary &&
      getIssueByIssueKey.data?.fields.customfield_10031
    ) {
      setIssueSummary(getIssueByIssueKey.data.fields.summary.summary);
      setStoryPoint(getIssueByIssueKey.data?.fields.customfield_10031);
    }
    if (updateIssueByIssueKey.isSuccess) {
      getIssueByIssueKey.refetch();
      // getGanttChart.refetch();
    }
  }, [
    getIssueByIssueKey.isSuccess,
    getIssueByIssueKey.isFetched,
    updateIssueByIssueKey.isSuccess,
    getIssueByIssueKey.data?.fields.summary.summary,
    getIssueByIssueKey.data?.fields.customfield_10031,
  ]);

  return (
    <>
      {updateIssueByIssueKey.isSuccess && (
        <Notification
          check={true}
          message={'지라 이슈가 수정되었습니다'}
          width={'300px'}
        ></Notification>
      )}
      {getIssueByIssueKey.data && (
        <Modal
          open={open as boolean}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          BackdropProps={{
            style: { opacity: 0.3 },
          }}
        >
          <Box
            sx={{
              position: 'absolute' as const,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              p: 4,
              outline: 'none',
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ color: theme.button.green, fontWeight: 700 }}
            >
              이슈 제목
            </Typography>
            <Input
              type="text"
              id="modal-moal-description"
              defaultValue={getIssueSummary}
              onChange={e => setIssueSummary(e.currentTarget.value)}
              fullWidth
              sx={{ marginBottom: '20px' }}
            ></Input>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ color: theme.button.green, fontWeight: 700 }}
            >
              스토리 포인트
            </Typography>
            <Input
              type="number"
              id="modal-moal-description"
              defaultValue={ref_storyPoint}
              onChange={e => setStoryPoint(+e.currentTarget.value)}
              fullWidth
            ></Input>
            <StyledFlexEnd>
              <FillButton
                width="80px"
                height="30px"
                backgroundColor={theme.button.green}
                clickHandler={() => {
                  updateIssueByIssueKey.mutate({
                    issueKey: issueCode,
                    projectId,
                    statusId: +getIssueByIssueKey.data.fields.status.id,
                    storyPoints: getStoryPoint as number,
                    summary: getIssueSummary,
                  });
                  handleClose();
                }}
              >
                수정
              </FillButton>
              <FillButton
                width="80px"
                height="30px"
                backgroundColor={theme.button.red}
                clickHandler={() => {
                  setIssueSummary(ref_issueSummary);
                  setStoryPoint(ref_storyPoint);
                  handleClose();
                }}
              >
                닫기
              </FillButton>
            </StyledFlexEnd>
          </Box>
        </Modal>
      )}

      <StyledFlex
        onClick={e => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          if (!e.target.path) handleOpen();
        }}
      >
        <div
          style={{
            padding: '2px 4px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {ref_issueSummary}
        </div>
        <StyledIconCloseBtn>
          <AiFillCloseCircle onClick={() => deleteGantt.mutate(ganttChartId)}></AiFillCloseCircle>
        </StyledIconCloseBtn>
      </StyledFlex>
    </>
  );
};

export default index;
