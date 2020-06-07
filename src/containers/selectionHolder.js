import React from 'react'
import GridSelection from '../components/gridSelection'


class SelectionHolder extends React.Component {
    render() {
       return (
           <GridSelection updateSelection={this.props.updateSelection}/>
       )
    }
}


export default SelectionHolder