import { style } from '@mui/system';
import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledProjectInfo = styled.div`
  ${tw`w-full flex flex-col items-center`}
`;

export const StyledProjectInfoLine = styled.div`
  height: 2px;
  width: 90%;
  margin: 4px;
  background: gray;
`;

export const StyledFlex = styled.div`
  ${tw`w-full flex gap-10`}
  max-width: 1200px;
`;

export const StyledFlexCenter = styled.div`
  ${tw`w-full flex items-center mb-5`}
  max-width: 1200px;
`;

export const StyledFlexCol = styled.div`
  ${tw`w-full flex flex-col items-center justify-between py-5`}
  max-width: 1200px;
`;

export const StyledSheetPadding = styled.div`
  ${tw`px-10 py-8`}
`;

export const StyledH2 = styled.div`
  ${tw`font-bold text-2xl`}
`;

export const StyledDescription = styled.div`
  ${tw`font-bold text-sm`}
`;

export const StyledWidth = styled.div`
  ${tw`w-full`}
`;

export const StyledHeight = styled.div`
  ${tw`h-full`}
`;

export const StyledBar = styled.div`
  ${tw`w-2 h-16 ml-7 mr-4`}
  background-color: ${({ theme }) => theme.color.primary};
`;

export const StyledLinkageToken = styled.div`
  p {
    margin-bottom: 2px;
    color: ${({ theme }) => theme.button.gray};
    font-size: 0.5rem;
  }
`;

export const StyledProjectUser = styled.div`
  ${tw`flex gap-3`}
`;

export const StyledUserName = styled.div`
  font-size: 0.8rem;
  font-weight: bolder;
`;

export const StyledTextCenter = styled.div`
  text-align: center;
`;

export const StyledRoleId = styled.div`
  font-size: 0.6rem;
  color: ${({ theme }) => theme.button.gray};
`;

export const StyledOverFlowX = styled.div`
  ${tw`py-3`}
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;
