import React from 'react'

class GridNode extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            x: this.props.x,
            y: this.props.y,
            wall: false,
            path: false
        }
    }

    setColor = () => {
        if (this.state.x === this.props.start[0] && this.state.y === this.props.start[1]) {
            return "seagreen"
        } else if (this.state.x === this.props.end[0] && this.state.y === this.props.end[1]) {
            return "rebeccapurple"
        } else if (this.state.wall) {
            return "darkturquoise"
        } else if (this.state.path) {
            return "yellow"
        }
    }

    handleClick = () => {
    
        if (this.props.selection === "start") {
            this.props.updateStart([this.state.x, this.state.y])
        } else if (this.props.selection === "end") {
            this.props.updateEnd([this.state.x, this.state.y])
        } 
    }

    // the props is passed from parent, but activated on mouseDown/mouseUp event => handled by parent.
    handleMouseOver = () => {
        if (this.props.isBuilding) {
            this.setState({
                wall: true
            })
            this.props.addWall(this.state.x, this.state.y)
        }

        if (this.props.isTearing) {
            this.setState({
                wall: false
            })
            this.props.deleteWall(this.state.x, this.state.y)
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
                id={`node-x-${this.state.x}-y-${this.state.y}`}
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