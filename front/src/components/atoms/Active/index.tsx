import { useState, ReactNode } from 'react';
import { StyledActive } from './style';

interface propsType {
  children: ReactNode;
}

const index = ({ children }: propsType) => {
  const [activated, setActivated] = useState(false);

  const toggleHandler = () => {
    setActivated(prev => !prev);
  };

  return (
    <StyledActive activated={activated} onClick={toggleHandler}>
      {children}
    </StyledActive>
  );
};

export default index;
