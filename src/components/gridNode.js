import React from 'react'

class GridNode extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            col: this.props.col,
            row: this.props.row
        }
    }

    setColor = () => {
        if (this.props.start) {
            return "seagreen"
        } else if (this.props.end) {
            return "rebeccapurple"
        } else if (this.props.wall) {
            return "darkturquoise"
        } else if (this.props.visited) {
            return "cornflowerblue"
        } else if (this.props.path) {
            return "orange"
        }
    }

    handleClick = () => {
    
        if (this.props.selection === "start") {
            this.props.updateStart(this.state.row, this.state.col)
        } else if (this.props.selection === "end") {
            this.props.updateEnd(this.state.row, this.state.col)
        } 
    }

    // the props is passed from parent, but activated on mouseDown/mouseUp event => handled by parent.
    handleMouseOver = () => {
        if (this.props.isBuilding) {
            this.props.addWall(this.state.row, this.state.col)
        }

        if (this.props.isTearing) {
            this.props.deleteWall(this.state.row, this.state.col)
        }
    }


    render() {
        const nodeStyle = {
            height: "25px",
            width: "25px",
            display: "table-cell",
            border: "0.5px solid darkturquoise",
            backgroundColor: this.setColor()
        }
        // several states are controlled by parent element like the handleMouseEvent (mouse up & mouse down)
        // onMouseLeave is placed so the painting starts at the node that was clicked.
        return (
            <div 
                className="node"
                id={`node-row-${this.state.row}-col-${this.state.col}`}
                style={nodeStyle} 
                onClick={this.handleClick} 
                onMouseLeave={this.handleMouseOver} 
                onMouseOver={this.handleMouseOver} 
                onMouseDown={this.props.handleMouseEvent} 
                onMouseUp={this.props.handleMouseEvent}> 
            </div>
        )
    }
}

export default GridNode