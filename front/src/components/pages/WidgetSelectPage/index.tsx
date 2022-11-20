// Styles
import { StyledPage, StyledHeader, StyledBody } from './style';
import HeaderNav from 'components/organisms/common/HeaderServiceNav';

// Components
import { WidgetBlockContainer } from 'components/organisms/project/widgets/WidgetBlockContainer';

const WidgetSelectPage = () => {
  return (
    <>
      <StyledPage>
        <StyledHeader className="header">
          <HeaderNav />
        </StyledHeader>
        <StyledBody className="body">
          <WidgetBlockContainer></WidgetBlockContainer>
        </StyledBody>
      </StyledPage>
    </>
  );
};

export default WidgetSelectPage;
