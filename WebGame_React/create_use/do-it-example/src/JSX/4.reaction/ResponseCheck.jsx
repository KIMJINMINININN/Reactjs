import React, { Component } from 'react';

class ResponseCheck extends Component {
  state = {
    state: 'waiting',
    message: '클릭해서 시작하세요.',
    result: [],
  };

  timeout;
  startTime;

  onClickScreen = () => {
    const { state, message, result } = this.state;
    if (state === 'waiting') {
      this.setState({
        state: 'ready',
        message: '초록색이 되면 클릭하세요',
      });
      this.timeout = setTimeout(() => {
        this.setState({
          state: 'now',
          message: '지금 클릭',
        });
        this.startTime = new Date();
      }, Math.floor(Math.random() * 1000) + 2000); // 2~3초후에 settimeouts
    } else if (state === 'ready') {
      clearTimeout(this.timeout);
      this.setState({
        state: 'waiting',
        message: '너무 성급하시군요! 초록색이 된후에 클릭하세요!',
      });
    } else if (state === 'now') {
      this.endTime = new Date();
      this.setState((prevState) => {
        return {
          state: 'waiting',
          message: '클릭해서 시작하세요!',
          result: [...prevState.result, this.endTime - this.startTime],
        };
      });
    }
  };

  onReset = () => {
    this.setState({
      result: [],
    });
  };

  renderAverage = () => {
    const { result } = this.state;
    //삼항 연사자를 이용해서 if를 사용하기
    return result.length === 0 ? null : (
      <>
        <div>평균 시간 : {result.reduce((a, c) => a + c) / result.length}ms</div>
        <button onClick={this.onReset}>리셋</button>
      </>
    );
  };

  render() {
    return (
      <>
        <div id="screen" className={this.state.state} onClick={this.onClickScreen}>
          {this.state.message}
        </div>
        {this.renderAverage()}
      </>
    );
  }
}

export default ResponseCheck;
/* 
import React, { userState, useRef } from 'react';

const ResponseCheck = () => {
  const [state, setState] = userState('waiting');
  const [message, setMessage] = userState('클릭해서 시작하세요.');
  const [result, setResult] = userState([]);
  //useState와 useRef와 또다른 차이점**
  //state를 변경하면 render가 자동으로 실행되는데, useRef를 사용하면 실행되지않는다.(화면에는 영향을 미치게하고 싶지않을때)
  //this를 대신해서 useRef를 사용하게된다.
  //useRef의 다른 사용 방법
  const timeout = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  const onClickScreen = () => {
    const { state, message, result } = this.state;
    if (state === 'waiting') {
      setState('ready');
      setMessage('초록색이 되면 클릭하세요');
      timeout.current = setTimeout(() => {
        setState('now');
        setMessage('지금 클릭');
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000); // 2~3초후에 settimeouts
    } else if (state === 'ready') {
      clearTimeout(timeout.current);
      setState('waiting');
      setMessage('너무 성급하시군요! 초록색이 된후에 클릭하세요!');
    } else if (state === 'now') {
      endTime.current = new Date();
      setState('waiting');
      setMessage('클릭해서 시작하세요!');
      setResult((prevState) => {
        return [...prevState.result, endTime.current - startTime.current];
      });
    }
  };
  const onReset = () => {
    setResult([]);
  };

  const renderAverage = () => {
    return result.length === 0 ? null : (
      <>
        <div>평균 시간 : {result.reduce((a, c) => a + c) / result.length}ms</div>
        <button onClick={onReset}></button>
      </>
    );
  };
  return (
    <>
      <div id="screen" className={state} onClick={onClickScreen}>
        {message}
      </div>

      {renderAverage()}
    </>
  );
}; */

/* {{(() =>{
                if(result.length === 0){
                    return null;
                } else{
                    return <>
                        <div>평균 시간 : {result.reduce((a,c) => a + c) / result.length}ms</div>
                        <button onClick={onReset}></button>
                    </>
                }
            })()} } */
