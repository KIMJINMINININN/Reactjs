import React, { PureComponent } from 'react';
import ButtonWithLoadingContext from './ButtonWithLoadingContext';
import Button from '../04/Button';
import LoadingProvider from './LoadingProvider';

function RowBComponent() {
  return <Button>버튼</Button>;
}

function RowCComponent() {
  return <ButtonWithLoadingContext label="버튼"/>
}

function TableComponent() {
  return (
    <table>
      <RowBComponent />
      <RowCComponent />
    </table>
  );
}

class HomePageComponent extends PureComponent {
    
    render() {
        return (
        <LoadingProvider>
            <TableComponent />
            <Button onPress={this.toggleLoading}>상태 변경</Button>
        </LoadingProvider>
        );
    }
}