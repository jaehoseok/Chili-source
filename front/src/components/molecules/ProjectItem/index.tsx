import { styledType } from './style';

interface propsType extends styledType {
  name: string;
  leader: string;
  members: string[];
}
const index = () => {
  return <div>ProjectItem Molecules</div>;
};

export default index;
