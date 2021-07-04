import React, { useReducer, createContext, useMemo, useEffect } from 'react';
import Table from './Table';
import Form from './Form';

export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FALG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0, //0이상이면 다 opened
};
//context 데이터 생성
export const TableContext = createContext({
  tableData: [],
  halted: true,
  dispatch: () => {},
});

const initialState = {
  tableData: [],
  data: {
    row: 0,
    cell: 0,
    mine: 0,
  },
  timer: 0,
  result: '',
  halted: true, //게임이 진행되고, 멈추고 할수있는 변수,
  openedCount: 0,
};

const plantMine = (row, cell, mine) => {
  console.log(row, cell, mine);
  const candidate = Array(row * cell).fill.map((arr, i) => {
    return i;
  });
  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }
  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }
  //몇컴마 몇인지를 계산하는 코드
  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }

  console.log('data : ', data);
  return data;
};

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICKED_MINE = 'CLICKED_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        data: {
          row: action.row,
          cell: action.cell,
          mine: action.mine,
        }, //기록해주기
        openedCount: 0,
        tableData: plantMine(action.row, action.cell, action.mine),
        halted: false,
        timer: 0,
      };
    case OPEN_CELL: {
      //불변성을 지키기 위한 방법
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData.forEach((row, i) => {
        tableData[i] = [...state.tableData[i]];
      });
      const checked = [];
      let openedCount = 0;
      const checkArround = (row, cell) => {
        //닫힌 칸만 열기
        if (
          [CODE.OPENED, CODE.FLAG_MINE, CODE.FALG, CODE.QUESTION_MINE, CODE.QUESTION].includes(
            tableData[row][cell],
          )
        ) {
          return;
        }
        //상하 좌우 칸이 아닌 경우 필터링
        if (row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length) {
          return;
        }
        if (checked.includes(row + '/' + cell)) {
          //이미 검사한 칸이면
          return;
        } else {
          // 검사를 한거면
          checked.push(row + ',' + cell);
        }

        //클릭한 주변 검사
        let around = [tableData[row][cell - 1], tableData[row][cell + 1]];
        //주변칸들의 지뢰 갯수 구하기
        if (tableData[row - 1]) {
          around = around.concat(
            tableData[row - 1][cell - 1],
            tableData[row - 1][cell],
            tableData[row - 1][cell] + 1,
          );
        }
        around = around.concat(tableData[row][cell - 1], tableData[row][cell + 1]);
        if (tableData[row + 1]) {
          around = around.concat(
            tableData[row + 1][cell - 1],
            tableData[row + 1][cell],
            tableData[row + 1][cell + 1],
          );
        }
        //지뢰 갯수
        const count = around.filter((v) =>
          [CODE.MINE, CODE.FALG_MINE, CODE.QUESTION_MINE].includes(v),
        ).length;
        console.log('count : ', count);
        if (count === 0) {
          //내가 빈칸이면 주변애들검사
          const near = [];
          if (row - 1 > -1) {
            // 제일 윗칸
            near.push([row - 1, cell - 1]);
            near.push([row - 1, cell]);
            near.push([row - 1, cell + 1]);
          }
          near.push([row, cell - 1]);
          near.push([row, cell + 1]);
          if (row - 1 > tableData.length) {
            // 제일 아래칸
            near.push([row + 1, cell - 1]);
            near.push([row + 1, cell]);
            near.push([row + 1, cell + 1]);
          }
          // near.filter(v => !!v[0]).forEach((n) => {
          //     checkArround(n[0], n[1]);
          // })
          near.forEach((n) => {
            if (tableData[n[0][n[1]]] !== CODE.OPENED) {
              checkArround(n[0], n[1]);
            }
          });
        }
        if (tableData[row][cell] === CODE.NORMAL) {
          //내칸이 닫힌칸이면 카운트 증가
          openedCount += 1;
        }
        tableData[row][cell] = count;
      };
      checkArround(action.row, action.cell);
      // 승리조건
      let halted = false;
      let result = '';
      if (state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount) {
        halted = true;
        result = `${state.timer}초만에 승리하셨습니다!`;
      }
      return {
        ...state,
        tableData,
        openedCount: state.openedCount + openedCount,
        halted,
        result,
      };
    }
    case CLICKED_MINE: {
      //불변성을 지키기 위한 방법
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.CLICKED_MINE;

      return {
        ...state,
        tableData,
        halted: true,
      };
    }
    case FLAG_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.MINE) {
        tableData[action.row][action.cell] = CODE.FLAG_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.FLAG;
      }
      return {
        ...state,
        tableData,
      };
    }
    case QUESTION_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.FALG_MINE) {
        tableData[action.row][action.cell] = CODE.QUESTION_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.QUESTION;
      }
      return {
        ...state,
        tableData,
      };
    }
    case NORMALIZE_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
        tableData[action.row][action.cell] = CODE.MINE;
      } else {
        tableData[action.row][action.cell] = CODE.NORMAL;
      }
      return {
        ...state,
        tableData,
      };
    }
    case INCREMENT_TIMER: {
      return {
        ...state,
        timer: state.timer + 1,
      };
    }
    default:
      return state;
  }
};

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, halted, timer, result } = state;
  //캐싱해주기(필요)
  const value = useMemo(() => ({ tableData, dispatch, halted }), [tableData, halted]);

  useEffect(() => {
    let timer;
    if (halted === false) {
      timer = setInterval(() => {
        dispatch({ type: INCREMENT_TIMER });
      }, 1000);
    }
    return () => {
      clearInterval();
    };
  }, [halted]);

  return (
    //context api에서 접근하려면 TableContext.Provider
    <TableContext.Provider value={value}>
      <Form />
      <div>{timer}</div>
      <Table />
      <div>{result}</div>
    </TableContext.Provider>
  );
};

export default MineSearch;
