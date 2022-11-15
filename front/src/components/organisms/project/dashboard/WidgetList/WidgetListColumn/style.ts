import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledWidgetListColumn = styled.div`
  ${tw`flex items-start`}
  flex-wrap: wrap;
  align-content: flex-start;
  width: 512px;
`;

export const StyledWidgetListColumnLabel = styled.div`
  ${tw`w-full flex justify-center`}
`;

export const StyledWidgetListItemContainer = styled.div``;

export const StyledWidgetListItemBox = styled.div`
  ${tw`flex`}
`;
