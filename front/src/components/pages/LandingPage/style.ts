import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledPage = styled.div`
  ${tw`w-full flex flex-col items-center overflow-y-scroll`}
  height: calc(100vh - 66px);
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: lightgray;
    background-clip: padding-box;
    border-radius: 100px;

    border: 2px solid transparent;
  }
`;

export const StyledHeader = styled.div``;

export const StyledBody = styled.div`
  ${tw`flex-grow-[1] flex flex-col items-center w-11/12`}
  max-width: 1200px;
  background-color: rgba(0, 0, 0, 0.02);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  background-blend-mode: overlay;
  box-shadow: 4px 4px 10px -1px rgba(0, 0, 0, 0.25), -4px -4px 10px -1px rgba(255, 255, 255, 0.25);
`;

export const StyledSpacer = styled.div<{ value?: string }>`
  ${tw`w-8 h-8`}
  ${({ value }) => `width: ${value}; height: ${value};`}
`;

export const StyledButton = styled.button<{ color1?: string; color2?: string }>`
  ${tw`w-16 h-8 cursor-pointer`}
  font-size: 1rem;
  height: 40px;
  width: 40%;
  max-width: 400px;
  border-radius: 20px;
  color: white;
  border: none;
  background: linear-gradient(90deg, #7579ff 0%, #b224ef 100%);
`;

export const StyledSection = styled.div`
  ${tw`w-full flex justify-center`}
`;

export const StyledContainer = styled.div<{ backgroundColor?: string; backgroundImage?: string }>`
  ${tw`flex-grow-[1] flex flex-col justify-center items-center bg-white`}
  ${({ backgroundColor }) => {
    if (backgroundColor) return `background-color: ${backgroundColor};`;
    else
      return `
        border-radius: 20px;
        padding: 2rem;
        box-shadow: 4px 4px 10px -1px rgba(0, 0, 0, 0.25), -4px -4px 10px -1px rgba(255, 255, 255, 0.25);
        transition: all 0.2s;
        &:hover {
          scale: 1.02;
        }
      `;
  }}

  ${({ backgroundImage }) =>
    backgroundImage
      ? `
        background: linear-gradient(
          to right,
          rgba(255, 255, 255, 1) 50%,
          rgba(255, 255, 255, 0) 100%
        ),
        url(${backgroundImage});
        background-repeat: no-repeat;
        background-size: cover;
      `
      : ``}
`;

export const StyledDrop = styled.div<{ backgroundRGBA?: string }>`
  ${tw``}
  width: 300px;
  height: 300px;
  margin: 1rem;

  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: center;
  transition: 0.2s ease-in-out;
  ${({ backgroundRGBA }) => `background-color: rgba(${backgroundRGBA});`}

  box-shadow: inset 20px 20px 20px rgba(0, 0, 0, 0.05), 25px 35px 20px rgba(0, 0, 0, 0.05),
    25px 30px 30px rgba(0, 0, 0, 0.05), inset -20px -20px 25px rgba(255, 255, 255, 0.9);

  &::before {
    position: absolute;
    top: 50px;
    left: 85px;
    width: 35px;
    height: 35px;
  }

  &:nth-child(1) {
    border-radius: 57% 43% 43% 57% / 43% 43% 57% 57%;
  }

  &:nth-child(2) {
    border-radius: 73% 27% 59% 41% / 57% 59% 41% 43%;
  }

  &:nth-child(3) {
    border-radius: 35% 65% 31% 69% / 57% 59% 41% 43%;
  }

  &:hover {
    border-radius: 50%;
  }

  &::before {
    content: '';
    position: absolute;
    top: 70px;
    left: 60px;
    width: 35px;
    height: 35px;
    background: #fff;
    border-radius: 50%;
    opacity: 0.9;
  }

  &::after {
    content: '';
    position: absolute;
    top: 110px;
    left: 80px;
    width: 15px;
    height: 15px;
    background: #fff;
    border-radius: 50%;
    opacity: 0.9;
  }
`;
