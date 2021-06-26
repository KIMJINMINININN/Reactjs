import React, { useReducer, useCallback, useEffect } from 'react';
import Table from './Table';

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  recentCell: [-1, -1],
};

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

//reducer안에서 state를 어떻게 바꿀지를 적어준다.
const reducer = (state, action) => {
  switch (action.type) {
    case SET_WINNER:
      //state.winner = action.winner; 이렇게 하면안된다.

      return {
        ...state,
        winner: action.winner,
      };
    case CLICK_CELL: {
      //불변성이 중요하다.
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]]; //immer라는 라이브러리로 가독성 해결
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell],
      };
    }
    case CHANGE_TURN: {
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O',
      };
    }
    case RESET_GAME: {
      //초기화 시켜주는
      return {
        ...state,
        turn: 'O',
        tableData: [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
        recentCell: [-1, -1],
      };
    }
    default:
      return state;
  }
};

const Tictacto = () => {
  //initialState의 접근은 state.??으로 접근하면된다.
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, turn, winner, recentCell } = state;
  /* const [winner, setWinner] = useState('');
  const [turn, setTurn] = useState('O');
  const [tableData, setTableData] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]); */

  const onClickTable = useCallback(() => {
    //어떠한 액션을 실행할때마다 reducer가 실행된다.
    dispatch({ type: SET_WINNER, winner: 'O' });
  }, []);

  useEffect(() => {
    const [row, cell] = recentCell;
    if (row < 0) {
      return;
    }
    let win = false;
    if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
      //가로
      win = true;
    }
    if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
      //세로
      win = true;
    }
    if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
      //대각선 왼쪽에서부터
      win = true;
    }
    if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
      //대각선 오른쪽에서부터
      win = true;
    }
    console.log(win, row, cell, tableData, turn);
    if (win) {
      //승리시
      dispatch({ type: SET_WINNER, winner: turn });
      dispatch({ type: RESET_GAME });
    } else {
      let all = true; //all이 true면 무승부라는 뜻
      tableData.forEach((row) => {
        //무승부 검사
        row.forEach((cell) => {
          if (!cell) {
            all = false;
          }
        });
      });
      if (all) {
        dispatch({ type: RESET_GAME });
      } else {
        //비동기적인 문제때문에 승리가 아닐시에 turn을 넘기게 된다.
        dispatch({ type: CHANGE_TURN }); //턴을 넘기기
      }
    }
  }, [recentCell]);
  return (
    <>
      <Table onClick={onClickTable} tableData={state.tableData} dispatch={dispatch} />
      {state.winner && <div>{state.winner}님의 승리</div>}
    </>
  );
};

export default Tictacto;
