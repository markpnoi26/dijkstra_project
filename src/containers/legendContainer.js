import React from 'react'
import Node from '../components/gridNode'
import '../component-styles/legend.css'

export default class LegendContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render () {
        return(
            <div className="legend-wrapper">
                <h3> LEGEND </h3>
                <div className="legend-row">
                    <div className="legend-column">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        Start Node:
                                    </td>
                                    <td>
                                        <Node start={true} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        End Node:
                                    </td>
                                    <td>
                                        <Node end={true}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Node with Resistance(3):
                                    </td>
                                    <td>
                                        <Node weight={3}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Node with Resistance(5):
                                    </td>
                                    <td>
                                        <Node weight={5}/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="legend-column">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        Wall Node: 
                                    </td>
                                    <td>
                                        <Node wall={true}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Visited Node: 
                                    </td>
                                    <td>
                                        <Node  weight={1} visited={true} start={false} end={false}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Visited Node w/ Resistance:
                                    </td>
                                    <td>
                                        <Node  weight={3} visited={true} start={false} end={false}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Open/Unvisited Node:
                                    </td>
                                    <td>
                                        <Node />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="legend-column">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        Shortest Path:
                                    </td>
                                    <td>
                                        <Node weight={1} path={true}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Shortest Path Resisted (3):
                                    </td>
                                    <td>
                                        <Node weight={3} path={true}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Shortest Path Resisted (5):
                                    </td>
                                    <td>
                                        <Node weight={5} path={true}/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}