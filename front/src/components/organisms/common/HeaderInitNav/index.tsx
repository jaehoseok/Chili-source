import { createPortal } from 'react-dom';
import NavInit from 'components/molecules/NavInit';
/**
 * @description
 * Page에 올릴 비서비스용 NavInit을 총괄하는 래퍼 컴포넌트
 * 기존의 서비스용 NavProject, NavWidget과 비슷한 형태를 갖추기 위해
 * 래퍼 컴포넌트로 만듦
 *
 * @author bell
 */
const index = () => {
  const el = document.getElementById('nav-init-root');
  return createPortal(<NavInit></NavInit>, el as HTMLElement);
};

export default index;
