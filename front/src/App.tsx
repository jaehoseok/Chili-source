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

// 테스트용 삭제용 더미 데이터
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
      try {
        newTabs[idx].isActivated = !newTabs[idx].isActivated;
      } catch (e) {
        // 재 렌더링 idx 값이 계속 남아있는 문제 발생
        if (tabs.length > idx) idx--;
        if (idx < 0) idx++;
        newTabs[idx].isActivated = !newTabs[idx].isActivated;
      } finally {
        return newTabs;
      }
    });
  };

  const closeTabHandler = (idx: number) => {
    setTabs(prevArr => {
      const newTabs = [...prevArr];
      return newTabs.filter((_, index) => index !== idx);
    });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <>
          <NavProject>
            {tabs.map(({ isActivated, title }, idx) => (
              <Tab
                key={idx}
                isActivated={isActivated}
                title={title}
                toggleHandler={activateToggleHandler.bind('', idx)}
                closeHandler={closeTabHandler.bind('', idx)}
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
