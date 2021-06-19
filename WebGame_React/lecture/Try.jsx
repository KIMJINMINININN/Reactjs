import React, {Component} from 'react'

class Try extends Component{
    render(){
        return (
            <li key={this.props.v.fruit + this.props.v.taste}>
                <b>{this.props.v.fruit}</b> - {this.props.v.taste}
                <div>컨텐츠1</div>
                <div>컨텐츠2</div>
                <div>컨텐츠3</div>
                <div>컨텐츠4</div>
            </li>
        )
    }
}

export default Try