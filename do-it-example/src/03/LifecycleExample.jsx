import React from 'react';

class LifecycleExample extends React.Component {
  static getDerivedStateFromProps() {
    console.log('getDerivedStateFromProps 호출');
    return {};
  }
  constructor(props) {
    super(props);
    this.state = {};
    console.log('constructor 호출');
  }
  componentDidMount() {
    console.log('componentDidMount 호출');
    this.forceUpdate();
    // this.setState({ update: true });
  }
  componentDidUpdate() {
    console.log('componentDidUpdate 호출');
    return false;
  }
  componentWillUnmount() {
    console.log('componentWillUnmount 호출');
    //소멸될때에 나타나는 생성주기
  }
  getSnapshotBeforeUpdate() {
    console.log('shouldComponentUpdate 호출');
    return true;
  }
  render() {
    console.log('render 호출');
    return null;
  }
}

export default LifecycleExample;
