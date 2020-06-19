import React from 'react'

export default class Settings extends React.Component {
    constructor(props) {
        super(props)
        this.state ={

        }
    }

    render() {
        return (
            <div>
                Settings!!
                <button onClick={this.props.closeSettingsModal}> close </button>
            </div>
        )
    }
}