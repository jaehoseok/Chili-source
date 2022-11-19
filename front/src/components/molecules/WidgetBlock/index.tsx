// API & Library
import { useNavigate, useParams } from 'react-router-dom';
import { useAddLayout, useGetLayout } from 'hooks/widget';

// Styles
import {
  StyledWidgetBlock,
  StyledWidgetBlockLine,
  StyledWidgetBlockText,
  styledType,
} from './style';

// Components
import Sheet from 'components/atoms/Sheet';

interface propsType extends styledType {
  type: string;
}

/**
 * @description
 * 위젯 선택 창의 위젯 블럭을 만드는 컴포넌트, 타입만 정해도 된다.
 *
 * @example
 * // 사용 예시
 * <WidgetBlock type="JiraBucket" />
 *
 * // 지정되지 않은 타입 사용시
 * <WidgetBlock height="100px" width="400px" type="No Defined" />
 *
 * @param {string?} type - #위젯 타입 문자열
 *
 * @author inte
 */
export const WidgetBlock = ({ height, width, type }: propsType) => {
  // Init
  let label = '';
  let text = '';
  let src;
  let clickHandler = () => {
    console.log('-');
  };

  const navigate = useNavigate();
  const { projectId, columnIdx } = useParams();
  const addLayout = useAddLayout().mutate;
  const getLayout = useGetLayout().data;

  // 타입에 따른 위젯 설명
  switch (type) {
    case 'GANTT':
      label = '간트 차트';
      text = '프로젝트에 할 일을 간편하게 생성하고 이를 간트 차트화 하여 보여줍니다.';
      clickHandler = async () => {
        addLayout({
          projectId: Number(projectId),
          widgetCodeId: type,
          widgetCol: Number(columnIdx),
          widgetRow: getLayout ? getLayout[Number(columnIdx)].children.length : 0,
        });

        navigate(`/project/${projectId}/dashboard`);
      };
      break;
    case 'CALENDAR':
      label = '캘린더';
      text = '프로젝트의 일정을 달력으로 표현하여 한 눈에 확인 할 수 있습니다.';
      clickHandler = async () => {
        addLayout({
          projectId: Number(projectId),
          widgetCodeId: type,
          widgetCol: Number(columnIdx),
          widgetRow: getLayout ? getLayout[Number(columnIdx)].children.length : 0,
        });

        navigate(`/project/${projectId}/dashboard`);
      };
      break;
    case 'JIRA':
      label = '지라 버킷';
      text =
        'Jira 에 이슈들의 규격을 저장하거나, 규격에 맞게 다 수의 이슈를 스프린트에 자동 생성해줍니다.';
      clickHandler = async () => {
        addLayout({
          projectId: Number(projectId),
          widgetCodeId: type,
          widgetCol: Number(columnIdx),
          widgetRow: getLayout ? getLayout[Number(columnIdx)].children.length : 0,
        });

        navigate(`/project/${projectId}/dashboard`);
      };
      break;
    case 'SSAFYGITLAB':
      label = '깃 로그';
      text = '깃의 커밋과 지라 이슈 내역을 연결하여 그래프로 정리하여 보여줍니다.';
      clickHandler = async () => {
        addLayout({
          projectId: Number(projectId),
          widgetCodeId: type,
          widgetCol: Number(columnIdx),
          widgetRow: getLayout ? getLayout[Number(columnIdx)].children.length : 0,
          requestUrl: 'www.naver.com',
        });

        navigate(`/project/${projectId}/dashboard`);
      };
      break;
    default:
      label = '정의되지 않은 위젯';
      text = `${type} 타입은 정의되지 않은 위젯입니다`;
      break;
  }

  // 없는 위젯 타입 선언시, require 에러 핸들링
  try {
    src = require(`assets/images/${type}.png`);
  } catch (e) {
    console.log(e);
    src = '';
  }

  return (
    <>
      <div onClick={clickHandler}> * 버튼</div>
      <StyledWidgetBlock height={height} width={width} onClick={clickHandler}>
        <Sheet isShadow={true} height="100%" width="40%">
          <img src={src} alt={type} style={{ height: '60%', width: '60%', objectFit: 'contain' }} />
        </Sheet>
        <StyledWidgetBlockLine />
        <StyledWidgetBlockText>{text}</StyledWidgetBlockText>
      </StyledWidgetBlock>
    </>
  );
};
