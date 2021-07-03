import React, { useCallback, useEffect, useRef, memo } from 'react';
import { CLICK_CELL } from './Tictacto';

const Td = memo(({ rowIndex, cellIndex, cellData, dispatch }) => {
  //랜더링이 왜 다 같이 되는지 확인해보기 위해서 사용할때 useEffect, useRef를 사용한다.
  /* const ref = useRef([]);
  useEffect(() => {
    console.log('ref : ', ref);
    console.log(
      rowIndex === ref.current[0],
      cellIndex === ref.current[1],
      dispatch === ref.current[2],
      cellData === ref.current[3],
    );
    ref.current = [rowIndex, cellIndex, dispatch, cellData];
  }, [rowIndex, cellIndex, dispatch, cellData]); */

  const onClickTd = useCallback(() => {
    console.log(rowIndex, cellIndex);
    if (cellData) {
      return;
    }
    //state는 비동기라는 사실!!
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
  }, [cellData]);

  return <td onClick={onClickTd}>{cellData}</td>;
});

export default Td;
