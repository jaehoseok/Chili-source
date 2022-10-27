import NavProject from '../molecules/NavProject';
import Tab from '../atoms/Tab';

const LandingPage = () => {
  return (
    <>
      <NavProject>
        <Tab id={0} isActivated={true} title={'칠리소스'} />
        <Tab id={1} isActivated={false} title={'API cloud'} />
      </NavProject>
      <div>LandingPage</div>
    </>
  );
};

export default LandingPage;
