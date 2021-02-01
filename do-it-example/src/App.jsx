import React from 'react';
// import ChildComponent2 from './03/ChildComponent2';
// import ChildProperty from './03/ChildProperty';
// import DefaultPropsComponent from './03/DefaultPropsComponent';
// import StateExample from './03/StateExample';
// import ForceUpdateExample from './03/ForceUpdateExample';
// import LifecycleExample from './03/LifecycleExample';
import Counter from './03/Counter';
import NewCounter from './03/NewCounter';
import ListExample from './03/ListExample';
import TodoList from './03/TodoList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 10 };
    this.resetCount = this.resetCount.bind(this);
  }
  resetCount() {
    this.setState(({ count }) => ({ count: count + 10 }));
  }
  render() {
    return (
      <div>
        <div>
          <Counter count={this.state.count} />
          <div>
            <NewCounter count={this.state.count} />
          </div>
          <button onClick={this.resetCount}>{this.state.count + 10}으로 초기화</button>
          <ListExample />
          <TodoList />
        </div>
      </div>
    );
  }
}

export default App;
