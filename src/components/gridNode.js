import React from 'react'
import '../component-styles/gridNode.css'
import startImg from '../component-styles/start.png'
import endImg from '../component-styles/end-flag.png'
import resistanceImg from '../component-styles/resistance.png'

class GridNode extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            col: this.props.col,
            row: this.props.row
        }
    }

    setClass = () => {


        // start class
        if (this.props.start && !this.props.path) return "node-is-start"
        if (this.props.end && !this.props.path) return "node-is-end"
        if (this.props.wall && !this.props.path) return "node-is-wall"
        if (this.props.weight === 3 && !this.props.path && !this.props.visited) return "node-is-heavy-3" 
        if (this.props.weight === 5 && !this.props.path && !this.props.visited) return "node-is-heavy-5" 

        // visualization class
        if (this.props.weight === 1 && this.props.path) return "node-shortest-path"
        if (this.props.weight === 3 && this.props.path) return "node-is-heavy-3-shortest-path" 
        if (this.props.weight === 5 && this.props.path) return "node-is-heavy-5-shortest-path" 
        if (this.props.weight === 1 && this.props.path && this.props.wall) return "node-shortest-path"
        if (this.props.weight === 3 && this.props.path && this.props.wall) return "node-is-heavy-3-shortest-path" 
        if (this.props.weight === 5 && this.props.path && this.props.wall) return "node-is-heavy-5-shortest-path" 
        if (this.props.weight > 1 && this.props.visited) return "node-is-heavy-visited" 
        if (this.props.weight === 1 && this.props.visited) return "node-visited"
        else return ""

    }

    setDisableClass = () => {
        return this.props.isCurrentlyAnimating? "node-is-frozen": ""
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
        } else if (this.props.weight > 1) {
            return (
                <img src={resistanceImg} style={imageStyle} alt="heavy"/>
            )
        }

    }

    // the props is passed from parent, but activated on mouseDown/mouseUp event => handled by parent.
    handleMouseOver = (event) => {
        event.stopPropagation()
        if (this.props.isMovingStart) {
            this.props.updateStart(this.state.row, this.state.col)
        }

        if (this.props.isMovingEnd) {
            this.props.updateEnd(this.state.row, this.state.col)
        }

        if (this.props.isBuilding) {
            this.props.addWall(this.state.row, this.state.col)
        }

        if (this.props.isTearing) {
            this.props.deleteWall(this.state.row, this.state.col)
        }
    }
    
    // adding lifecyle methods for increased performance
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
        } else if (this.props.weight !== nextProps.weight) {
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
                className={`node ${this.setClass()} ${this.setDisableClass()}`}
                id={`node-row-${this.state.row}-col-${this.state.col}`}
                onMouseEnter={(event) => this.handleMouseOver(event)} 
                onMouseOver={(event) => this.handleMouseOver(event)} 
                onMouseDown={(event) => this.props.handleMouseEvent(event, this.state.row, this.state.col)} 
                onMouseUp={this.props.handleMouseEvent}>
                    {this.setImage()}
            </div>
        )
    }
}

export default GridNode