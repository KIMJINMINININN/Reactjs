import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

number.innerText = 0;

// javascript는 string으로 되어있을때는 에러를 잡아주지 못한다.
// 그래서 변수로 관리하는것이 편하면서도 안전하다
const ADD = "ADD";
const MINUS = "MINUS";

//reducer는 단 하나의 state를 변경할수있는 방법이자 function
//reducer안에는 if도 좋지만 switch로 사용하는것을 권장
const countModifier = (count = 0, action) => {
  switch(action.type){
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
};
//store는 reducer를 필요로 한다.
const countStore = createStore(countModifier);

const onChange = () => {
  number.innerText = countStore.getState();
}

//redux의 구독하기(subscribe)를 사용하여서 변경된건지 아닌지 observer 할수있다.
countStore.subscribe(onChange);


//action 보내기
const handleAdd = () => {
  countStore.dispatch({ type: ADD });
}

const handleMinus = () => {
  countStore.dispatch({ type: MINUS });
}

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);