import React from 'react'
import GridNode from '../components/gridNode'


class GridHolder extends React.Component {

    fillCol(y) {
        const colNum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        return(
            colNum.map((x) => {
                return (
                    <td key={`x${x}`}>
                        <GridNode x={x} y={y} selection={this.props.selection}/>
                    </td>
                )
            })
        )
    }

    fillRow(y) {
        return(
            <tr key={`y${y}`}> 
               {this.fillCol(y)}
            </tr>
        )
    }

    render() {
        const rowNum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        return(
            <table>
                <tbody>
                    {rowNum.map((y) => {
                        return this.fillRow(y)
                    })}
                </tbody>
            </table>
        )
    }
}

export default GridHolder
