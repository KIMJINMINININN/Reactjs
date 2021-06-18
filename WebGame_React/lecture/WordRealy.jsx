//-------------------------------------------------------------------------------------------
//# Class를 사용해서 React 구성하기

// const React = require('react');
// const { Component } = React;
// // 컴포넌트 파일을 쪼개서 사용하는경우 위의 것들을 적어줘야한다.
// // Import React 하는거랑 비슷한거인듯

// class WordRealy extends React.Component{
//     state = {
//         word: '김진민3',
//         value: '',
//         result: '',
//     };

//     onSumbitForm = (e) => {
//         e.preventDefault();
//         if(this.state.word[this.state.word.length - 1] === this.state.value[0]){
//             this.setState({
//                 result: '딩동댕',
//                 word: value,
//                 value: '',
//             })
//             this.input.focus();
//         }else{
//             this.setState({
//                 result: '땡',
//                 value: ''
//             })
//             this.input.focus();
//         }
//     };

//     onChangeInput = (e) => {
//         this.setState({ value : e.target.value });
//     };

//     input;

//     onRefInput = (c) => {
//         this.input = c;
//     }

//     render(){
//         return (
//         <>
//             <div>{this.state.word}</div>
//             <form onSumbit={this.onSumbitForm}>
//                 {/* value와 onChange는 세트이다. */}
//                 <input ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput} />
//                 <button>입력!</button>
//             </form>
//             <div>{this.state.result}</div>
//         </>
//         )
//     }
// }
// // Component를 exports 해주기 
// module.exports = WordRealy;

//-------------------------------------------------------------------------------------------
//# Hooks를 사용해서 React 구성하기

const React = require('react');
const {useState, useRef } = React;
// 컴포넌트 파일을 쪼개서 사용하는경우 위의 것들을 적어줘야한다.
// Import React 하는거랑 비슷한거인듯

const WordRealy = () => {
    const [ word, setWord] = useState('김진민');
    const [ value, setValue] = useState('');
    const [ result, setResult] = useState('');
    const inputRef = useRef(null);

    const onSumbitForm = (e) => {
        e.preventDefault();
        if(word[word.length - 1] === value[0]){
            setResult('딩동댕');
            setWord(value);
            setValue('');
            inputRef.current.focus();
        }else{
            setResult('땡');
            setValue('');
            inputRef.current.focus();
        }
    };

    const onChangeInput = (e) => {
        setValue(e.target.value)
    };

    return (
    <>
        <div>{word}</div>
        <form onSubmit={onSumbitForm}>
            {/* value와 onChange는 세트이다. */}
            <input ref={inputRef} value={value} onChange={onChangeInput} />
            <button>입력!</button>
        </form>
        <div>{result}</div>
    </>
    )
}
// Component를 exports 해주기 
module.exports = WordRealy;
