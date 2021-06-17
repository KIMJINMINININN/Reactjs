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

## WebPack install

npm init
npm i react react-dom : react, react dom install
npm i -D webpack-cli : webpack 설치

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
