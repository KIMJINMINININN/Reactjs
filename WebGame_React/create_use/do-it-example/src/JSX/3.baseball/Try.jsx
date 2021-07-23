  
import React, { Component } from 'react';

class Try extends Component {
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

export default Try;
/* 
// ---------------------------------------
import React, { memo } from 'react';
// 구조분해 사용해서 props를 tryInfo로 바로 전환한후 사용
// Hooks를 사용할때에는 PureComponent도 없고, shouldComponentUpdate도 없기때문에 memo라는것을 사용 Props, state가 바꼈을때만 render
const Try = memo(({ tryInfo }) => {
  // tryInfo.try = 'hello';
  // 위와같이 자식이 props를 바꾸면 안된다. React 규칙 그치만 바꿔야할때는 아래 처럼 바꿔준다.
  // 자식이 props를 바꿔버리면 부모의 props도 바꿔야하기때문에 아래와 같이 자식은 props 바꿔야하는경우에는 state로 만들어서
  // state로 바꾼다
  const [result, setResult] = useState(tryInfo.result);

  const onClick = () => {
    setResult('1');
  }
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div onClick={onClick}>{result}</div>
    </li>
  );
});

export default Try;
 */