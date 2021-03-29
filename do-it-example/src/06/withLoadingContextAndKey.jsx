import React from 'react';
import { DEFAULT_KEY, contextPropTypes } from './LoadingProviderWithKey';
// contextPropTypes : contextPropTypes 자료형 공유
export const loadingPropTypes = contextPropTypes;

export default (contextKey = DEFAULT_KEY) => (WrappedComponent) => {
  const { displayName, name: componentName } = WrappedComponent;
  const wrappedComponentName = displayName || componentName;

  function WithLoadingContext(props, context) {
    const { loading, setLoading } = context[contextKey];
    return <WrappedComponent {...props} loading={loading} setLoading={setLoading} />;
  }

  WithLoadingContext.displayName = `withLoadingContext(${wrappedComponentName})`;
  WithLoadingContext.contextTypes = {
    [contextKey]: contextPropTypes,
  };
  return WithLoadingContext;
};
