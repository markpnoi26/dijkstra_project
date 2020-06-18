import React from 'react'
import '../component-styles/tutorialCard.css'
import welcome from '../tutorial-styles/welcome.gif'
import moveStart from '../tutorial-styles/moveStart.gif'
import moveEnd from '../tutorial-styles/moveEnd.gif'
import buildWalls from '../tutorial-styles/buildWalls.gif'
import deleteWalls from '../tutorial-styles/deleteWalls.gif'
import toggleResistance from '../tutorial-styles/toggleResistance.gif'
import rookMode from '../tutorial-styles/rookMode.gif'
import bishopMode from '../tutorial-styles/bishopMode.gif'
import queenMode from '../tutorial-styles/queenMode.gif'
import randomMaze from '../tutorial-styles/randomMaze.gif'
import startPathFinding from '../tutorial-styles/startPathFinding.gif'

export default class TutorialCard extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            defaultTitle: "Welcome to Path Finder!",
            defaultImg: "default.jpg",
            defaultDescription: "This is a default card description",
            defaultAlt: "Welcome"
        }
    }

    setImage = () => {
        switch(this.props.img) {
            case "welcome":
                return welcome
            case 'moveStart':
                return moveStart
            case 'moveEnd':
                return moveEnd
            case 'buildWall':
                return buildWalls
            case 'deleteWall':
                return deleteWalls
            case 'toggleResistance':
                return toggleResistance
            case 'randomMaze':
                return randomMaze
            case 'rookMode':
                return rookMode
            case 'bishopMode':
                return bishopMode
            case 'queenMode':
                return queenMode
            case 'startPathFinding':
                return startPathFinding
            default: 
                return this.state.defaultImg
        }
    }

    render() {
        return (
            <div className="tutorial-card">
                <h1 className="tutorial-header"> {this.props.title? this.props.title:this.state.defaultTitle} </h1>
                <div className="tutorial-img-holder">
                    <img 
                        src={this.setImage()}
                        alt={this.props.alt? this.props.alt:this.state.defaultAlt}
                        style={{
                            height: "400px"
                        }}
                    />
                </div>

                <div className="tutorial-desc-holder">
                    <p>
                        {this.props.description? this.props.description: this.state.defaultDescription}
                    </p>
                </div>
            </div>
        )
    }
}