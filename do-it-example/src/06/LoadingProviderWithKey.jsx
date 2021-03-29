import React from 'react';
import Proptypes from 'prop-types';

//기본키 값 정보 공유
export const DEFAULT_KEY = 'defaultLoadingKey';
//컨택스트 데이터의 자료형 공유
export const contextPropTypes = {
  loading: Proptypes.bool,
  setLoading: Proptypes.func,
};
//데이터의 기본 키값 정하기
export default (contextKey = DEFAULT_KEY) => {
  class LoadingProvider extends React.Component {
    constructor(props) {
      super(props);

      this.state = { loading: false };
      this.setLoading = this.setLoading.bind(this);
    }

    getChildContext() {
      return {
        //contextKey에 해당하는 로딩 상태 정보 객체를 반환
        [contextKey]: {
          loading: this.state.loading,
          setLoading: this.setLoading,
        },
      };
    }

    setLoading(loading) {
      this.setState({ loading });
    }

    render() {
      return this.props.children;
    }
  }

  LoadingProvider.childContextTypes = {
    [contextKey]: contextPropTypes,
  };

  return LoadingProvider;
};
