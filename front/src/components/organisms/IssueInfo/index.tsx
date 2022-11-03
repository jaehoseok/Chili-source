import { StyledIssueInfo } from './style';
import Sheet from '../../atoms/Sheet';
import Text from '../../atoms/Text';
import SelectBox from '../../molecules/SelectBox';
import TextAreaBox from '../../molecules/TextAreaBox';

const index = (props: any) => {
  console.log(props);
  return (
    <StyledIssueInfo>
      <Sheet isShadow={false} flex={'column'}>
        <TextAreaBox isRow={false} labelName={'프로젝트'} textAreaValue={props.info.project} />
        <SelectBox labelName={'이슈 유형'}>
          <option value="">유형을 선택하세요</option>
          <option value="story">스토리</option>
          <option value="task">태스크</option>
          <option value="bug">버그</option>
        </SelectBox>
        <TextAreaBox isRow={false} labelName={'요약'} textAreaValue={props.info.summary} />
        <TextAreaBox isRow={false} labelName={'설명'} />
        <SelectBox labelName={'보고자'}>
          <option>팀원</option>
          <option>팀원2</option>
        </SelectBox>
        <SelectBox labelName={'담당자'}>
          <option>팀원</option>
          <option>팀원2</option>
        </SelectBox>
        <span style={{ color: '#4BADE8', cursor: 'pointer' }}>나에게 할당</span>
        <SelectBox labelName={'우선순위'}>
          <option>Highest</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
          <option>Lowest</option>
        </SelectBox>
        <SelectBox labelName={'Epic Link'}>
          <option>에픽 링크 목록</option>
        </SelectBox>
        <SelectBox labelName={'Sprint'}>
          <option>현재 스프린트(클릭 불가능하게 할거임)</option>
        </SelectBox>
        <TextAreaBox
          isRow={false}
          labelName={'Story Points'}
          textAreaValue={props.info.storyPoints}
        />
      </Sheet>
    </StyledIssueInfo>
  );
};

export default index;
