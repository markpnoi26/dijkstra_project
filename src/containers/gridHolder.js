import React from 'react'
import Node from '../components/gridNode'


class GridHolder extends React.Component {

    fillCol(y) {
        const colNum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        return (
            colNum.map((num) => {
                return (<td><Node x={num} y={y} /></td>)
            })
        )
    }

    fillRow(y) {
        return (
            <tr> 
               {this.fillCol(y)}
            </tr>
        )
    }

    render() {
        const rowNum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        return (
            <table>
                {rowNum.map((num) => {
                    return this.fillRow(num)
                })}
            </table>
        )
    }
}

export default GridHolder
