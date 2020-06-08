import React from 'react'
import GridHolder from './gridHolder'
import SelectionHolder from './selectionHolder'


class AppContainer extends React.Component {

    constructor() {
        super() 
        this.state = {
            selection: null,
            start: [5,14],
            end: [24,14],
            size: 30
        }
    }

    updateSelection = (selection) => {
        this.setState({
            selection: selection
        })
        console.log(selection)
    }

    updateStart = (coordinates) => {
        this.setState({
            start: [coordinates[0], coordinates[1]]
        })
    }

    updateEnd = (coordinates) => {
        this.setState({
            end: [coordinates[0], coordinates[1]]
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
                    start={this.state.start} 
                    end={this.state.end} 
                    updateStart={this.updateStart} 
                    updateEnd={this.updateEnd} 
                    size={this.state.size}
                />
            </div>
        )
    }
}


export default AppContainer