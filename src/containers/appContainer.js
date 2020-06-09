import React from 'react'
import GridHolder from './gridHolder'
import SelectionHolder from './selectionHolder'


class AppContainer extends React.Component {

    // maybe move start, end, size, nodes Visited, shortest path down to gridHolder
    constructor() {
        super() 
        this.state = {
            selection: null
        }
    }

    updateSelection = (selection) => {
        this.setState({
            selection: selection
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