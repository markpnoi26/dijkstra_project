import React from 'react'
import '../component-styles/navBar.css'


export default class NavBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render () {
        return(
            <div className="nav-bar">
                <div>
                    <label> Selection: </label>
                    <select value={this.props.currentSelection} onChange={this.props.handleSelectionChange} disabled={this.props.isCurrentlyAnimating}> 
                        <option value="buildWall">Build Node Walls</option>
                        <option value="tearWall">Delete Node Walls</option>
                        <option value="toggleWeight">Toggle Node Resistance</option>
                    </select>

                    <label> Algorithm: </label>
                    <select value={this.props.currentAlgorithm} onChange={this.props.handleAlgorithmChange} disabled={this.props.isCurrentlyAnimating}> 
                        <option value="dfs">DFS</option>
                        <option value="bfs">BFS</option>
                        <option value="dijkstra">Dijkstra Shortest Path</option>
                        <option value="aStar">A*</option>
                    </select>
                    <label> Mode: </label>
                    <select value={this.props.currentMode} onChange={this.props.handleModeChange} disabled={this.props.isCurrentlyAnimating}> 
                        <option value="rook">Rook (horizonal/vertical exploration)</option>
                        <option value="bishop">Bishop (diagonal exploration)</option>
                        <option value="queen">Queen (all directions)</option>
                    </select>
                </div>

                <div>
                    <button onClick={this.props.resetBoard} disabled={this.props.isCurrentlyAnimating}>Reset Board</button>
                    <button onClick={this.props.resetWalls} disabled={this.props.isCurrentlyAnimating}>Reset Walls</button>
                    <button onClick={this.props.resetVisitedPath} disabled={this.props.isCurrentlyAnimating}>Reset Visited/Path</button>
                    <button onClick={this.props.drawVisualization} disabled={this.props.isCurrentlyAnimating}> Visualize Path Finding</button>
                    <button onClick={this.props.drawMaze} disabled={this.props.isCurrentlyAnimating}> Create Random Maze</button>
                </div>

            </div>
        )
    }
}