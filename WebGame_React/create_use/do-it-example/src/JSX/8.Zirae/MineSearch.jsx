import React, {useReducer , createContext, useMemo }from 'react';
import Table from './Table'
import Form from './Form';

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION : -2,
    FALG: -3,
    QUESTION_MINE : -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0, //0이상이면 다 opened
}
//context 데이터 생성
export const TableContext = createContext({
    tableData: [],
    halted: true,
    dispatch: () => {},
});

const initialState ={
    tableData : [],
    timer: 0,
    result: '',
    halted: true, //게임이 진행되고, 멈추고 할수있는 변수
};

const plantMine = (row, cell, mine) => {
    console.log(row, cell, mine);
    const candidate = Array(row * cell).fill.map((arr, i) => {
        return i;
    })
    const shuffle = [];
    while(candidate.length > row * cell - mine){
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }
    const data = [];
    for(let i = 0 ; i < row; i++){
        const rowData = [];
        data.push(rowData)
        for(let j = 0; j < cell ; j++){
            rowData.push(CODE.NORMAL);
        }
    }
    //몇컴마 몇인지를 계산하는 코드
    for(let k = 0; k < shuffle.length; k++){
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }

    console.log("data : ", data);
    return data;
}

export const START_GAME = "START_GAME"
export const OPEN_CELL = "OPEN_CELL"
export const CLICKED_MINE = "CLICKED_MINE"
export const FLAG_CELL = "FLAG_CELL"
export const QUESTION_CELL = "QUESTION_CELL"
export const NORMALIZE_CELL = "NORMALIZE_CELL"

const reducer = (state, action) => {
    switch(action.type){
        case START_GAME:
            return {
                ...state,
                tableData: plantMine(action.row, action.cell, action.mine),
                halted: false
            }
        case OPEN_CELL:{
            //불변성을 지키기 위한 방법
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]]

            //클릭한 주변 검사
            let around = [];
            if(tableData[action.row - 1]){
                around = around.concat(
                    tableData[action.row-1][action.cell-1],
                    tableData[action.row-1][action.cell],
                    tableData[action.row-1][action.cell]+1,
                )
            };
            around =  around.concat(
                tableData[action.row][action.cell - 1],
                tableData[action.row][action.cell + 1],
            );
            if(tableData[action.row + 1]){
                around = around.concat(
                    tableData[action.row+1][action.cell-1],
                    tableData[action.row+1][action.cell],
                    tableData[action.row+1][action.cell+1],
                )
            }
            //지뢰 갯수 
            const count = around.filter((v) => [CODE.MINE, CODE.FALG_MINE, CODE.QUESTION_MINE].includes(v)).length;
            console.log("count : ", count)
            tableData[action.row][action.cell] = count;
            return {
                ...state,
                tableData,
            }
        }
        case CLICKED_MINE:{
            //불변성을 지키기 위한 방법
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]]
            tableData[action.row][action.cell] = CODE.CLICKED_MINE;

            return {
                ...state,
                tableData,
                halted: true,
            }
        }
        case FLAG_CELL : {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]]
            if(tableData[action.row][action.cell] === CODE.MINE){
                tableData[action.row][action.cell] = CODE.FLAG_MINE;
            } else{
                tableData[action.row][action.cell] = CODE.FLAG;
            }
            return {
                ...state,
                tableData,
            }
        }
        case QUESTION_CELL : {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]]
            if(tableData[action.row][action.cell] === CODE.FALG_MINE){
                tableData[action.row][action.cell] = CODE.QUESTION_MINE;
            } else{
                tableData[action.row][action.cell] = CODE.QUESTION;
            }
            return {
                ...state,
                tableData,
            }
        }
        case NORMALIZE_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]]
            if(tableData[action.row][action.cell] === CODE.QUESTION_MINE){
                tableData[action.row][action.cell] = CODE.MINE;
            } else{
                tableData[action.row][action.cell] = CODE.NORMAL;
            }
            return {
                ...state,
                tableData,
            }
        }
        default:
            return state;
    }
}

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {tableData, halted, timer, result} = state;
    //캐싱해주기
    const value = useMemo( () => ({ tableData: state.tableData, dispatch, halted: halted}, [tableData, halted]))
    return(
        //context api에서 접근하려면 TableContext.Provider
        <TableContext.Provider value={value}>
            <Form dispatch={dispatch} />
            <div>{timer}</div>
            <Table/>
            <div>{result}</div>
        </TableContext.Provider>
    )
}

export default MineSearch