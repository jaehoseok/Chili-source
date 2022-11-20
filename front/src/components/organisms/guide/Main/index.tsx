import { Typography, Box, Link } from '@mui/material';

import { StyledPadding, StyledSpan } from './style';

import Calendar from 'assets/images/Guide-calender.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { theme } from 'styles/theme';

const index = () => {
  const location = useLocation();
  const idx = +location.pathname.split('/')[2];

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '900px',
        height: '100%',
        maxHeight: '700px',
        border: `1px solid #e9e9e9`,
        padding: '50px',
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
          width: '7.5px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#f5f5f5',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: theme.color.primary,

          '&:hover': {
            backgroundColor: theme.color.secondary,
          },
        },
      }}
    >
      {idx === 1 && (
        <>
          {' '}
          <Typography sx={{ fontSize: '2rem', fontWeight: '500' }}>시작하기</Typography>
          <StyledPadding />
          <Typography sx={{ fontSize: '1.1rem' }}>
            세상에 존재하는 모든 개발자 여러분 안녕하세요! 칠리소스를 개발한 B207 팀 입니다.
            <StyledPadding />이 공간은 칠리소스의 사용 안내 및 유용한 오픈 소스 기여 방법 설계 및
            안내를 위해 만들어진 공간 입니다. GitHub에서 공개한{' '}
            <Link href="https://opensource.guide/" target="_blank" underline="none">
              <StyledSpan>Open Source Guides</StyledSpan>
            </Link>{' '}
            를 기반으로 관련 하나하나 정리해나갈 예정입니다. 오픈 소스 활동을 시작하는 데 있어서,
            칠리소스 팀 그리고 컨트리뷰터 모두에게 도움이 되는 가이드 페이지가 되었으면 합니다.
          </Typography>
          <StyledPadding />
          <Typography sx={{ fontSize: '1.1rem' }}>
            본 가이드는 현재 총 3개의 파트로 구성이 되었습니다.
          </Typography>
          <StyledPadding />
          <li style={{ fontSize: '1.1rem', cursor: 'pointer' }}>
            <Link onClick={() => navigate('/guide/2')} underline="none">
              <StyledSpan>칠리소스 기능 소개</StyledSpan>
            </Link>
          </li>
          <li style={{ fontSize: '1.1rem', cursor: 'pointer' }}>
            <Link onClick={() => navigate('/guide/3')} underline="none">
              <StyledSpan>칠리소스 기여 하기</StyledSpan>
            </Link>
          </li>
          <li style={{ fontSize: '1.1rem', cursor: 'pointer' }}>
            <Link onClick={() => navigate('/guide/4')} underline="none">
              <StyledSpan>FAQ</StyledSpan>
            </Link>
          </li>
          <StyledPadding />
          <Typography sx={{ fontSize: '1.1rem' }}>
            칠리소스의 서비스가 단순한 7주간의 프로젝트가 아닌 다른 개발자와 소통과 기여를 통해,
            에러를 제어하거나, 새로운 기능을 추가되는 서비스가 되길 바랍니다. 감사합니다.
          </Typography>
        </>
      )}
      {idx === 2 && (
        <>
          <Typography sx={{ fontSize: '2rem', fontWeight: '500' }}>칠리소스 기능 소개</Typography>
          <StyledPadding />
          <Typography sx={{ fontSize: '1.1rem' }}>
            칠리소스는 지라 혹은 협업툴을 사용하며 어려움을 느꼈던 부분들을 해결하기 위해 세상에
            나타났습니다. 자주 사용하는 이슈를 저장하여 쓰거나, 대량의 이슈를 한꺼번에 올리거나,
            이슈를 날짜별로 관리하여 공유하는 등 여러 편의적인 기능을 만들었으니 체험해보시기
            바랍니다.
          </Typography>
          <StyledPadding />
          <StyledPadding />
          <Typography sx={{ fontSize: '1.75rem', fontWeight: '500' }}>이슈템플릿</Typography>
          <StyledPadding />
          <Typography sx={{ fontSize: '1.1rem' }}>
            필요한 이슈를 저장하고 불러오는 것이 가능합니다. 스크럼, 회의 등 협업 시 자주 올라가는
            이슈들을 저장하고 관리할 수 있습니다. 더이상 이전에 생성했던 이슈를 다시 만들지 마세요!
            칠리소스에서 <StyledSpan>저장하고, 불러와서, 클릭</StyledSpan>만 하세요!
          </Typography>
          <StyledPadding />
          <StyledPadding />
          <Typography sx={{ fontSize: '1.75rem', fontWeight: '500' }}>미들 버킷</Typography>
          <StyledPadding />
          <Typography sx={{ fontSize: '1.1rem' }}>
            칠리소스에서는 대량의 이슈를 한번에 올리는 것이 가능합니다. 미들 버킷을 생성하여, 올려야
            하는 필요한 이슈들을 분류하여 담는 것이 가능합니다. 물론 담은 이슈를 다시 빼는 것도
            가능합니다. 그렇게 모은 이슈들을 잘 정리해서, 반영하기를 원하는 스프린트에 넣으면
            됩니다.
            <StyledPadding />
            자신의 혹은 팀의 업무환경에 맞는 여러가지 미들 버킷을 생성하시고 이슈를 간편하게
            관리하세요. 미들버킷과 함께 사용한다면, 더욱 효율적인 업무관리가 가능해집니다.
          </Typography>
          <StyledPadding />
          <StyledPadding />
          <Typography sx={{ fontSize: '1.75rem', fontWeight: '500' }}>캘린더</Typography>
          <StyledPadding />
          <Typography sx={{ fontSize: '1.1rem' }}>
            칠리소스에서는 이슈를 날짜별로 등록하고 관리하는 것이 가능합니다. 진행중이거나, 혹은
            아직 진행하지 못한 이슈들을 캘린더에 등록하여 날짜별로 업무일정을 정리해보세요.
            <StyledPadding />
            날짜의 모든 이슈는 프로젝트 내의 모든 팀원에게 공유되며, 각 팀원이 설정한 색으로 표현
            됩니다. 원하는 날짜에 이슈를 등록하거나, 다른 날짜로 옮기거나, 기한을 연장해보세요. 이슈
            수정도 가능합니다.
          </Typography>
          <StyledPadding />
          <img src={Calendar}></img>
          <StyledPadding />
          <StyledPadding />
          <Typography sx={{ fontSize: '1.75rem', fontWeight: '500' }}>간트차트</Typography>
          <StyledPadding />
          <Typography sx={{ fontSize: '1.1rem' }}>
            각 팀원들의 이슈 진행상황을 알 수 있다면 얼마나 편리할까요? 이슈를 진행했다, 진행하지
            않았다라는 이분법적인 개념으로 보는 것이 아닌, 진행도로 볼 수 있는 기능을 추가했습니다.
            <StyledPadding />
            달력에서 등록한 이슈는 간트차트에 동기화됩니다. 간트차트에서는 날짜 뿐만이 아니라 시간
            까지도 포함이 되어 분류할 수 있습니다. 달력과 동일하게 원하는 날짜에 옮기는 것이
            가능하며, 해당 이슈의 진행도를 나타내는 것이 가능합니다. 팀에서 모든 팀원의 진행도를
            파악하는 것이 쉬워지고, 상황에 따른 업무 수정, 업무 확장도 한층 더 용이해지죠.
          </Typography>
          <StyledPadding />
        </>
      )}
      {idx === 3 && (
        <>
          <Typography sx={{ fontSize: '2rem', fontWeight: '500' }}>기여</Typography>
          <StyledPadding />
          <Typography sx={{ fontSize: '1.1rem' }}>
            칠리소스 팀은 이름 그대로 더욱 이로운 코드 소스를 만들기 위해 멋진 개발자분들의 기여를
            기다리고 있습니다. 해당 페이지에 칠리소스 팀의 컨벤션 문화와 예제 코드를 남기니
            참고하시기 바랍니다.
          </Typography>
          <StyledPadding />
          <StyledPadding />
          <Typography sx={{ fontSize: '1.5rem', fontWeight: '500' }}>
            칠리소스 프론트앤드 코드 컨벤션
          </Typography>
          <StyledPadding />
          <Link
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.notion.so/beberiche/ce867e71a9954a64aebeab38fc5bf9cd"
            sx={{ fontSize: '1.1rem' }}
            underline="none"
          >
            <StyledSpan>칠리소스 프론트앤드 코드 컨벤션</StyledSpan>
          </Link>
          <StyledPadding />
          <StyledPadding />
          <Typography sx={{ fontSize: '1.5rem', fontWeight: '500' }}>
            칠리소스 백앤드 코드 컨벤션
          </Typography>
          <StyledPadding />
          <Link
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.notion.so/beberiche/8506b5790c064993b3e8cbfbdb69d98c"
            sx={{ fontSize: '1.1rem' }}
            underline="none"
          >
            <StyledSpan>칠리소스 백앤드 코드 컨벤션</StyledSpan>
          </Link>
          <StyledPadding />
          <StyledPadding />
          <Typography sx={{ fontSize: '1.5rem', fontWeight: '500' }}>
            칠리소스 깃 브랜치 전략
          </Typography>
          <StyledPadding />
          <Link
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.notion.so/beberiche/05cbfb7499634428b694ebd5b7235a22"
            sx={{ fontSize: '1.1rem' }}
            underline="none"
          >
            <StyledSpan>칠리소스 깃 브랜치 전략</StyledSpan>
          </Link>
        </>
      )}
      {idx === 4 && (
        <>
          <Typography sx={{ fontSize: '2rem', fontWeight: '500' }}>FAQ</Typography>
          <StyledPadding />
          <Typography sx={{ fontSize: '1.1rem' }}>
            서비스 사용 시, 혹은 컨트리뷰트 활동 중 문의 사항이 발생하는 경우, 해당 담당 개발자에게
            이메일을 통해 문의하는 것이 가능합니다.
          </Typography>
          <StyledPadding />
          <StyledPadding />
          <Typography sx={{ fontSize: '1.5rem', fontWeight: '500' }}>
            칠리소스 프론트앤드
          </Typography>
          <StyledPadding />
          <Link
            href="https://github.com/beberiche"
            target="_blank"
            underline="none"
            sx={{ fontSize: '1.1rem' }}
          >
            <StyledSpan>김종현</StyledSpan>
          </Link>{' '}
          : whdgus269@gmail.com
          <StyledPadding />
          <Typography sx={{ fontSize: '1.1rem' }}>
            <li>프로젝트 초기 셋팅</li>
            <li>프로젝트 플로우 연결</li>
            <li>프론트앤드 가이드라인 설계</li>
            <li>캘린더 기능 개발</li>
            <li>
              UI - 이중 네비게이션, Text, Select, Option, Tab, SelectBox, InputBox, Notification
            </li>
          </Typography>
          <StyledPadding />
          <Link
            href="https://github.com/giftanchovy"
            target="_blank"
            underline="none"
            sx={{ fontSize: '1.1rem' }}
          >
            <StyledSpan>박성현</StyledSpan>
          </Link>{' '}
          : 24ph00@naver.com
          <StyledPadding />
          <Typography sx={{ fontSize: '1.1rem' }}>
            <li>이슈 템플릿 기능 개발</li>
            <li>미들 버킷 개발</li>
            <li>Jira API 연결</li>
          </Typography>
          <StyledPadding />
          <Link
            href="https://github.com/inte99ral"
            target="_blank"
            underline="none"
            sx={{ fontSize: '1.1rem' }}
          >
            <StyledSpan>박준혁</StyledSpan>
          </Link>{' '}
          : dkdldpa9024@naver.com
          <StyledPadding />
          <Typography sx={{ fontSize: '1.1rem' }}>
            <li>구글 소셜 로그인</li>
            <li>간트차트 기능 개발</li>
            <li>대시보드 커스터마이징</li>
            <li>기능 위젯화</li>
            <li>라우터 네비게이션 가드 처리</li>
            <li>404 에러 핸들링</li>
            <li>랜딩 페이지 개발</li>
            <li>UI - Sheet, Input</li>
          </Typography>
          <StyledPadding />
          <StyledPadding />
          <Typography sx={{ fontSize: '1.5rem', fontWeight: '500' }}>칠리소스 백앤드</Typography>
          <StyledPadding />
          <Link
            href="https://github.com/ehoi-loveyourself"
            target="_blank"
            underline="none"
            sx={{ fontSize: '1.1rem' }}
          >
            <StyledSpan>박태이</StyledSpan>
          </Link>{' '}
          : ehoi.loveyourself@gmail.com
          <StyledPadding />
          <Typography sx={{ fontSize: '1.1rem' }}>
            <li>issue-service 개발</li>
            <li>이슈 템플릿 개발</li>
            <li>미들 버킷 개발</li>
            <li>Jira API를 활용한 이슈 조회 및 생성 기능 개발</li>
          </Typography>
          <StyledPadding />
          <Link
            href="https://github.com/jaehoseok"
            target="_blank"
            underline="none"
            sx={{ fontSize: '1.1rem' }}
          >
            <StyledSpan>석재호</StyledSpan>
          </Link>{' '}
          : wogh9705@naver.com
          <StyledPadding />
          <Typography sx={{ fontSize: '1.1rem' }}>
            <li>auth-service 개발</li>
            <li>액세스 토큰 및 리프레시 토큰 관리</li>
            <li>외부 API 토큰 관리</li>
            <li>user-service 개발</li>
            <li>유저 관련 CRUD</li>
            <li>widget-service 개발</li>
            <li>위젯 관련 CRUD</li>
            <li>운영 모니터링</li>
            <li>서버 설정</li>
            <li>MSA 베이스 가이드라인 작성</li>
          </Typography>
          <StyledPadding />
          <Link
            href="https://github.com/turtlebooster"
            target="_blank"
            underline="none"
            sx={{ fontSize: '1.1rem' }}
          >
            <StyledSpan>최진호</StyledSpan>
          </Link>{' '}
          : jhchoi6778@gmail.com
          <StyledPadding />
          <Typography sx={{ fontSize: '1.1rem' }}>
            <li>project-service 개발</li>
            <li>프로젝트 관리</li>
            <li>간트차트, 캘린더 관리</li>
            <li>팀원 관리</li>
            <li>권한 관리</li>
            <li>issue-service 개발</li>
            <li>Jira API 연결 보조</li>
            <li>운영 모니터링 보조</li>
          </Typography>
        </>
      )}
    </Box>
  );
};

export default index;
