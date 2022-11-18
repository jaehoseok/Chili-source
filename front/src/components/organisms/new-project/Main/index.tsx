// LIBRARY
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';

// STYLE
import { StyledContainer, StyledMarginY, StyledFlexRowEnd, StyledSliderContainer } from './style';
import { theme } from 'styles/theme';

// MOLECULES
// import InputBox from 'components/molecules/InputBox';
import ProjectCreate from 'components/molecules/ProjectCreate';
import LinkageTokens from 'components/molecules/LinkageTokens';
import Button from 'components/atoms/Button';

/**
 * @description
 * 프로젝트 생성 페이지, 지라와 깃을 연동하고
 * 지라의 프로젝트를 가져와 서비스의 프로젝트와 연결하도록 해주는 페이지
 *
 * @author bell
 */
const index = () => {
  // project 생성시 받을 프로젝트 id 값
  const [projectId, setProjectId] = useState<number>();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <StyledContainer>
      <StyledSliderContainer>
        {/* 슬라이더 기능 */}
        <Slider {...settings}>
          <ProjectCreate setProjectId={setProjectId} />
          <LinkageTokens projectId={projectId}></LinkageTokens>
        </Slider>
        <StyledMarginY>
          <StyledFlexRowEnd>
            <Button
              width="100px"
              borderColor={theme.button.gray}
              backgroundColor={theme.button.green}
              isHover={true}
            >
              이전
            </Button>
            <Button
              width="100px"
              borderColor={theme.button.gray}
              backgroundColor={theme.button.green}
              isHover={true}
            >
              다음
            </Button>
          </StyledFlexRowEnd>
        </StyledMarginY>
      </StyledSliderContainer>
    </StyledContainer>
  );
};

export default index;
