import {createStore, combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import reducers from './reducers'; //webpack에서 index.js는 자동으로 참조되게된다

export default initStates => createStore(
    combineReducers(reducers),
    initStates,
    composeWithDevTools(),
)