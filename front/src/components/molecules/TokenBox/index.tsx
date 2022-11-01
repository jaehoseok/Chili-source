import { StyledTokenBox, StyledInputBtnBox, styledType } from './style';
import Sheet from '../../atoms/Sheet';
import Input from '../../atoms/Input';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';
import { theme } from '../../../styles/theme';

interface propsType extends styledType {
  labelText: string;
}
const index = ({ labelText, width, height }: propsType) => {
  return (
    <StyledTokenBox>
      <Text isFill={false} message={labelText} fontSize={'24px'}></Text>
      <StyledInputBtnBox>
        <Input height={'24px'}></Input>
        <Button
          backgroundColor={theme.button.lightgray}
          borderColor={theme.button.gray}
          width={'54px'}
          height={'24px'}
        >
          입력
        </Button>
      </StyledInputBtnBox>
      <Sheet width={'400px'} height={'300px'}></Sheet>
    </StyledTokenBox>
  );
};

export default index;
