// REACT

import { useGetTokens } from 'hooks/auth';
import { useGetProject } from 'hooks/project';
import { useGetGitMRorCommit } from 'hooks/widget';
import { useLocation, useNavigate } from 'react-router-dom';
import { JsxElement } from 'typescript';

// API & Library
import { propsType } from '../../';

// Styles
import { StyledWidgetData, StyledWidgetDataLabel, StyledWidgetDataContent } from '../style';
import { StyledDiv } from './style';

import { theme } from 'styles/theme';

import { Divider, Link } from '@mui/material';

export const SSAFYGITLAB = ({ url, id }: propsType) => {
  // Methods
  const clickHandler = () => {
    console.log('[ID]: ', id);
    console.log('[URL]: ', url);
    // window.open('https://www.naver.com', 'PopupNew', 'width=500,height=500');
  };

  const location = useLocation();
  const projectId = +location.pathname.split('/')[2];

  const tokenCodeId = 'SSAFYGITLAB';
  const widgetType = 'SSAFYGITLAB';

  // 일단 머지 부터
  const getGitMRorCommit = useGetGitMRorCommit(null, projectId, tokenCodeId, widgetType);

  const renderMergeSummary = () => {
    const recentMerge =
      getGitMRorCommit.data &&
      getGitMRorCommit.data.mergeRequestResponses.map(({ author, web_url, title }) => {
        return (
          <div>
            <Link
              href={web_url}
              target="_blank"
              underline="none"
              color="#000000"
              sx={{
                display: 'inline-block',
                '&:hover': {
                  color: theme.color.primary,
                  transition: 'all .2s linear',
                },
                padding: '10px 0',
              }}
            >
              <span style={{ color: theme.color.primary }}>{author.name}</span> {`의 머지`} -{' '}
              <span>{title}</span>
            </Link>
            <Divider />
          </div>
        );
      });
    return recentMerge;
  };

  // Return
  return (
    <>
      <StyledWidgetData ratio="1/2" height="265px" onClick={clickHandler}>
        <StyledWidgetDataLabel>깃랩 (최근 머지)</StyledWidgetDataLabel>
        <StyledWidgetDataContent>
          <StyledDiv>
            <div>{renderMergeSummary()}</div>
          </StyledDiv>
        </StyledWidgetDataContent>
      </StyledWidgetData>
    </>
  );
};
