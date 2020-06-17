import React from 'react'
import GridContainer from './gridContainer'
import LegendContainer from './legendContainer'


class AppContainer extends React.Component {

    constructor() {
        super() 
        this.state = {
            animationSpeed: 15,
            rowSize: 35,
            colSize: 61 
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
                <GridContainer 
                    animationSpeed={this.state.animationSpeed}
                    colSize={this.state.colSize}
                    rowSize={this.state.rowSize}
                />

                <LegendContainer 
                
                />
            </div>
        )
    }
}


export default AppContainer