import {createStore} from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

//action name

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

//action
const addToDo = text => {
  return {
    type: ADD_TODO,
    text
  };
};

const deleteToDo = id => {
  return {
    type: DELETE_TODO,
    id
  };
};

const reducer = (state = [], action) => {
  switch (action.type){
    case ADD_TODO:
      // redux는 새로운 변수나 객체를 반환해야한다. 기존의 것을 그냥 변경하는것은 NO, NO!
      return [{ text: action.text, id: Date.now()}, ...state];
    case DELETE_TODO:
      return state.filter(toDo => toDo.id !== action.id);
    default:
      return state;
  }
};

const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));


//dispatch로 action 호출
const dispatchaddToDo = text => {
  store.dispatch(addToDo(text));
};

const dispatchdeleteToDo = e => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteToDo(id));
};

//ul에 그려내기
const paintToDos = () => {
  //store에서 state값 가져오기 getState
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach(toDo => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchdeleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

//변경될때에 observer 진행
store.subscribe(paintToDos);

const onSubmit = e => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchaddToDo(toDo);
};

form.addEventListener("submit", onSubmit);