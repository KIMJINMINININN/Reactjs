import React, { Component, createRef} from 'react';
import Try from './Try'


//랜덤으로 값 가져오기
function getNumbers(){
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for(let i = 0; i < 4; i += 1){
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

class NumberBaseball_copy extends Component {
  //데이터를 저장할 state
  state = {
    result: '',
    value: '',
    answer: getNumbers(), // 랜덤값들 가져오기
    tries: [],
  }

  //inputref
  inputRef = createRef();

  onSubmitForm = (e) => {
    e.preventDefault();
    if(this.state.value === this.state.answer.join('')){
      //만약 입력값이 같을경우
      //setState로 state의 값을 변경해주기 prevState를 이용해서 이전값들 넣고 값 추가
      this.setState((prevState) => {
        return {
          result: '홈런',
          tries: [...prevState.tries, { try: this.state.value, result: '홈런!'}],
        }
      });
      //게임을 종료후 초기화 작업
      alert('게임을 다시 시작합니다!');
      this.setState({
        value: '',
        answer: getNumbers(),
        tries: [],
      });
      this.inputRef.current.focus();
    } else{
      const answerArray = this.state.value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if(this.state.tries.length >= 9){
        //10번 이상 틀려서 게임을 종료해야할때
        this.setState({
          result: `10번 넘게 틀려서 실패! 답은 ${this.state.answer.join(',')}였습니다!`,
        })
        alert('게임을 다시 시작합니다!');
        this.setState({
          value: '',
          answer: getNumbers(),
          tries: [],
        })
        this.inputRef.current.focus();
      } else{
        // 정답이 자릿수와 답이 같다면 strike +1 위치가 다르다면 ball +1
        for(let i = 0; i < 4; i += 1){
          if(answerArray[i] === this.state.answer[i]){
            strike += 1;
          } else if(this.state.answer.includes(answerArray[i])){
            ball += 1;
          }
        }
        this.setState((prevState) => {
          return {
            tries: [
              ...this.state.tries,
              { try: this.state.value, result: `${strike} 스트라이크, ${ball} 볼입니다.`}
            ],
            value: '',
          }
        });
        this.inputRef.current.focus();
      }
    }
    console.log(this.state.value);
  }

  onChangeInput = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const {result, value, tries} = this.state
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

export default NumberBaseball_copy;