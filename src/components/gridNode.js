import React from 'react'

class GridNode extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            x: this.props.x,
            y: this.props.y,
            wall: false,
            found: false,
            from: null
        }
    }

    setColor = () => {
        if (this.state.x === this.props.start[0] && this.state.y === this.props.start[1]) {
            return "green"
        } else if (this.state.x === this.props.end[0] && this.state.y === this.props.end[1]) {
            return "red"
        } else if (this.state.wall) {
            return "black"
        }
    }

    handleClick = () => {
        
        console.log(`This box was clicked x=${this.state.x}, y=${this.state.y}`, this.state.wall)
        if (this.props.selection === "start") {
            this.props.updateStart([this.state.x, this.state.y])
        } else if (this.props.selection === "end") {
            this.props.updateEnd([this.state.x, this.state.y])
        }
        
    }

    // the props is passed from parent, but activated on mouseDown/mouseUp event => handled by parent.
    handleMouseOver = () => {
        if (this.props.isPainting) {
            this.setState({
                wall: true
            })
        }
    }

    render() {
        const nodeStyle = {
            height: "100%",
            width: "100%",
            top: "0px",
            left: "0px",
            border: "1px solid black",
            backgroundColor: this.setColor()
        }
        return (
            <div 
                style={nodeStyle} 
                onClick={this.handleClick} 
                onMouseOver={this.handleMouseOver} 
                onMouseDown={this.props.handleMouseEvent} 
                onMouseUp={this.props.handleMouseEvent}> 
            </div>
        )
    }
}

export default GridNode