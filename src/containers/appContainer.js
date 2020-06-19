import React from 'react'
import GridContainer from './gridContainer'
import LegendContainer from './legendContainer'
import TutorialContainer from './tutorialModalContainer'
import SettingsContainer from './settingsModalContainer'
import '../component-styles/app.css'


class AppContainer extends React.Component {

    constructor() {
        super() 
        this.state = {
            animationSpeed: 15,
            rowSize: 35,
            colSize: 61,
            isTutorialOpen: true,
            isSettingsOpen: false,
            isGridAnimating: false
        }
    }

    updateAnimationSpeed = (newSpeed) => {
        this.setState({
            animationSpeed: newSpeed
        })
    }

    updateColSize = (newColSize) => {
        this.setState({
            colSize: newColSize
        })
    }

    updateRowSize = (newRowSize) => {
        this.setState({
            rowSize: newRowSize
        })
    }


    updateTutorialModal = () => {
        this.setState({
            isTutorialOpen: !this.state.isTutorialOpen
        })
    }

    updateSettingsModal = () => {
        this.setState({
            isSettingsOpen: !this.state.isSettingsOpen
        })
    }


    updateIsGridAnimating = () => {
        this.setState({
            isGridAnimating: !this.state.isGridAnimating
        })
    }
    
    render() {
        return (
            <div className="app-wrapper">
                <TutorialContainer 
                    isTutorialOpen={this.state.isTutorialOpen}
                    closeTutorialModal={this.updateTutorialModal}
                />

                <SettingsContainer
                    isSettingsOpen={this.state.isSettingsOpen}

                    animationSpeed={this.state.animationSpeed}
                    colSize={this.state.colSize}
                    rowSize={this.state.rowSize}

                    closeSettingsModal={this.updateSettingsModal}
                    updateAnimationSpeed={this.updateAnimationSpeed}
                    updateRowSize={this.updateRowSize}
                    updateColSize={this.updateColSize}
                />
                
                <GridContainer 
                    animationSpeed={this.state.animationSpeed}
                    colSize={this.state.colSize}
                    rowSize={this.state.rowSize}

                    updateIsGridAnimating={this.updateIsGridAnimating}
                />

                <LegendContainer />

                <div>
                    <button className="tutorial-button" onClick={this.updateTutorialModal} disabled={this.isGridAnimating}> Tutorial </button>
                    <button className="tutorial-button" onClick={this.updateSettingsModal} disabled={this.isGridAnimating}> Settings </button>
                </div>
            </div>
        )
    }
}


export default AppContainer