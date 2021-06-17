import React, { PureComponent } from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

const reducer = (state, action) =>{
    //reducer는 store의 데이터 state와 action을 받아서 새로운 데이터로 반환
    const {type, payload} = action;
    switch(type){
        //SET_LOADING일때 store의 데이터를 아래와 같이 반환한다.
        case 'SET_LOADING' : {
            return {
                ...state,
                loading: payload,
            };
        }
        case 'RESET_LOADING' : {
            return {...state, loading: false}
        }
        case 'SET_USER': {
            return {
                ...state,
                user: payload,
            };
        }
        default:
            return state;
    }
};

class ReduxApp extends PureComponent {
    store = createStore(
        reducer,
        {loading:false, name:'두잇 리액트'},
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    componentDidMount(){
        this.store.dispatch({
            type: 'SET_LOADING',
            payload: true,
        });
        this.store.dispatch({ type: 'RESET_LOADING' });
        this.store.dispatch({
            type: 'SET_USER',
            payload: {name: 'Park', age:20}
        })
    }
    render() {
        return (
            <Provider store={this.store}>
                리덕스 예제
            </Provider>
        )
    }
}

export default ReduxApp;