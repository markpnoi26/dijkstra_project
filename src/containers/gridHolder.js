import React from 'react'
import GridNode from '../components/gridNode'


class GridHolder extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isPainting: false
        }
    }

    //this handle the painting of the walls which is passed down to the child element
    handleMouseEvent = (event) => {
        if (event.type === "mousedown") {
            this.setState({
                isPainting: true
            })
        } else if (event.type === "mouseup") {
            this.setState({
                isPainting: false
            })
        }
    }

    fillCol(y) {
        const colNum = Array.from(Array(this.props.size).keys())
        return(
            colNum.map((x) => {
                return (
                    <td key={`x${x}`} style={{padding: "0"}}>
                        <GridNode 
                            x={x} y={y} 
                            selection={this.props.selection} 
                            start={this.props.start} 
                            end={this.props.end} 
                            updateStart={this.props.updateStart} 
                            updateEnd={this.props.updateEnd} 
                            isPainting={this.state.isPainting} 
                            handleMouseEvent={this.handleMouseEvent}/>
                    </td>
                )
            })
        )
    }

    fillRow(y) {
        return(
            <tr key={`y${y}`} > 
               {this.fillCol(y)}
            </tr>
        )
    }

    render() {
        const rowNum = Array.from(Array(this.props.size).keys())
        return(
            <table style={{width: "600px", height: "600px"}}>
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
