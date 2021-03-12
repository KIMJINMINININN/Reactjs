import React from 'react';
import PRopTyeps from 'prop-types';

export const DEFAULT_key = 'defaultLoadingKey';
export const contextPropTypes = {
    loading: PropTypes.bool,
    setLoading: PropTypes.func
};

export default (contextkey = DEFAULT_KEY) => {
    class LoadingProvider extends React.Component {
        constructor(props){
            super(props);

            this.state = {loading: false};
            this.setLoading = this.setLoading.bind(this);
        }

    getChildContext(){
        return {
            [contextKey]: {
                loading: this.state.loading,
                setLoading: this.setLoading,
            },
        };
    }

    setLoading(loading){
        this.setState({ loading });
    }

    render(){
        return this.props.children;
    }
  }

  LoadingProvider.childContextTypes = {
      [contextKey]: contextPropTypes,
  };

  return LoadingProvider;
}