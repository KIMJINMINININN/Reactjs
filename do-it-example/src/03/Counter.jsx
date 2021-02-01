import React from 'react';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //초깃값은 props에서 전달받은 값으로 설정
      count: props.count,
    };
    this.increaseCount = this.increaseCount.bind(this);
  }
  increaseCount() {
    this.setState(({ count }) => ({
      count: count + 1,
    }));
    //setState로 state의 값을 조절한다.
  }
  render() {
    return (
      <div>
        현재 카운트 : {this.state.count}
        <button onClick={this.increaseCount}>카운트 증가</button>
      </div>
    );
  }
}

export default Counter;
