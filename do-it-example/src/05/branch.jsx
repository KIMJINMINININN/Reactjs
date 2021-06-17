import React from 'react';
import branch from 'recompose/branch';
import Button from '../04/Button';

export default branch(
  ({ isLoading }) => isLoading,
  () => <Button disable>로딩 중</Button>,
)(Button);
//isLoading가 참이면 isLoading 메세지를 isLoading이 false 즉 완료된 값이라면 Button 컴포넌트를 출력
