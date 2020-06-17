import React from 'react'
import Node from '../components/gridNode'

export default class LegendContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render () {
        return(
            <div>
                <h1> Legend </h1>
                Start Node: <Node start={true} />
                End Node: <Node end={true}/>
                Visited Node: <Node  weight={1} visited={true} start={false} end={false}/>
                Shortest Path Node: <Node  weight={1} path={true}/>
                Shortest Resisted Node (3): <Node weight={3} path={true}/>
                Shortest Resisted Node (5): <Node weight={5} path={true}/>
                Wall: <Node wall={true}/>
                Node with Resistance (3) <Node weight={3}/>
                Node with Resistance (5) <Node weight={5}/>
                Open Node/Unvisited Node <Node />

            </div>
        )
    }
}