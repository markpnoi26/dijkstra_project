import React from 'react'
import '../component-styles/modal.css'


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
            <div className="settings-card">
                <label className="label-name">
                    Animation Speed:
                </label>
                <select 
                    className="drop-down" 
                    value={this.state.animationSpeed} 
                    onChange={this.handleSpeedChange} 
                >
                    <option value={10}> Rabbit Mode </option>
                    <option value={25}> Fast </option>
                    <option value={40}> Medium </option>
                    <option value={65}> Slow </option>
                    <option value={85}> Snail Mode </option>
                </select>
                
                <button className="button" onClick={this.props.closeSettingsModal}> close </button>
            </div>
        )
    }
}