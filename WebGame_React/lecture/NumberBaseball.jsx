import React, {Component} from 'react';
import Try from './Try'
function getNumbers(){

}

class NumberBaseball extends Component {
    state = {
        result : '',
        value : '',
        answer : getNumbers(),
        tries : [],
    };

    onSubmitForm = (e) => {

    }

    onChangeInput = (e) => {

    }

    fruits = [
        {fruit: '사과', taste: '맛있다'},
        {fruit: '감', taste: '맛있다'},
        {fruit: '귤', taste: '맛있다'},
        {fruit: '밤', taste: '맛있다'},
        {fruit: '배', taste: '맛있다'},
        {fruit: '무', taste: '맛있다'},
        {fruit: '사과', taste: '맛있다'},
    ]
    render(){
        return (
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
                </form>
                <div>시도 : {this.state.tries.length}</div>
                <ul>
                    {this.fruits.map( (v, i) => {
                        return (
                            <Try v={v} i={i} />
                        );
                    })}
                </ul>
            </>
        )
    }
}

export default NumberBaseball