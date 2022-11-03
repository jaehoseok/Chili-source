import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledGanttChartPage = styled.div`
  ${tw`h-screen w-screen flex flex-col items-center`}
`;
StyledGanttChartPage.defaultProps = {};

export const StyledGanttChartBody = styled.div`
  ${tw`flex-grow-[1] max-w-[80%] flex overflow-hidden`}
`;
StyledGanttChartBody.defaultProps = {};
