import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { StyledPadding, StyledSpan } from './style';

const index = () => {
  return (
    // <Box
    //   sx={{
    //     width: '100%',
    //     maxWidth: '900px',
    //     height: '100%',
    //     maxHeight: '700px',
    //     border: `1px solid #e9e9e9`,
    //     padding: '50px',
    // overflowY: 'scroll',
    //   }}
    // >
    //   <Typography sx={{ fontSize: '2rem', fontWeight: '500' }}>
    //     칠리소스 프로젝트 시작하기
    //   </Typography>
    //   <StyledPadding />
    //   <Typography>
    //     세상에 존재하는 모든 개발자 여러분 안녕하세요! 칠리소스를 개발한 B207 팀 입니다.
    //     <StyledPadding />
    //     칠리소스는 지라 혹은 협업툴을 사용하며 어려움을 느꼈던 부분들을 해결하기 위해 세상에
    //     나타났습니다. 자주 사용하는 이슈를 저장하여 쓰거나, 대량의 이슈를 한꺼번에 올리거나, 이슈를
    //     날짜별로 관리하여 공유하는 등 여러 편의적인 기능을 만들었으니 체험해보시기 바랍니다.
    //   </Typography>
    // </Box>
    <Box
      sx={{
        width: '100%',
        maxWidth: '900px',
        height: '100%',
        maxHeight: '700px',
        border: `1px solid #e9e9e9`,
        padding: '50px',
        overflowY: 'scroll',
      }}
    >
      <Typography sx={{ fontSize: '2rem', fontWeight: '500' }}>칠리소스 기능 소개</Typography>
      <StyledPadding />
      <Typography>
        칠리소스는 지라 혹은 협업툴을 사용하며 어려움을 느꼈던 부분들을 해결하기 위해 세상에
        나타났습니다. 자주 사용하는 이슈를 저장하여 쓰거나, 대량의 이슈를 한꺼번에 올리거나, 이슈를
        날짜별로 관리하여 공유하는 등 여러 편의적인 기능을 만들었으니 체험해보시기 바랍니다.
      </Typography>
      <StyledPadding />
      <StyledPadding />
      <Typography sx={{ fontSize: '1.75rem', fontWeight: '500' }}>이슈템플릿</Typography>
      <StyledPadding />
      <Typography>
        필요한 이슈를 저장하고 불러오는 것이 가능합니다. 스크럼, 회의 등 협업 시 자주 올라가는
        이슈들을 저장하고 관리할 수 있습니다. 더이상 이전에 생성했던 이슈를 다시 만들지 마세요!
        칠리소스에서 <StyledSpan>저장하고, 불러와서, 클릭</StyledSpan>만 하세요!
      </Typography>
      <StyledPadding />
      <StyledPadding />
      <Typography sx={{ fontSize: '1.75rem', fontWeight: '500' }}>미들 버킷</Typography>
      <StyledPadding />
      <Typography>
        칠리소스에서는 대량의 이슈를 한번에 올리는 것이 가능합니다. 미들 버킷을 생성하여, 올려야
        하는 필요한 이슈들을 분류하여 담는 것이 가능합니다. 물론 담은 이슈를 다시 빼는 것도
        가능합니다. 그렇게 모은 이슈들을 잘 정리해서, 반영하기를 원하는 스프린트에 넣으면 됩니다.
        <StyledPadding />
        자신의 혹은 팀의 업무환경에 맞는 여러가지 미들 버킷을 생성하시고 이슈를 간편하게 관리하세요.
        미들버킷과 함께 사용한다면, 더욱 효율적인 업무관리가 가능해집니다.
      </Typography>
      <StyledPadding />
      <StyledPadding />
      <Typography sx={{ fontSize: '1.75rem', fontWeight: '500' }}>캘린더</Typography>
      <StyledPadding />
      <Typography>
        칠리소스에서는 이슈를 날짜별로 등록하고 관리하는 것이 가능합니다. 진행중이거나, 혹은 아직
        진행하지 못한 이슈들을 캘린더에 등록하여 날짜별로 업무일정을 정리해보세요.
        <StyledPadding />
        날짜의 모든 이슈는 프로젝트 내의 모든 팀원에게 공유되며, 각 팀원이 설정한 색으로 표현
        됩니다. 원하는 날짜에 이슈를 등록하거나, 다른 날짜로 옮기거나, 기한을 연장해보세요. 이슈
        수정도 모두 가능합니다.
      </Typography>
    </Box>
  );
};

export default index;
