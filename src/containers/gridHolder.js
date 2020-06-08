import React from 'react'
import GridNode from '../components/gridNode'


class GridHolder extends React.Component {

    fillCol(y) {
        const colNum = Array.from(Array(this.props.size).keys())
        return(
            colNum.map((x) => {
                return (
                    <td key={`x${x}`}>
                        <GridNode x={x} y={y} selection={this.props.selection} start={this.props.start} end={this.props.end} updateStart={this.props.updateStart} updateEnd={this.props.updateEnd}/>
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
        const rowNum = Array.from(Array(this.props.size).keys())
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
