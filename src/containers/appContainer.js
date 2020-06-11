import React from 'react'
import GridHolder from './gridHolder'
import SelectionHolder from './selectionHolder'


class AppContainer extends React.Component {

    constructor() {
        super() 
        this.state = {
            selection: null,
            animationSpeed: 50,
            isCurrentlyAnimating: false
        }
    }

    updateSelection = (selection) => {
        this.setState({
            selection: selection
        })
    }

    updateCurrentlyAnimating = () => {
        this.setState({
            isCurrentlyAnimating: !this.state.isCurrentlyAnimating
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
                />
                <GridHolder 
                    selection={this.state.selection} 
                />
            </div>
        )
    }
}


export default AppContainer