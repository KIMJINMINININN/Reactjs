import React, {useRef, useState, useEffect} from 'react';

const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px',
};

const scores = {
    가위: 1,
    바위: 0,
    보: -1,
};

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function(v){
        return v[1] === imgCoord;
    })[0];
}


//첫번째 랜더링 : 클래스의 경우 -> constructor -> render -> ref -> componentDidMount 
//[(setState/props) 바뀔때 : shouldComponentUpdate(true) -> render -> componentDidUpdate] 
//소멸할때 componentWillUnmount -> 소멸
const RSP = () => {
    const [result, setResult] = useState('');
    const [imgCoord, setImgCoord] = useState(rspCoords.바위);
    const [score, setScore] = useState(0);
    const interval = useRef(null);

    //useEffect는 각각 두번째 인수에 다른것을 넣어서 많이 만들수도있다.(각자 다른 Effect를 사용하고싶을때)
    useEffect(() => { // componentDidMount, componentDidUpdate 역할을 한다(두개를 합쳐놨다라고 생각한다)
        console.log("실행");
        interval.current = setInterval(changeHand, 100);
        return () => { // componentWillUnMount의 역활을 한다
            console.log("종료");
            clearInterval(interval.current)
        }
    }, [imgCoord]);// 두번째 인수 배열에 넣은값(imgCoord)들이 바뀔때 useEffect가 실행된다.
    
    // }, []);
    const changeHand = () => {
        if(imgCoord === rspCoords.바위){
            setImgCoord(rspCoords.가위)
        } else if (imgCoord === rspCoords.가위){
            setImgCoord(rspCoords.보)
        } else if (imgCoord === rspCoords.보){
            setImgCoord(rspCoords.바위)
        }
    }

    //() => () => 이런식으로 넣어줄수있다.(react pattern)
    const onClickBtn = (choice) => (e) => {
        //잠깐 멈추고
        clearInterval(interval.current)
        //점수 계산후
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if(diff === 0){
            setResult('비겼습니다.!')
        } else if([-1, 2].includes(diff)){
            setResult('이겼습니다.!')
            setScore((prevScore) => {
                return (
                    prevScore + 1
                )
            })
        } else{
            setResult('졌습니다!')
            setScore((prevScore) => {
                return (
                    prevScore - 1
                )
            })
        }
        setTimeout(() => {
            interval.current = setInterval(changeHand, 100);
        }, 1000)
        //다시 손 움직일수있도록
    };

    return (
        <>
           <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}} />
           <div>
               <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
               <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
               <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
           </div>
           <div>{result}</div>
           <div>현재 {score}점</div>
        </>
    );
}

export default RSP;