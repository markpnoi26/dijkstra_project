import React from 'react'
import '../component-styles/gridNode.css'
import startImg from '../component-styles/start.png'
import endImg from '../component-styles/end-flag.png'

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

    setImage = () => {
        const imageStyle = {
            width: "100%",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto"
        }

        if (this.props.start) {
            return (
                <img src={startImg} style={imageStyle} alt="start"/>
            )
        } else if (this.props.end) {
            return (
                <img src={endImg} style={imageStyle} alt="end"/>
            )
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
    
    // adding lifecyle methods for testing
    shouldComponentUpdate(nextProps) {
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
        // several states are controlled by parent element like the handleMouseEvent (mouse up & mouse down)
        // onMouseLeave is placed so the painting starts at the node that was clicked.
        return (
            <div 
                className={`node ${this.setClass()}`}
                id={`node-row-${this.state.row}-col-${this.state.col}`}
                onClick={this.handleClick} 
                onMouseEnter={this.handleMouseOver} 
                onMouseOver={this.handleMouseOver} 
                onMouseDown={this.props.handleMouseEvent} 
                onMouseUp={this.props.handleMouseEvent}>
                    {this.setImage()}
            </div>
        )
    }
}

export default GridNode