import React from 'react'
import GridHolder from './gridHolder'
import SelectionHolder from './selectionHolder'


class AppContainer extends React.Component {

    constructor() {
        super() 
        this.state = {
            selection: null,
            animationSpeed: 65
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
                <SelectionHolder 
                    updateSelection={this.updateSelection}
                    updateAnimationSpeed={this.updateAnimationSpeed}
                />
                <GridHolder 
                    selection={this.state.selection} 
                    animationSpeed={this.state.animationSpeed}
                />
            </div>
        )
    }
}


export default AppContainer