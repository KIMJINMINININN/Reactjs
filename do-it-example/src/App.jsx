import React from 'react';
import ChildComponent2 from './03/ChildComponent2';
import ChildProperty from './03/ChildProperty';
import DefaultPropsComponent from './03/DefaultPropsComponent';
import StateExample from './03/StateExample';
import ForceUpdateExample from './03/ForceUpdateExample';
import LifecycleExample from './03/LifecycleExample';

class App extends React.Component {
  render() {
    return (
      <div>
        <LifecycleExample />
      </div>
    );
  }
}

export default App;
