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
          clickHandler={() => console.log('token 불러오는 버튼')}
        >
          입력
        </Button>
      </StyledInputBtnBox>
      <Sheet width={'400px'} height={'300px'} flex={'column'}>
        <Text
          isFill={false}
          backgroundColor={'transparent'}
          message={'지라 프로젝트1'}
          fontSize={'20px'}
          fontWeight={'bold'}
          clickHandler={() => console.log('지라 프로젝트1')}
        />
        <Text
          isFill={false}
          backgroundColor={'transparent'}
          message={'지라 프로젝트2'}
          fontSize={'20px'}
          fontWeight={'bold'}
          clickHandler={() => console.log('지라 프로젝트2')}
        />
      </Sheet>
    </StyledTokenBox>
  );
};

export default index;
