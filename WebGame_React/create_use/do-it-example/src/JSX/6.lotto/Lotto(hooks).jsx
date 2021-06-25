import React, { useState, useRef, useEffect} from 'react';
import Ball from './Ball';

function getWinNumbers(){
    console.log("getWinNumbers");
    const candidate = Array(45).fill().map((v, i) => i + 1);
    console.log("candidate : ", candidate)
    const shuffle = [];
    while(candidate.length > 0){
        // candidate안에 있는 값들중 하나만을 선택해서 shuffle 이라는 list에 입력해준다<div className=""></div>
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    //shuffle은 값들을 그냥 섞었는거
    console.log("shuffle : ", shuffle);
    //그중 보너스 숫자는 마지막꺼 하나를 가져가고
    const bonusNumber = shuffle[shuffle.length - 1];
    //섞은 shuffle에서 6개 숫자만을 반환(오름차순으로 정렬)
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    
    console.log("winNumbers : ", winNumbers);
    // return [winNumbers, bonusNumber];
    return [...winNumbers, bonusNumber];
}

const Lotto = () => {
    const [winNumbers, setWinNumbers] = useState(getWinNumbers());
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);

    useEffect(() => { // componentDidMount, componentDidUpdate 역할을 한다(두개를 합쳐놨다라고 생각한다)
        console.log("useEffect");
        for( let i = 0; i < winNumbers.length - 1; i++){
            timeouts.current[i] = setTimeout(() => {
                setWinBalls((prevBallas) => {
                    return (
                        [...prevBallas, winNumbers[i]]
                    )
                })
            },(i + 1) * 1000);
        }
        timeouts.current[6] = setTimeout( () => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7000)
        return () => { // componentWillUnMount의 역활을 한다
            timeouts.current.forEach((v) => {
                clearTimeout(v);
            });
        }
    }, [timeouts.current]);
    //두번째 인자가 빈배열이면 componentDidMount, 두번째의 조건이 맞다면 componentDidUpdate까지 둘다 수행해주는

    const onClickRedo = () => {
        setWinNumbers(getWinNumbers())
        setWinBalls([])
        setBonus(null)
        setRedo(false)
        timeouts.current = [];
    };

    return (
    <>
        <div>당첨 숫자</div>
        <div id="결과창">
            {winBalls.map((v) => <Ball key={v} number={v} />)}
        </div>
        <div>보너스!</div>
        {bonus && <Ball number={bonus} />}
        {redo && <button onClick={redo ? onClickRedo : () => {}}>한 번 더!</button>}
    </>
    );
}

export default Lotto;