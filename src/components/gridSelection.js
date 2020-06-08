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
    tearWallSelection = () => {
        this.props.updateSelection("teardown")
    }

    render() {
        return (
            <div>
                <button onClick={this.setStartSelection}>Move Start</button>
                <button onClick={this.setEndSelection}>Move End</button>
                <button onClick={this.setWallSelection}>Build Maze Walls</button>
                <button onClick={this.tearWallSelection}> Tear Maze Walls Down </button>
                <button onClick={() => window.location.reload(false)}>Reload</button>
            </div>
        )
    }
}

export default GridSelection