import React from 'react';

export default function withHoC(WrappedComponent) {
  const { displayName, name } = WrappedComponent;
  const wrappedComponentName = displayName || name;
  return class WithHoC extends React.Component {
    static displayName = `withHoc(${wrappedComponentName})`;
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}
