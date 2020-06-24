import React from 'react'
import '../component-styles/modal.css'
import welcome from '../tutorial-public/welcome.gif'
import moveStart from '../tutorial-public/moveStart.gif'
import moveEnd from '../tutorial-public/moveEnd.gif'
import buildWalls from '../tutorial-public/buildWalls.gif'
import deleteWalls from '../tutorial-public/deleteWalls.gif'
import toggleResistance from '../tutorial-public/toggleResistance.gif'
import rookMode from '../tutorial-public/rookMode.gif'
import bishopMode from '../tutorial-public/bishopMode.gif'
import queenMode from '../tutorial-public/queenMode.gif'
import randomMaze from '../tutorial-public/randomMaze.gif'
import startPathFinding from '../tutorial-public/startPathFinding.gif'

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
            <div className="modal-card">
                <h1 className="tutorial-header"> {this.props.title? this.props.title:this.state.defaultTitle} </h1>
                <div className="tutorial-img-holder">
                    <img 
                        src={this.setImage()}
                        alt={this.props.alt? this.props.alt:this.state.defaultAlt}
                        style={{
                            height: "400px"
                        }}
                        className="tutorial"
                    />
                </div>
                <div className="tutorial-button-holder">
                    <button className="tutorial-button" onClick={this.props.prevPage} disabled={this.props.current === 0}> &#8592; </button>
                    <button className="tutorial-button" onClick={this.props.nextPage} disabled={this.props.current === 11}> &#8594; </button>
                </div>
                <div className="tutorial-desc-holder">
                    <p>
                        {this.props.description? this.props.description: this.state.defaultDescription}
                    </p>
                </div>
                <div style={{display: this.props.links === undefined? 'none':"inline-block"}}>
                    {this.props.links !== undefined? this.props.links.map((link, linkIdx) => {
                        return (<div key={linkIdx}><a href={link[1]}> {link[0]} </a></div>)
                    }): <></>}
                </div>
                
                <div><h4>{this.props.current+1}/12</h4></div>
                <button className="tutorial-button" onClick={this.props.closeModal}> Close </button>
            </div>
        )
    }
}