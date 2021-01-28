import React from 'react';
import ChildComponent2 from './03/ChildComponent2';
import ChildProperty from './03/ChildProperty';
import DefaultPropsComponent from './03/DefaultPropsComponent';

class App extends React.Component{
    render(){
        return (
            <div>
                <ChildProperty>
                    <div><span>자식 노드!!</span></div>
                </ChildProperty>
            </div>
        )
    }
}

export default App