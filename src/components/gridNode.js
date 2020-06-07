import React from 'react'

class GridNode extends React.Component {

    render() {
        const nodeStyle = {
            height: "10px",
            width: "10px",
            padding: "10px",
            margin: "0px",
            border: "1px solid black"
        }
        return (
            <p style={nodeStyle}> {this.props.unique}</p>
        )
    }
}

export default GridNode