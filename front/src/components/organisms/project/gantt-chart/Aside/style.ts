import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledGanttChartPage = styled.div`
  ${tw`h-screen w-screen flex flex-col`}
`;
StyledGanttChartPage.defaultProps = {};

export const StyledGanttChartBody = styled.div`
  ${tw`flex-grow-[1] flex`}
`;
StyledGanttChartPage.defaultProps = {};
