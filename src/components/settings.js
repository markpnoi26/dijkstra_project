import React from 'react'

export default class Settings extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            animationSpeed: this.props.animationSpeed
        }
    }

    handleSpeedChange = (event) => {
        this.setState({
            animationSpeed: event.target.value
        }, () => {
            this.props.updateAnimationSpeed(this.state.animationSpeed)
        })
    }

    render() {
        return (
            <div>
                Settings!!
                <input value={this.state.animationSpeed} onChange={this.handleSpeedChange} />
                <button onClick={this.props.closeSettingsModal}> close </button>
            </div>
        )
    }
}