interface propsType {
  messages: string[];
  keys?: string[];
  selected?: string;
}

/**
 * @description
 * 배열의 데이터 만큼 option 태그를 반환하는 컴포넌트
 *
 * @example
 * <Option messages={['스토리', '태스크', '버그']}></Option>
 *
 * @param {string[]} messages   - option의 값이 되는 string 배열
 * @author bell
 */
const index = ({ messages, keys, selected }: propsType) => {
  return (
    <>
      {messages.map((message, idx) => (
        <option key={idx} value={keys ? keys[idx] : message} selected={selected === message}>
          {message}
        </option>
      ))}
    </>
  );
};
export default index;
