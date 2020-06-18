import React from 'react'
import GridContainer from './gridContainer'
import LegendContainer from './legendContainer'
import TutorialContainer from './tutorialModalContainer'
import '../component-styles/app.css'


class AppContainer extends React.Component {

    constructor() {
        super() 
        this.state = {
            animationSpeed: 15,
            rowSize: 35,
            colSize: 61,
            isTutorialOpen: true
        }
    }

    updateAnimationSpeed = (newSpeed) => {
        this.setState({
            animationSpeed: newSpeed
        })
    }

    updateTutorialModal = () => {
        this.setState({
            isTutorialOpen: !this.state.isTutorialOpen
        })
    }
    
    render() {
        return (
            <div className="app-wrapper">
                <TutorialContainer 
                    isTutorialOpen={this.state.isTutorialOpen}
                    closeModal={this.updateTutorialModal}
                    openModal={this.updateTutorialModal}
                />
                
                <GridContainer 
                    animationSpeed={this.state.animationSpeed}
                    colSize={this.state.colSize}
                    rowSize={this.state.rowSize}
                />

                <LegendContainer 
                
                />

                <button className="tutorial-button" onClick={this.updateTutorialModal}> open tutorial </button>
            </div>
        )
    }
}


export default AppContainer