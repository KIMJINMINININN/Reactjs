import React, {useState, useRef, createRef} from 'react';

const ResponseCheck = () => {
  const [state, setState] = useState('waiting')
  const [message, setMessage] = useState('클릭해서 시작하세요.')
  const [result, setResult] = useState([]);

  let startTime = createRef();
  let endTime = createRef();
  let timeout = '';

  let onClickScreen = () => {
    if(state === 'waiting'){
      setState('ready')
      setMessage('초록색이 되면 클릭하세요')
      timeout = setTimeout(() => {
        setState('now')
        setMessage('지금 클릭')
        startTime = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (state === 'ready'){
      clearTimeout(timeout);
      setState('waiting')
      setMessage('너무 성급하시군요! 초록색이 된후에 클릭하세요!')
    } else if (state === 'now'){
      endTime = new Date();
      setState('waiting')
      setMessage('클릭해서 시작하세요!')
      setResult((prevResult) => {
          return([...prevResult, endTime - startTime])
      })
    }
  }

  let onReset = () => {
    setResult([])
  };

  let renderAverage = () => {
    return result.length === 0 ? null : (
      <>
        <div>평균시간 : {result.reduce((a, c) => a + c) / result.length}ms</div>
        <button onCLick={this.onRest}>리셋</button>
      </>
    )
  }
  return(
    <>
        <div id="screen" className={state} onClick={onClickScreen}>
          {message}
        </div>
        {renderAverage()}
      </>
  )
}

export default ResponseCheck;
/* import React, {Component} from 'react';

class ResponseCheck extends Component {
  state = {
    state: 'waiting',
    message: '클릭해서 시작하세요.',
    result: []
  }

  // timeout;
  startTime;
  endTime;


  onClickScreen = () => {
    const {state, message, result} = this.state;
    if(state === 'waiting'){
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
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (state === 'ready'){
      clearTimeout(this.timeout);
      this.setState({
        state: 'waiting',
        message: '너무 성급하시군요! 초록색이 된후에 클릭하세요!'
      });
    } else if (state === 'now'){
      this.endTime = new Date();
      this.setState((prevState) => {
        console.log("prevState : ", prevState)
        console.log("state : ", this.state)
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
    })
  };

  renderAverage = () => {
    const { result } = this.state;
    console.log("@@@@result : ", result)
    return result.length === 0 ? null : (
      <>
        <div>평균시간 : {result.reduce((a, c) => a + c) / result.length}ms</div>
        <button onCLick={this.onRest}>리셋</button>
      </>
    )
  }

  render(){
    return(
      <>
        <div id="screen" className={this.state.state} onClick={this.onClickScreen}>
          {this.state.message}
        </div>
        {this.renderAverage()}
      </>
    );
  }
}

export default ResponseCheck; */