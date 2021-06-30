import React, {useContext} from 'react';
import {CODE, TableContext} from './MineSearch'

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
        default:
            return{
                background: 'white'
            }
    }
}

const getTdText = (code) => {
    switch(code){
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return 'X';
        default: 
            return '';
    }
}


const Td = ({rowIndex, cellIndex}) => {
    const { tableData } = useContext(TableContext);
    return(
        <td stype={getTdStyle(tableData[rowIndex[cellIndex]])}>{tableData[rowIndex[cellIndex]]}</td>
    )
}

export default Td