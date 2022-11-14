// Styles
import { StyledPage, StyledHeader, StyledBody } from './style';
import HeaderNav from 'components/organisms/common/HeaderServiceNav';

// Components
import Section from 'components/organisms/project/widgets/Section';

const WidgetSelectPage = () => {
  return (
    <>
      <StyledPage>
        <StyledHeader className="header">{/* <HeaderNav /> */}</StyledHeader>
        <StyledBody>
          <Section />
        </StyledBody>
      </StyledPage>
    </>
  );
};

export default WidgetSelectPage;
