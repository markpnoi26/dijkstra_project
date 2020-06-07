import React from 'react'
import GridHolder from './gridHolder'
import SelectionHolder from './selectionHolder'


class AppContainer extends React.Component {

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
        console.log(selection)
    }

    render() {
        return (
            <div>
                <SelectionHolder updateSelection={this.updateSelection}/>
                <GridHolder selection={this.state.selection} />
            </div>
        )
    }
}


export default AppContainer