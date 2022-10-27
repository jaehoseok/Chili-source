import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';

import { theme } from './styles/theme';

import RouterWrapper from './RouterWrapper';

import NavProject from './components/molecules/NavProject';
import Tab from './components/atoms/Tab';

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 6 * 10 * 1000,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <>
          <NavProject>
            <Tab id={0} isActivated={true} title={'칠리소스'} />
            <Tab id={1} isActivated={false} title={'API cloud'} />
          </NavProject>
        </>
        <RouterWrapper />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
