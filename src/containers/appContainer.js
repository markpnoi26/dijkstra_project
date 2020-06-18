import React from 'react'
import GridContainer from './gridContainer'
import LegendContainer from './legendContainer'
// import TutorialContainer from './tutorialModalContainer'
import '../component-styles/app.css'


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
            <div className="app-wrapper">
                {/* <TutorialContainer /> */}
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