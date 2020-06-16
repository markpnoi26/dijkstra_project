import React from 'react'
import GridHolder from './gridHolder'


class AppContainer extends React.Component {

    constructor() {
        super() 
        this.state = {
            animationSpeed: 15,
            rowSize: 25,
            colSize: 41 
        }
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
                    animationSpeed={this.state.animationSpeed}
                    colSize={this.state.colSize}
                    rowSize={this.state.rowSize}
                />
            </div>
        )
    }
}


export default AppContainer