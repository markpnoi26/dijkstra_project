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
        if (this.state.wall) {
            return "black"
        } else if (this.state.x === this.props.start[0] && this.state.y === this.props.start[1]) {
            return "green"
        } else if (this.state.x === this.props.end[0] && this.state.y === this.props.end[1]) {
            return "red"
        }
    }

    onClickHandler = () => {
        
        console.log(`This box was clicked x=${this.state.x}, y=${this.state.y}`, this.state.wall)
        if (this.props.selection === "wall") {
            this.setState({ 
                wall: true
            })
        } else if (this.props.selection === "start") {
            this.props.updateStart([this.state.x, this.state.y])
        } else if (this.props.selection === "end") {
            this.props.updateEnd([this.state.x, this.state.y])
        }
        
    }

    render() {
        const nodeStyle = {
            height: "15px",
            width: "15px",
            padding: "1px",
            margin: "0px",
            border: "1px solid black",
            backgroundColor: this.setColor()
        }
        return (
            <div style={nodeStyle} onClick={this.onClickHandler} >
            </div>
        )
    }
}

export default GridNode