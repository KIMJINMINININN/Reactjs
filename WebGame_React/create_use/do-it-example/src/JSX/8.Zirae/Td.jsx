import React, {useCallback, useContext} from 'react';
import {CODE, TableContext, OPEN_CELL, CLICKED_MINE, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL} from './MineSearch'

//Style 변경
const getTdStyle = (code) => {
    switch(code){
        case CODE.NORMAL:
            return {
                background : '#444',
            }
        case CODE.OPENED:
            return {
                background : 'white',
            }
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return {
                background: 'yellow',
            }
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return {
                background: 'red',
            }
        default:
            return{
                background: 'white'
            }
    }
}

//Text 변경하기
const getTdText = (code) => {
    switch(code){
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
}




const Td = ({rowIndex, cellIndex}) => {
    const { tableData, dispatch, halted} = useContext(TableContext);

    const onClickTd = useCallback(() => {
        if(halted){
            return;
        }
        switch(tableData[rowIndex][cellIndex]){
            case CODE.OPENED:
            case CODE.FLAG_MINE:
            case CODE.FLAG:
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                return;
            case CODE.NORMAL:
                dispatch({ type: OPEN_CELL, row : rowIndex, cell:cellIndex});
                return;
            case CODE.MINE:
                dispatch({ type: CLICKED_MINE, row: rowIndex, cell: cellIndex});
                return;
            default:
                return;
        }
        
    }, [tableData[rowIndex][cellIndex], halted]);

    //오른쪽 클릭
    const onRightClicktd = useCallback((e) => {
        if(halted){
            return;
        }
        e.preventDefault();
        switch (tableData[rowIndex[cellIndex]]){
            case CODE.NORMAL:
            case CODE.MINE:
                dispatch({ type: FLAG_CELL, row: rowIndex, cell: cellIndex});
                return;
            case CODE.FLAG_MINE:
            case CODE.FLAG:
                dispatch({ type: QUESTION_CELL, row: rowIndex, cell : cellIndex});
                return;
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex});
                return;
            default:
                return;
        }
    }, [tableData[rowIndex[cellIndex]]]);
    return(
        <td stype={getTdStyle(tableData[rowIndex[cellIndex]])} 
        onClick={onClickTd}>{tableData[rowIndex[cellIndex]]}</td>
    )
}

export default Td