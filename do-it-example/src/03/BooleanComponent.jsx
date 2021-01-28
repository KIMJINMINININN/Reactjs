import React from 'react'

class BooleanComponent extends React.Component {
    render() {
            const message = this.props.bored ? '놀러 갈까' : '아니 공부할까';
            return (
                <div className="message-container">
                    {message}
                </div>
            );
    }
}

export default BooleanComponent