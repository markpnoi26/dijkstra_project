import React from 'react'
import '../componentCSS/gridNode.css'

class GridNode extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            col: this.props.col,
            row: this.props.row
        }
    }

    setClass = () => {

        if (this.props.start) return "node-is-start"
        if (this.props.end) return "node-is-end"
        if (this.props.wall) return "node-is-wall"
        if (this.props.path) return "node-shortest-path"
        if (this.props.visited) return "node-visited"

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
    
    // adding lifecyle methods for testing
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.wall !== nextProps.wall) {
            return true
        } else if (this.props.start !== nextProps.start) {
            return true
        } else if (this.props.end !== nextProps.end) {
            return true
        } else if (this.props.path !== nextProps.path) {
            return true
        } else if (this.props.visited !== nextProps.visited) {
            return true
        } else {
            return false;
        }
    }


    render() {
        const nodeStyle = {
            height: "25px",
            width: "25px",
            display: "table-cell",
            border: "0.5px dotted grey"
        }
        // several states are controlled by parent element like the handleMouseEvent (mouse up & mouse down)
        // onMouseLeave is placed so the painting starts at the node that was clicked.
        return (
            <div 
                className={this.setClass()}
                id={`node-row-${this.state.row}-col-${this.state.col}`}
                style={nodeStyle} 
                onClick={this.handleClick} 
                onMouseLeave={this.handleMouseOver} 
                onMouseOver={this.handleMouseOver} 
                onMouseDown={this.props.handleMouseEvent} 
                onMouseUp={this.props.handleMouseEvent}> {this.props.start? "S": this.props.end? "E": ""}
            </div>
        )
    }
}

export default GridNode