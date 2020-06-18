import React from 'react'
import Node from '../components/gridNode'
import '../component-styles/legend.css'

export default class LegendContainer extends React.Component {

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
                                        <Node start={true} />
                                    </td>
                                    <td>
                                        Start Node:
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Node end={true}/>
                                    </td>
                                    <td>
                                        End Node:
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Node weight={3}/>
                                    </td>
                                     <td>
                                        Node with Resistance(3):
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Node weight={5}/>
                                    </td>
                                    <td>
                                        Node with Resistance(5):
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
                                        <Node wall={true}/>
                                    </td>
                                    <td>
                                        Wall Node: 
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Node  weight={1} visited={true} start={false} end={false}/>
                                    </td>
                                    <td>
                                        Visited Node: 
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Node  weight={3} visited={true} start={false} end={false}/>
                                    </td>
                                    <td>
                                        Visited Node w/ Resistance:
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Node />
                                    </td>
                                    <td>
                                        Open/Unvisited Node:
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
                                        <Node weight={1} path={true}/>
                                    </td>
                                    <td>
                                        Shortest Path:
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Node weight={3} path={true}/>
                                    </td>
                                    <td>
                                        Shortest Path Resisted (3):
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Node weight={5} path={true}/>
                                    </td>
                                    <td>
                                        Shortest Path Resisted (5):
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