import { useEffect, useState } from 'react';

import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';

import { theme } from './styles/theme';

import RouterWrapper from './RouterWrapper';

import NavProject from './components/molecules/NavProject';
import Tab from './components/atoms/Tab';

interface tabData {
  isActivated: boolean;
  title: string;
}

// 테스트용 더미 데이터
const CHILISOURCE = {
  isActivated: true,
  title: '칠리소스',
};

const APICLOUD = {
  isActivated: false,
  title: 'API cloud',
};

const MOTOO = {
  isActivated: false,
  title: '모투',
};

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 6 * 10 * 1000,
      },
    },
  });

  const [tabs, setTabs] = useState<tabData[]>([]);

  useEffect(() => {
    setTabs([CHILISOURCE, APICLOUD, MOTOO]);
  }, []);

  const activateToggleHandler = (idx: number) => {
    setTabs(prevArr => {
      const newTabs = [...prevArr];
      newTabs.forEach(newTab => (newTab.isActivated = false));
      newTabs[idx].isActivated = !newTabs[idx].isActivated;
      return newTabs;
    });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <>
          <NavProject>
            {tabs.map(({ isActivated, title }, idx) => (
              <Tab
                id={idx}
                isActivated={isActivated}
                title={title}
                toggleHandler={activateToggleHandler.bind('', idx)}
              ></Tab>
            ))}
          </NavProject>
        </>
        <RouterWrapper />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
