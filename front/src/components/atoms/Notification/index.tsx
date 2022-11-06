import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { StyledNotfication, styledType } from './style';

interface propsType extends styledType {
  message: string;
}

/**
 *
 * @description
 * 알림을 나타나는 컴포넌트
 * 시간이 지나면 알아서 사라진다
 *
 * @example
 *
 * @param {string} message         - 알림 메시지 내용
 * @param {boolean} check         - 현재 알림의 상태 (false : 에러, true: 확인)
 * @param {number?} milliseconds   - 알림 애니메이션 시간 설정
 * @param {string?} width          - 알림의 길이
 *
 * @author bell
 */
const index = ({ message, check, milliseconds, width }: propsType) => {
  const [render, setRender] = useState(true);

  const el = document.getElementById('noti-root');

  useEffect(() => {
    setTimeout(() => setRender(prevRender => !prevRender), milliseconds ? milliseconds : 5000);
  }, []);

  return render
    ? createPortal(
        <StyledNotfication check={check} width={width} milliseconds={milliseconds}>
          {message}
        </StyledNotfication>,
        el as HTMLElement,
      )
    : null;
};

export default index;
