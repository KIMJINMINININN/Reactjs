import React, { Component, createRef } from 'react';
import Try from './Try';

//숫자 뽑기 함수
function getNumbers() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

class NumberBaseball extends Component {
  state = {
    result: '',
    value: '',
    answer: getNumbers(),
    tries: [],
  };

  onSubmitForm = (e) => {
    // const { result, value, tries, answer } = this.state;
    e.preventDefault();
    if (this.state.value === this.state.answer.join('')) {
      this.setState((prevState) => {
        return{
          result: '홈런!',
          tries: [...prevState.tries, { try: this.state.value, result: '홈런!' }],
        }
      });
      alert('게임을 다시 시작합니다!');
      //초기화
      this.setState({
        value: '',
        answer: getNumbers(),
        tries: [],
      });
      this.inputRef.current.focus();
    } else {
      //답이 틀렷을때
      const answerArray = this.state.value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (this.state.tries.length >= 9) {
        //10번 이상 틀렸을때
        this.setState({
          result: `10번 넘게 틀려서 실패! 답은 ${this.state.answer.join(',')}였습니다!`,
        });
        alert('게임을 다시 시작합니다!');
        //초기화
        this.setState({
          value: '',
          answer: getNumbers(),
          tries: [],
        });
        this.inputRef.current.focus();
      } else {
        //10번 이하로 틀렸을때
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === this.state.answer[i]) {
            //정답일때는 strike +1
            strike += 1;
          } else if (this.state.answer.includes(answerArray[i])) {
            //오답일때는 ball +1
            ball += 1;
          }
        }
        //기회알려주기
        this.setState((prevState) => {
          return {
            tries: [
            ...this.state.tries,
            { try: this.state.value, result: `${strike} 스트라이크 , ${ball} 볼입니다.` },
          ],
          value: '',
          }
        });
        this.inputRef.current.focus();
      }
    }
    console.log(this.state.value);
  };

  onChangeInput = (e) => {
    this.setState({
      value: e.target.value,
    });
  };
  //inputref
  inputRef = createRef();

  // onInputRef = (c) => {this.inputRef = c; }
  // 위의 것을 사용할때에는 함수를 사용하여 자유도가 있다.

  render() {
    const { result, value, tries } = this.state;
    return (
      <>
        <h1>{result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input ref={this.inputRef} maxLength={4} value={value} onChange={this.onChangeInput} />
        </form>
        <div>시도 : {tries.length}</div>
        <ul>
          {tries.map((v, i) => {
            return <Try key={`${i + 1}차 시도 : `} tryInfo={v} />;
          })}
        </ul>
      </>
    );
  }
}

export default NumberBaseball;

/* 
import React, { useState } from 'react';
import Try from './Try';

//숫자 뽑기 함수
function getNumbers() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

const NumberBaseball = () => {
  const [result, setResult] = useState('');
  const [value, setValue] = useState('');
  const [answer, setAnswer] = useState(getNumbers());
  const [tries, setTries] = useState([]);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (value === answer.join('')) {
      setResult('홈런');
      //옛날 Try로 새로운 try를 만들때는 함수형으로 (prev)를 붙여서 만들어준다.
      setTries((prevTries) => {
        return [...prevTries, { try: value, result: '홈런!' }];
      });
      alert('게임을 다시 시작합니다!');
      //초기화
      setValue('');
      setAnswer(getNumbers());
      setTries([]);
    } else {
      //답이 틀렷을때
      const answerArray = value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        //10번 이상 틀렸을때
        setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`);
        alert('게임을 다시 시작합니다!');
        //초기화
        setValue('');
        setAnswer(getNumbers());
        setTries([]);
        inputEl.current.focus();
      } else {
        //10번 이하로 틀렸을때
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === answer[i]) {
            //정답일때는 strike +1
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            //오답일때는 ball +1
            ball += 1;
          }
        }
        //기회알려주기
        setTries((prevTries) => {
          return [...prevTries, { try: value, result: `${strike} 스트라이크 , ${ball} 볼입니다.` }];
        });
        setValue('');
        inputEl.current.focus();
      }
    }
    console.log(value);
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };
  //Hooks를 사용할때는 Render가 필요없다.
  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input maxLength={4} value={value} onChange={onChangeInput} />
      </form>
      <div>시도 : {tries.length}</div>
      <ul>
        {tries.map((v, i) => {
          return <Try key={`${i + 1}차 시도 : `} tryInfo={v} />;
        })}
      </ul>
    </>
  );
};

export default NumberBaseball;
 */