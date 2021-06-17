import React, {PureComponent } from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux'

class ReduxApp extends PureComponent{
    store = createStore(
        state => state,
        {loading: false, name: '두잇 리액트'},
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        );
    //리듀서 createStore() 함수의 인자로 전달
    render() {
        return(
            <Provider store={this.store}>
                리덕스 예제
            </Provider>
        );
    }
}

export default ReduxApp;