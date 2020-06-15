import React from 'react'
import GridHolder from './gridHolder'


class AppContainer extends React.Component {

    constructor() {
        super() 
        this.state = {
            selection: null,
            animationSpeed: 15,
            rowSize: 30,
            colSize: 50 
        }
    }

    updateSelection = (selection) => {
        this.setState({
            selection: selection
        })
    }

    updateAnimationSpeed = (newSpeed) => {
        this.setState({
            animationSpeed: newSpeed
        })
    }

    
    
    render() {
        return (
            <div>
                <GridHolder 
                    selection={this.state.selection} 
                    animationSpeed={this.state.animationSpeed}
                    colSize={this.state.colSize}
                    rowSize={this.state.rowSize}
                />
            </div>
        )
    }
}


export default AppContainer