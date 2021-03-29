import React, { PureComponent } from 'react';
import {
  ButtonWithDefaultLoadingContext,
  ButtonWithLoading2Context,
} from './ButtonWithLoadingContextAndKey';
import LoadingProviderWithKey from './LoadingProviderWithKey';
import ButtonWithConsumer from './ButtonWithConsumer';

const LoadingProvider1 = LoadingProviderWithKey();
const LoadingProvider2 = LoadingProviderWithKey('loading2');

function TableComponent() {
  return (
    <table>
      <ButtonWithDefaultLoadingContext>컨택스트1</ButtonWithDefaultLoadingContext>
      <ButtonWithLoading2Context>컨택스트2</ButtonWithLoading2Context>
      <ButtonWithConsumer>다중 소비자 예제</ButtonWithConsumer>
    </table>
  );
}

export default class HomePageComponentWithTwoProvider extends PureComponent {
  render() {
    return (
      <LoadingProvider1>
        <LoadingProvider2>
          <TableComponent />
        </LoadingProvider2>
      </LoadingProvider1>
    );
  }
}
