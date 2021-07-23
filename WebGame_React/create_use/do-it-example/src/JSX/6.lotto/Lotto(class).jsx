import React, { Component } from 'react';
import Ball from './Ball';

function getWinNumbers() {
  console.log('getWinNumbers');
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  console.log('candidate : ', candidate);
  const shuffle = [];
  while (candidate.length > 0) {
    // candidate안에 있는 값들중 하나만을 선택해서 shuffle 이라는 list에 입력해준다<div className=""></div>
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  //shuffle은 값들을 그냥 섞었는거
  console.log('shuffle : ', shuffle);
  //그중 보너스 숫자는 마지막꺼 하나를 가져가고
  const bonusNumber = shuffle[shuffle.length - 1];
  //섞은 shuffle에서 6개 숫자만을 반환(오름차순으로 정렬)
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);

  console.log('winNumbers : ', winNumbers);
  // return [winNumbers, bonusNumber];
  return [...winNumbers, bonusNumber];
}

class Lotto extends Component {
  state = {
    winNumbers: getWinNumbers(), //당첨 숫자들
    winBalls: [],
    bonus: null, //보너스 공
    redo: false,
  };

  timeouts = [];

  runTimeouts = () => {
    const { winNumbers } = this.state;
    console.log('timeouts : ', this.timeouts);
    for (let i = 0; i < winNumbers.length - 1; i++) {
      this.timeouts[i] = setTimeout(() => {
        this.setState((prevState) => {
          return {
            // winBalls: [winNumbers[i]], 해당하는 state에서는 이전값을 넣어주지 않으면
            // 새로운 값만 계속해서 들어가고 예전값은 입력이 되지않는다.
            winBalls: [...prevState.winBalls, winNumbers[i]],
          };
        });
      }, (i + 1) * 1000);
    }
    this.timeouts[6] = setTimeout(() => {
      this.setState({
        bonus: winNumbers[6],
        //한번더 버튼 true or false
        redo: true,
      });
    }, 7000);
  };

  componentDidMount() {
    this.runTimeouts();
    // }, (winNumbers.length) * 1000)
  }
  componentDidUpdate(prevProps, prevState) {
    //조건문이 없다면 update 될때마다 어떠한 작업이 계속될태니 조심
    if (this.state.winBalls.length === 0) {
      this.runTimeouts();
    }
    // this.runTimeouts()
  }

  componentWillUnmount() {
    this.timeouts.forEach((v) => {
      clearTimeout(v);
    });
  }

  onClickRedo = () => {
    this.setState({
      winNumbers: getWinNumbers(), //당첨 숫자들
      winBalls: [],
      bonus: null, //보너스 공
      redo: false,
    });
    this.timeouts = [];
  };

  render() {
    const { winBalls, bonus, redo } = this.state;
    return (
      <>
        <div>당첨 숫자</div>
        <div id="결과창">
          {winBalls.map((v) => (
            <Ball key={v} number={v} />
          ))}
        </div>
        <div>보너스!</div>
        {bonus && <Ball number={bonus} />}
        {redo && <button onClick={redo ? this.onClickRedo : () => {}}>한 번 더!</button>}
      </>
    );
  }
}

export default Lotto;
