import React from 'react'

class GridSelection extends React.Component {

    setStartSelection = () => {
        this.props.updateSelection("start")
    }
    setEndSelection = () => {
        this.props.updateSelection("end")
    }
    setWallSelection = () => {
        this.props.updateSelection("wall")
    }

    render() {
        return (
            <div>
                <button onClick={this.setStartSelection}>Start</button>
                <button onClick={this.setEndSelection}>End</button>
                <button onClick={this.setWallSelection}>Wall</button>
            </div>
        )
    }
}

export default GridSelection