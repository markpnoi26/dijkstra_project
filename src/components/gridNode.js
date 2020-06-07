import React from 'react'

class GridNode extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            x: this.props.x,
            y: this.props.y
        }
    }

    render() {
        const nodeStyle = {
            height: "50px",
            width: "50px",
            padding: "10px",
            margin: "0px",
            border: "1px solid black"
        }
        return (
            <p style={nodeStyle}> x={this.state.x}, y={this.state.y}</p>
        )
    }
}

export default GridNode