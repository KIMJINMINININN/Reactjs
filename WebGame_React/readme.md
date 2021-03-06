# React

React.createClass -> Class -> Hooks

## React를 사용하는 이유

Single Page Application

1. 사용자 경험이 좋아진다.
2. 재사용 컴포넌트
3. 데이터 - 화면 일치

```
<script>
    const e = React.createElement;

    class LikeButton extends React.component{
        constructor(props){ //생성자
            super(props)
        }

        render(){
            return e('button', null, 'Like'); //<button>Like</button> 이 tag를 만들겠다.
        }
    }
</script>
<script>
    ReactDOM.render(e(LikeButton), document.querySelector('#root')); //위에서 만들 element를 여기에서 그리겠다
</script>
```

## State

바뀔 여지가 있는 부분(State)라고 한다.

```
    this.state = {
        liked: false,
    };
    this.setState({ like : true });
    //데이터를 변경해주기만하면 화면이(render)가 변경이된다. React가 자동으로 변경시켜줌
```

### setState

- 참고!!! setState는 비동기이다!
  setState를 해서 state를 변경시켜주면 render가 재실행 되게된다.

```
this.setState((prevState) => { //이전값 prevState을 가지고 새로운 State를 반환한다.
                        return {
                            first: Math.ceil(Math.random() * 9),
                            second: Math.ceil(Math.random() * 9),
                            value: '',
                            result: '정답',
                            print_value: '정답 : ' + prevState.value
                        }
                    })
```

## babel 사용 이유

javascript 안에 또한 최신문법 사용하여야했다.

```
<div id="root"></div>
<script type="text/babel">
    class LikeButton extends React.component{
        constructor(props){ //생성자
            super(props);
            this.state = {
                liked: false,
            };
        }

        render(){ //화면 반영
            return <button type="submit" onClick={() => { this.setState({ like : true })}}>Like</button>
            // return e('button', {onClick: () => { this.setState({ like : true })}, type: 'submit'}, this.state.liked === true ? 'Liked' : 'Like'); //<button>Like</button> 이 tag를 만들겠다.
        }
    }
</script>
<script type="text/babel">
    ReactDOM.render(<LikeButton />, document.querySelector('#root')); //그리겠다
</script>
```

## JSX

javascript + XML
<LikeButton />
{}로 감싸주면 {}안에 javascript를 사용할수있다.

```
 render(){ //화면 반영
                return
                    <button type="submit" onClick={() => { this.setState({ like : true })}}>{this.state.liked === true ? 'Liked' : 'Like'}</button>
                // return e('button', {onClick: () => { this.setState({ like : true })}, type: 'submit'}, this.state.liked === true ? 'Liked' : 'Like'); //<button>Like</button> 이 tag를 만들겠다.
        }
```

## 컴포넌트

컴포넌트를 사용하면 한가지를 만들어두면, 여러개를 쉽게 추가를 시킬수있다.

`React를 사용할때에 JSX와 복잡한 javascript를 왠만해선 섞어서 쓰지 않게 하기위해서 아래와 같이 따로 만들어서 사용하는것을 추천.`

직접 만든함수들은 => 함수로 사용하여야한다.

```
onSubmit = (e) => {
    ...
            }
<form onSubmit={this.onSubmit}>
</form>
```

위와 같이 => 사용하지 않고싶다면,
아래와 같이 생성자 함수와, 내부의 함수에서 .bind 함수를 사용해주어야
그냥 function()을 가지고 함수를 만들어줄수있다.
=> 함수를 해주는것이 .bind(this)를 해주는것과 같다.

```
constructor(props){
    super(props);
    this.state = {
        ...
    }
    this.onSubmit = this.onSubmit.bind(this);
}

onSubmit = function(e) {
    ...
}
```

여러개를 쉽게 추가해서 사용할수있지만, 각각의 State는 구분되어서 사용되어진다.
즉, 컴포넌트의 형식만 재대로 작성해서 적어준다면, 그 컴포넌트를 여러개를 각각 사용할수있다는 장점!!

```
<div><GuGuDan />, <GuGuDan />, <GuGuDan /></div>
```

## Fragment

Component안에 최상단에는 항상 div로 감싸줬어야했다. 이것으로인해 하나의 div를 삭제해주고

```
<div>
</div>
```

비어있는 Fragment를 넣어주면 된다. 두가지다 같다

```
<React.Fragment>   -> <>
<React.Fragment/>  -> </>
```

## ref

ref를 가지고 html에 해당하는 document.querySelector()와 같은 그부분을 가져올수있다.
아래에서는 특정 이벤트를 실행시키기 위해서 아래의 부분을 가져가있다.
참조값을 걸어준다고 생각하면됨, reference

```
<input ref={this.Refinput} type="number" value={this.state.value} onChange={this.onChange} />
```

---

# Hooks

## 함수형 컴포넌트

setState와 ref같은것을 사용하지 않을때에 함수형 컴포넌트를 사용할수있는데,

```
const GuGuDan = () =>{
            return <div>Hello, Hooks</div>
        }
```

`함수형 컴포넌트에서도 여기에서도 setState ref 기능을 추가해서 사용하는것을 Hooks로 사용할수있다.`

- Hooks를 사용하지 않은경우

```
this.setState((prevState) => { //이전값 prevState을 가지고 새로운 State를 반환한다.
                        return {
                            first: Math.ceil(Math.random() * 9),
                            second: Math.ceil(Math.random() * 9),
                            value: '',
                            result: '정답 : ' + prevState.value,
                        }
                    })
```

- Hooks를 사용한경우(react에서 추천)

```
    const [first, setFirst] = React.useState(Math.ceil(Math.random() * 9 ));
    const [second, setsecond] = React.useState(Math.ceil(Math.random() * 9 ));
    const [value, setvalue] = React.useState('');
    const [result, setresult] = React.useState('');
    const inputRef = React.useRef(null);

    //Hooks에서 setstate를 아래와같이 사용할수도있다
    setResult((prevResult) => {
                        return '정답 :' + value
                    })

    //ref를 사용할때는 current를 붙여주기!
    inputRef.current.focus();
```

class -> className
for -> htmlFor

```
<button id="button" className="" htmlFor>입력</button>
```

## WebPack

npm init
npm i react react-dom : react, react dom install
npm install -D webpack : webpack 설치
npm i -D webpack-cli : webpack-cli 설치
-> npm i react-refresh @pmmmwh/react-refresh-webpack-plugin -D
-> npm i -D webpack-dev-server

- create-react-app을 수동으로 설정하는 방법

webpack.config.js - webpack 설정

- index.html
  `html에서는 app.js라는 파일하나만을 인식할수가있다`
  그래서 이럴때 webpack이 필요한것

```
<!DOCTYPE html>
<html lang="en">
<head>
    <title>끝말잇기</title>
</head>
<body>
    <div id="root"></div>
    <script src="./dist/app.js"></script>
</body>
</html>
```

- webpack.config.js
  module.exports = {
  name: 'wordrealy-setting',
  mode: 'development', // 실서비스 : production
  };

npm i -D @babel/core
npm i @babel/preset-env
npm i @babel/preset-react
npm i babel-loader

webpack을 실행을 했을경우 webpack.config.js를 사용하여서 빌드하여 app.js를 만들게된다.

### value와 onChange는 세트!

## webpack devServer

- \*\*변경이 됬는지 안됬는지 인식할수 있는 Option( 기존 데이터 유지하면서 Reloading을 하는지 안하는지!!!)
  기존의 Reloading과 다른점이 무엇인가!?

```
devServer: {
        //dist안에 되어있는것을 서버로 실행
        publicPath: '/dist/',
        //변경이 됬는지 안됬는지 인식할수 있는 Option( 기존 데이터 유지하면서 Reloading을 하는지 안하는지***)
        hot: true,
        //server의 포트 번호 설정
        port: 3000
    }
```

//------------------------------------------------------------------------------------------------------------

## import export

export default는 한번만 사용이 가능하고
export 변수는 많은것들이 export가 가능하다

//common.js
module.exports = a;
//es5 문법
export default a;
export const a;
두개는 호환이 된다고 생각하면 된다.
node의 문법을 common.js라고 부른다

.jsx에서 webpack을 사용하여서 import를 사용하면 되는데
webpack.config.js에서 import를 사용하면 호환이 되지않는다.
이 이유는 babel이 이 호환성을 만들어주기 때문

## React 반복문 Map

```
{['바나나', '포도', '사과', '딸기', '귤'].map( (v) => {
                        return (
                            <li>{v}</li>
                        );
                    })}
```

//바나나
//포도
//사과
//딸기
//귤
과같이 나타나게 된다.
javascript 의 Map함수를 사용하여서 React에 적용한 예제

### React key

고유한 key값을 가져와서 반복문안에 넣어야한다.

```
<li key={v.fruit + v.taste}><b>{v.fruit}</b> - {v.taste}</li>
```

- 주의할점
  key의 역활은 성능의 최적화를 위해서 사용하는것인데,

```
map( (v, i) => {
                return (
                    <li key={i}><b>{v.fruit}</b> - {v.taste}</li>
                );
            })
```

아래와 같이 i를 가지고 key를 만들어줄경우, react에서 key를 가지고 엘리먼트 추가하거나
수정 삭제시 판단을 하는데 배열의 순서가 바뀌면 문제가 생길수있다.
즉 이러한 방법을 가지고 사용을 해서는 안된다.

## React Props

가독성, 성능최적화 등을 위해서 Component로 따로 빼게될때에
Data를 넘겨주기위해서 Props를 사용하게된다.
아래와같이 되어있으면 Try 컴포넌트에서는 v, i가 무엇인지 알지못하기 때문에
사용이 Try 컴포넌트에서 사용이 불가능하다.

```
{this.fruits.map( (v, i) => {
                    return (
                        <Try />
                    );
                })}
```

1. 보통은 한컴포넌트에다가 다 적고나서
2. 새로운 컴포넌트를 만들어서
3. Props로 넘기는 과정
   을 만들어서 연습을 하자.
   큰것부터 만들어서 분리해보는 연습ㅎㅎ

- Props를 사용하게되면, 부모 자식 컴포넌트가 형성되게되는데 데이터를 주는쪽이 부모컴포넌트
  받는쪽에 자식 컴포넌트

### React의 주석

`{/* <input maxLength={4} value={this.state.value} onChange={this.onChangeInput} /> */}`

## React의 배열 추가

React의 Render를 하는기준이 예전 state와 현재 state가 달라야 실행이되는데
만약 push만 그냥 해준다면, 그전의 state와 지금 state가 변경이된게 없다고 인식이된다.
그래서 React를 할때는 그냥 push만 하면안되고, 예전함수를 ...arr1로 넣어주고
그다음값을 넣어주어야한다.

ex)

```
      this.setState({
        result: '홈런!',
        tries: [...this.state.tries, { try: this.state.value, result: '홈런!' }],
      });        //...this.state.tries : 옛날것, { try: this.state.value, result: '홈런!' } : 추가할것
```

### 비구조화 할당

```
const { result, value, tries, answer } = this.state;
```

를 사용해서 this.state를 하나씩 다 안쓰고 위에 처럼 만들어줄수있다.

## React Developer Tools

크롬에서 다운로드 받아서 사용

## render()

state, props가 변경되면 React가 불러오게되는데,
아래와 같이 state를 변경하지않고 그냥 setState만 변경하게되어도
render는 호출이 되게된다.

```
    this.setState({});
```

### shouldComponentUpdate

원하는 render 조건을 해주는 방법.

```
shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (this.state.counter !== nextState.counter) { //이전의 counter와 나중의 counter가 변경이될경우
        return true; // render 한다
    }
        return false; // render 안한다
    }
```

## PureComponent

성능개선에 탁월!!!!!! [PureComponent, memo]
`자식 컴포넌트에는 왠만해서는 넣어주는게 좋다. render가 될때 계속 리로딩되니 불필요한 Render가 되기때문`

shouldComponentUpdate를 자동으로 구현해놓은것(PureComponent에서는 shouldComponentUpdate를 XX)
아래와 같이 PureComponent는 간단한 string,number, boolean 같은것들은 확인이 가능하나
object, array같은경우는 확인하기가 어렵다.
또한 array, object의 경우 일반적으로 그냥 push해서 직접넣어주면 render가 안되고
이전의 값들을 ...(전개연산자)로 넣어주고 다음원하는값을 넣어주어야만 이전값과의 비교가
되어서 render를 할수가있다.
\*\* 또한 {[{}]} 이런식으로 너무 복잡하게는 state에 넣지는 말자.

```
state = {
    counter: 0,
    string: "hello",
    number: 1,
    boolean: true,
    object: {},
    array: [],
  };

  onClick = () => {
    <!-- const array = this.state.array;
    array.push(1);
    this.setState({
      array: array,
    }); -->
    this.setState({
        array: [...this.state.array, 1]
    })
  };
```

### Hooks에서 PureComponent, shouldComponentUpdate

Hooks에서는 아래와 같이 사용하게된다.

```
import React, { memo } from 'react';
// 구조분해 사용해서 props를 tryInfo로 바로 전환한후 사용
// Hooks를 사용할때에는 PureComponent도 없고, shouldComponentUpdate도 없기때문에 memo라는것을 사용 Props, state가 바꼈을때만 render
const Try = memo(({ tryInfo }) => {
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  );
});

export default Try;
```

## createRef()

```
import React, { Component, createRef } from 'react';
inputRef = createRef();
<input ref={this.inputRef} maxLength={4} value={value} onChange={this.onChangeInput} />
```

## Context

A -> B -> C -> D -> E -> F -> G
이런식으로 나타날때에 중간 과정을 거치지 않고 A -> G로 곧바로 props나 데이터를 주고싶을때
Context를 사용, 또한 이러한 이류를 가지고 Redux도 사용이 가능하다
props -> context -> redux

---

## JSX의 for과 if

JSX안에서는 for와 if를 사용할수있지만 너무 코드가 더럽게나와서 잘 사용하지 않는다.

삼항연산자 -> JSX의 if절

```
    this.state.result.length !== 0 ? null : <div>평균 시간 : {this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms</div>
```

## ref의 또다른 사용

useState와 useRef와 또다른 차이점\*\*
state를 변경하면 render가 자동으로 실행되는데, useRef를 사용하면 실행되지않는다.(화면에는 영향을 미치게하고 싶지않을때)
this를 대신해서 useRef를 사용하게된다. 화면은 바꾸고싶지않은데 바꾸게 되는값들을 이것으로 사용해서 넣어준다.

- useRef의 다른 사용 방법

```
    const timeout = useRef(null);
    const startTime = useRef();
    const endTime = useRef();
```

## if, for 사용

즉시 실행 함수를 사용해줘야하고, 거의는 사용하지 않는다.
사용해야할떄가 있긴하지만 아주 적은 빈도

- if

```
{{(() =>{
                if(result.length === 0){
                    return null;
                } else{
                    return <>
                        <div>평균 시간 : {result.reduce((a,c) => a + c) / result.length}ms</div>
                        <button onClick={onReset}></button>
                    </>
                }
            })()}}
```

- for

```
{/* {(() => {
            const array = [];
            for (let i =0 ; i < tries.length; i++){
              array.push(<Try key={`${i+ 1}차 시도 :  ${v.try} `} tryInfo={v}/>);
            }
            return array;
          })()} */}
```

## 리액트 라이프사이클

### Class의 라이프사이클

첫번째 랜더링 : 클래스의 경우 -> constructor -> render -> ref -> componentDidMount
[(setState/props) 바뀔때 : shouldComponentUpdate(true) -> render -> componentDidUpdate]
소멸할때 componentWillUnmount -> 소멸

```
    //render가 성공적으로 실행됬다면, componentDidMount이 실행되게된다.
    componentDidMount(){ //컴포넌트가 첫 렌더링한 후 -> 비동기 요청을 많이하게된다

    }

    componentDidUpdate(){ // Rerendering이 될때

    }

    componentWillUnmount(){ //컴포넌트 제거되기 직전 -> 비동기 요청을 정리를 많이하게된다.

    }
```

### Hooks의 라이프사이클 따라하기

Hooks에는 라이프사이클이라는것은 따로 없지만 비슷하게 사용할수있는 기능이 제공된다.

#### userEffect

```
    useEffect(() => { // componentDidMount, componentDidUpdate 역할을 한다(두개를 합쳐놨다라고 생각한다)
            return () => { // componentWillUnMount의 역활을 한다

            }
        }, []);
```

`Hooks를 사용할때는 render가 될때마다 Hooks안에 있는 함수 컴포넌트 전체가 다시 실행된다.`

아래의 코드를 돌리게되면 imgCoord는 0.1초마다 계속 바뀌게 되는데 두번째 인수 배열의 넣은값이 바뀔때에
useEffect가 실행되기 때문에 아래의 console.log을 찍었을때에는
다시실행
종료
가 log로 찍히게된다.

```
useEffect(() => { // componentDidMount, componentDidUpdate 역할을 한다(두개를 합쳐놨다라고 생각한다)
        console.log("다시 실행")
        interval.current = setInterval(changeHand, 100);
        return () => { // componentWillUnMount의 역활을 한다
            console.log("종료")
            clearInterval(interval.current)
        }
    }, [imgCoord]);// 두번째 인수 배열에 넣은값(imgCoord)들이 바뀔때 useEffect가 실행된다.
    }, []); //처음에만 한번 실행되고 그다음부터는 실행하지 않겠다는것을 의미한다.
```

아래와 같은 방법은 꼼수!

- componentDidMount만

```
  useEffct(() => {

    }, [])
```

- componentDidUpdate만
  Hooks에서 componentDidMount는 어쩔수없이 실행이되어야하기때문에 그때는 아무것도 실행이 안되게 만들어주고
  componentDidUpdate에서만 실행될수있도록 만들면 된다
  ```
    const mounted = useRef(false);
    useEffect(() => {
        if(!mounted.current){ //componentDidMount의 실행
            mounted.current = true;
        }
        else{ //compoenntDidUpdate의 실행
        //내가 원하는 로직
        }
    }, [바뀌는값])
  ```

#### useMemo

//useMemo 사용, 두번째 인자가 변경되면 callback함수가 실행되게된다.
//useMemo : 복잡한 함수 결괏값을 기억(hooks는 함수컴포넌트 전체가 재실행되는데 이러한 비효율적인 부분을 대비해서 값을 기억해두면 훨신 효율적)
//useRef : 일반 값을 기억

```
    useMemo(() => callback, []);
```

#### useCallback

//useCallback : useMemo는 return 값을 기억하는것인데, useCallback은 함수 자체를 기억하는방법
//useCallback 함수 자체를 기억해두어서 hooks의 함수컴포넌트가 모두 재실행된다 할지라도, 함수를 기억해서 그 함수를 다시 만들어주지 않아도된다.
//단점은 state를 이전의 처음것을 기억한다.
//state를 내부에서 사용하기위해서는 두번째 인자에 값을 넣어줘야 변경되었을때 새로운 데이터를 가져올수가 있다.

//자식 컴포넌트에 props 함수로 전달해줄때는 useCallback을 꼭 사용하여서 전달하여야한다.

```
    useCallback(() => callback, [])

    const onClickRedo = useCallback(() => {
        console.log(winNumbers);
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];
  }, [winNumbers]);

  {bonus && <Ball number={bonus} onClick={onClickRedo} />}
```

#### Hooks의 Tip!

1.hooks는 선언주거나 실행해주는 순서가 생각보다 중요하다. 2.조건문안에 hooks를 넣으면안되며, 함수나 반복문안에도 어지간해서는 넣지않는게 좋다.
3.useEffect, useCallback 같은것안에서 usestate를 사용해서는 안된다. 4. { useState, useRef, useEffect, useMemo, useCallback } 5가지는 기본이니까 확실하게 알자
5.useEffect는 한번뿐만아니라 여러번 사용할수있다는것을 기억하자.

---

## useReducer 사용

state는 아무도 못건들고 action이 state를 수정할수있는데, 그것을 dispatch로 알린다.
어떻게 바꿀지는 reducer에서 정해둔다.

//state는 비동기라는 사실!! 비동기 State에 따라 어떤것을 처리할때는 useEffect를 사용한다.
//Redux는 동기적으로 State를 변경해주는데, userReducer는 비동기적으로 state를 변경한다.

성능 최적화를 memo를 하고나서 이후에도 최적화를 더해보고싶을때
useMemo로 컴포넌트를 기억해버리는 방법을 시도해볼수도있다.

```
// initialState state와 같은 역활을 하는 useReducer
    const initialState = {
        winner: '',
        turn: 'O',
        tableData: [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ],
        recentCell: [-1, -1],
    };

    // reducer를 사용해서 initialState(state)의 데이터를 변경한다
    const reducer = (state, action) => {
        //action은 reducer의 {type: SET_WINNER, winner: 'O'}를 뜻한다.
        switch (action.type) {
            case SET_WINNER:
            //state.winner = action.winner; 이렇게 하면안된다.

            return {
                ...state,
                winner: action.winner,
            };
        }
    };

    // Reducer 선언해주기(함수안에)
    const [state, dispatch] = useReducer(reducer, initialState);

    // dispatch로 reducer에 전달하기
    dispatch({ type: SET_WINNER, winner: turn });
```

state는 아무도 못건들고 action이 state를 수정할수있는데, 그것을 dispatch로 알린다.
어떻게 바꿀지는 reducer에서 정해둔다.

//state는 비동기라는 사실!! 비동기 State에 따라 어떤것을 처리할때는 useEffect를 사용한다.
//Redux는 동기적으로 State를 변경해주는데, userReducer는 비동기적으로 state를 변경한다.

성능 최적화를 memo를 하고나서 이후에도 최적화를 더해보고싶을때
useMemo로 컴포넌트를 기억해버리는 방법을 시도해볼수도있다.

```
useMemo(
  () => (
    <Td
      key={i}
      rowIndex={rowIndex}
      cellIndex={i}
      cellData={rowData[i]}
      dispatch={dispatch}
    >
      {''}
    </Td>
  ),
  [rowData[i]],
),
```

---

## Context API

Context API를 사용하면 state가 바뀔때마다 함수 전체가 되게된다.
아래와 같이 컨텍스트를 만들어주고 하위의 컴포넌트에 전달시켜준다.

```
export const TableContext = createContext({
  tableData: [],
  halted: true,
  dispatch: () => {},
});

<TableContext.Provider value={value}>
      <Form />
      <div>{timer}</div>
      <Table />
      <div>{result}</div>
</TableContext.Provider>
```

컴포넌트에서 Context를 사용하여서 data를 받아서 사용이 가능

```
const Table = memo(() => {
  const { tableData } = useContext(TableContext);
  return (
    <table>
      {Array(tableData.length)
        .fill()
        .map((tr, i) => (
          <Tr rowIndex={i}/>
        ))}
    </table>
  );
});
```


## Router

Router는 대부분 한페이지에서 다 사용을 하게된다. 여러페이지에서 사용하는게 아니라는것

```
import { BrowserRouter, HashRouter, Route, Link } from 'react-router-dom';


const Games = () => {
  return (
    <BrowserRouter>
    <Link to="/number-baseball">숫자야구</Link>
    //...
    <Route path="/number-baseball" component={NumberBaseball} />
    //...
    </BrowserRouter>
  );
};
```

- install 참고(router class를 사용하기 위해서 설치)
npm install --save-dev @babel/plugin-proposal-class-properties

``historyApiFallback: True 라는 Webpack devServer에 추가 참고``

### HashRouter
검색엔진에 뜨지가 않는다! (서버는 모르고 브라우저만 안다)

### BrwoserRouter

새로고침 했을때 뜨지 않는다!
-> 서버에 대한 설정이 필요.

{history: {…}, location: {…}, match: {…}, staticContext: undefined}
history: {length: 5, action: "POP", location: {…}, createHref: ƒ, push: ƒ, …}
location: {pathname: "/game/index", search: "", hash: "", state: undefined, key: "jgtwo6"}
match: {path: "/game/:name", url: "/game/index", isExact: true, params: {…}}

history 안에는 react-router의 눈속임을 위한 준비하는 방법들이 있고
match -> params안에 분기처리 하는 naming이있다.(동적라우터 매칭)
location은 주소에 대한 정보를 가지고있다.

### 동적라우터 매칭
```
<BrowserRouter>
      {/* React에서는 Link라는 컴포넌트를 a태그 대신해서 사용한다 */}
      <div>
        공통부분
        <Link to="/game/number-baseball?query=10&hello=zerocho&bye=react">숫자야구</Link>
        &nbsp;
        <Link to="/game/rock-scissors-paper">가위바위보</Link>
        &nbsp;
        <Link to="/game/lotto-generator">로또생성기</Link>
        &nbsp;
        <Link to="/game/index">게임 매쳐</Link>
      </div>
      <div>
        <Route path="/game/:name" component={GameMatcher} />
        {/* <Route path="/number-baseball" component={NumberBaseball} />
        <Route path="/rock-scissors-paper" component={RSP} />
        <Route path="/lotto-generator" component={Lotto} />
        <Route path="/game/:name" component={GameMatcher} /> */}
      </div>
    </BrowserRouter>
```


### 쿼리 스트링
location.search안에 props로 있다

URLSearchParams를 사용하여서 활용할수 있다.
```
let urlSearchParams = new URLSearchParams(this.props.location.search.slice(1))
console.log(urlSearchParams.get('hello'))
```

### props 넘기는 방법
``` 
-기본
        <Route path="/game/:name" component={GameMatcher} />
-props
        <Route path="/game/:name" component={(props) => <GameMatcher {...props} />} /> //비추
        <Route path="/game/:name" render={(props) => <GameMatcher {...props} />} /> //추천
```

### Switch
동적라우팅에서 같은것이 중복되어서 나올 상황이라면 Switch를 사용하면 중복되어서 사용되지 않게 된다.
```
<Switch>
  <Route path="/game/:name" component={GameMatcher} />
  <Route path="/game/number-baseball" render={(props) => <GameMatcher {...props} />} />
</Switch>
```

### exact
```
<Switch>
  {/* <Route path="/game/:name" component={GameMatcher} /> */}
  path에 /만있는것과 /game/:name/도 똑같이 인식을 한다.
  그때 동시에 나타나는것을 Switch로해서도 잡히지않을때 exact를 사용해서 path 딱 그부분만
  맞을대 랜더링 될수있도록 하여야한다.
  <Route exact path="/" render={(props) => <GameMatcher {...props} />} /> 
  <Route path="/game/:name/" render={(props) => <GameMatcher {...props} />} />
</Switch>
```