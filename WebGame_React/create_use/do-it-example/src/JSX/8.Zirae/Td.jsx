import React, { useCallback, useContext, memo, useMemo } from 'react';
import {
  CODE,
  TableContext,
  OPEN_CELL,
  CLICK_MINE,
  FLAG_CELL,
  QUESTION_CELL,
  NORMALIZE_CELL,
} from './MineSearch';

//Style 변경
const getTdStyle = (code) => {
  switch (code) {
    case CODE.NORMAL:
      return {
        background: '#444',
      };
    case CODE.OPENED:
      return {
        background: 'white',
      };
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return {
        background: 'yellow',
      };
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return {
        background: 'red',
      };
    default:
      return {
        background: 'white',
      };
  }
};

//Text 변경하기
const getTdText = (code) => {
  // console.log('getTdText');
  switch (code) {
    case CODE.NORMAL:
      return '';
    case CODE.MINE:
      return 'X';
    case CODE.CLICKED_MINE:
      return '펑';
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return '!';
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return '?';
    default:
      return code || '';
  }
};

const Td = memo(({ rowIndex, cellIndex }) => {
  const { tableData, dispatch, halted } = useContext(TableContext);

  const onClickTd = useCallback(() => {
    if (halted) {
      return;
    }
    switch (tableData[rowIndex][cellIndex]) {
      case CODE.OPENED:
      case CODE.FLAG_MINE:
      case CODE.FLAG:
      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
        return;
      case CODE.NORMAL:
        dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex });
        return;
      case CODE.MINE:
        dispatch({ type: CLICK_MINE, row: rowIndex, cell: cellIndex });
        return;
      default:
        return;
    }
  }, [tableData[rowIndex][cellIndex], halted]);

  //오른쪽 클릭
  const onRightClickTd = useCallback((e) => {
    e.preventDefault();
    if (halted) {
      return;
    }
    switch (tableData[rowIndex][cellIndex]) {
      case CODE.NORMAL:
      case CODE.MINE:
        dispatch({ type: FLAG_CELL, row: rowIndex, cell: cellIndex });
        return;
      case CODE.FLAG_MINE:
      case CODE.FLAG:
        dispatch({ type: QUESTION_CELL, row: rowIndex, cell: cellIndex });
        return;
      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
        dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex });
        return;
      default:
        return;
    }
  }, [tableData[rowIndex][cellIndex], halted]);
  //1.useMemo를 하위의 컴포넌트를 만들어서 사용하는 방법
  return (
    <RealTd
      onClickTd={onClickTd}
      onRightClicktd={onRightClickTd}
      data={tableData[rowIndex][cellIndex]}
    />
  );
  //2.그냥 useMemo안에다가 넣어서 사용하는 방법
  //   return useMemo(
  //     <td
  //       style={getTdStyle(tableData[rowIndex[cellIndex]])}
  //       onClick={onClickTd}
  //       onContextMenu={onRightClicktd}
  //     >
  //       {getTdText(tableData[rowIndex[cellIndex]])}
  //     </td>,
  //     [tableData[rowIndex][cellIndex]],
  //   );
});

const RealTd = memo(({onClickTd, onRightClickTd, data}) => {
  // console.log('real td render');
  return (
    <td style={getTdStyle(data)} onClick={onClickTd} onContextMenu={onRightClickTd}>
      {getTdText(data)}
    </td>
  );
});

export default Td;
