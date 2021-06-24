import React, {Component} from 'react';

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
class RSP extends Component {
    state = {
        result: '',
        imgCoord: rspCoords.바위,
        score: 0,
    };

    interval;
    //render가 성공적으로 실행됬다면, componentDidMount이 실행되게된다.
    componentDidMount(){ //컴포넌트가 첫 렌더링한 후 -> 비동기 요청을 많이하게된다
        this.interval = setInterval(this.changeHand, 100);
    }

    componentDidUpdate(){ // Rerendering이 될때

    }

    componentWillUnmount(){ //컴포넌트 제거되기 직전 -> 비동기 요청을 정리를 많이하게된다.
        clearInterval(this.interval)
    }

    changeHand = () => {
        const {imgCoord} = this.state;
        if(imgCoord === rspCoords.바위){
            this.setState({
                imgCoord: rspCoords.가위,
            });
        } else if (imgCoord === rspCoords.가위){
            this.setState({
                imgCoord: rspCoords.보,
            });
        } else if (imgCoord === rspCoords.보){
            this.setState({
                imgCoord: rspCoords.바위,
            });
        }
    }
    //() => () => 이런식으로 넣어줄수있다.(react pattern)
    onClickBtn = (choice) => (e) => {
        //잠깐 멈추고
        clearInterval(this.interval)
        //점수 계산후
        const {imgCoord} = this.state;
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if(diff === 0){
            this.setState({
                result : '비겼습니다.!',
            })
        } else if([-1, 2].includes(diff)){
            this.setState((prevState) => {
                return{
                    result: '이겼습니다.!',
                    score:  prevState.score + 1,
                };
            })
        } else{
            this.setState((prevState) => {
                return {
                    result: '졌습니다!',
                    score: prevState.score - 1,
                }
            })
        }
        setTimeout(() => {
            this.interval = setInterval(this.changeHand, 100);
        }, 1000)
        //다시 손 움직일수있도록
        
    };

    render(){
        //imgCoord : 0 -142 -284로 이미지 나눠짐
        const { result, score, imgCoord} = this.state;
        return (
            <>
               <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}} />
               <div>
                   <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
                   <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
                   <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
               </div>
               <div>{result}</div>
               <div>현재 {score}점</div>
            </>
        );
    }
}

export default RSP;