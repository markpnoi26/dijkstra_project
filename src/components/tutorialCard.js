import React from 'react'

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

    render() {
        return (
            <div>
                <h1> {this.props.title? this.props.title:this.state.defaultTitle} </h1>
                <div>
                    <img 
                        src={this.props.img? this.props.img:this.state.defaultImg} 
                        alt={this.props.alt? this.props.alt:this.state.defaultAlt}
                    />
                </div>

                <div>
                    <p>
                        {this.props.description? this.props.description: this.state.defaultDescription}
                    </p>
                </div>
            </div>
        )
    }
}