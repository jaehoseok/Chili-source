// styles
import { StyledWidget, styledType } from './style';

// components
import widgetData from './WidgetData';
import Sheet from 'components/atoms/Sheet';

interface propsType extends styledType {
  type?: string;
  path?: string;
  url?: string | null;
}

/**
 * @description
 * 위젯을 만드는 컴포넌트
 *
 * @param {string?} type - #위젯 타입 문자열
 *
 * @author inte
 */
export const Widget = ({ type, path, url }: propsType) => {
  return (
    <>
      <StyledWidget className="widget">
        <Sheet isShadow={true}>{widgetData[type as keyof typeof widgetData]({ url, path })}</Sheet>
      </StyledWidget>
    </>
  );
};
