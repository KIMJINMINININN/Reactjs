import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
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

const Lotto = () => {
  //useMemo 사용, 두번째 인자가 변경되면 getWinNumbers가 실행되게된다.
  //useMemo : 복잡한 함수 결괏값을 기억(hooks는 함수컴포넌트 전체가 재실행되는데 이러한 비효율적인 부분을 대비해서 값을 기억해두면 훨신 효율적)
  //useRef : 일반 값을 기억
  //useCallback : useMemo는 return 값을 기억하는것인데, useCallbakc은 함수 자체를 기억하는방법
  const lottoNumbers = useMemo(() => getWinNumbers(), []);
  const [winBalls, setWinBalls] = useState([]);
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

  useEffect(() => {
    // componentDidMount, componentDidUpdate 역할을 한다(두개를 합쳐놨다라고 생각한다)
    console.log('useEffect');
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevBallas) => {
          return [...prevBallas, winNumbers[i]];
        });
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);
    return () => {
      // componentWillUnMount의 역활을 한다
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      });
    };
  }, [timeouts.current]);
  //두번째 인자가 빈배열이면 componentDidMount, 두번째의 조건이 맞다면 componentDidUpdate까지 둘다 수행해주는
  //useCallback 함수 자체를 기억해두어서 hooks의 함수컴포넌트가 모두 재실행된다 할지라도, 함수를 기억해서 그 함수를 다시 만들어주지 않아도된다.
  const onClickRedo = useCallback(() => {
    console.log(winNumbers);
    //단점은 state를 이전의 처음것을 기억한다.
    //state를 사용하기위해서는 두번째 인자에 값을 넣어줘야 변경되었을때 새로운 데이터를 가져올수가 있다.
    //자식 컴포넌트에 props 함수로 전달해줄때는 useCallback을 꼭 사용하여서 전달하여야한다.
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  }, [winNumbers]);

  return (
    <>
      <div>당첨 숫자</div>
      <div id="결과창">
        {winBalls.map((v) => (
          <Ball key={v} number={v} />
        ))}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus} onClick={onClickRedo} />}
      {redo && <button onClick={redo ? onClickRedo : () => {}}>한 번 더!</button>}
    </>
  );
};

export default Lotto;
