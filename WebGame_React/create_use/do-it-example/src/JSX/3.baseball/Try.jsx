/* import React, { PureComponent } from 'react';

class Try extends PureComponent {
  render() {
    const { tryInfo } = this.props;
    return (
      <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
      </li>
    );
  }
}

export default Try; */

// ---------------------------------------
import React, { memo } from 'react';
// 구조분해 사용해서 props를 tryInfo로 바로 전환한후 사용
// Hooks를 사용할때에는 PureComponent도 없고, shouldComponentUpdate도 없기때문에 memo라는것을 사용 Props, state가 바꼈을때만 render
const Try = memo(({ tryInfo }) => {
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  );
});

export default Try;
