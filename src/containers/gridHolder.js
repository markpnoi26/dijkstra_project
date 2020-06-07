import React from 'react'
import Node from '../components/gridNode'


class GridHolder extends React.Component {

    fillRow() {
        return (
            <tr> 
                <td> <Node /></td>
                <td> <Node /></td>
                <td> <Node /></td>
                <td> <Node /></td>
                <td> <Node /></td>
                <td> <Node /></td>
                <td> <Node /></td>
                <td> <Node /></td>
                <td> <Node /></td>
                <td> <Node /></td>
            </tr>
        )
    }

    render() {
        return (
            <table>
                {this.fillRow()}
                {this.fillRow()}
                {this.fillRow()}
                {this.fillRow()}
                {this.fillRow()}
                {this.fillRow()}
                {this.fillRow()}
                {this.fillRow()}
                {this.fillRow()}
            </table>
        )
    }
}

export default GridHolder
