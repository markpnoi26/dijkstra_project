import React from 'react'

class GridNode extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            x: this.props.x,
            y: this.props.y,
            start: false,
            end: false,
            wall: false,
            found: false,
            from: null
        }
    }

    setColor = () => {
        if (this.state.wall) return "black"
        if (this.state.start) return "green"
        if (this.state.end) return "red"
    }

    onClickHandler = () => {
        // set conditional to render different color based on predefined selection: wall, start, end
        console.log(`This box was clicked x=${this.state.x}, y=${this.state.y}`, this.state.wall)
        this.setState({ wall: !this.state.wall})
    }

    render() {
        const nodeStyle = {
            height: "25px",
            width: "25px",
            padding: "10px",
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