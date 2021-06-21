import React, {Component} from 'react';

class ResponseCheck extends Component {
    state = {
        state: 'waiting',
        message: '클릭해서 시작하세요.',
        result: [],
    };

    onClickScreen = () => {
        const { state, message, result } = this.state;
        if(state === 'waiting'){
            this.setState({
                state: 'ready',
                message: '초록색이 되면 클릭하세요',
            });
            setTimeout(() => {
               this.state({
                   state: 'now',
                   message: '지금 클릭'
               }) 
            }, Math.floor(Math.random() * 1000) + 2000);
        } else if ( state === 'ready'){

        } else if ( state === 'now'){
            
        }
    }

    renderAverage = () => {
        const { result } = this.state;
        //삼항 연사자를 이용해서 if를 사용하기
        return(
            this.state.result.length !== 0 ? null : <div>평균 시간 : {this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms</div>
        )
    };

    render(){
        return(
            <>
                <div id="screen" className={this.state.state} onClick={this.onClickScreen}>
                    {this.state.message}
                </div>
                {this.renderAverage()}
            </>
        )
    }
}

export default ResponseCheck;