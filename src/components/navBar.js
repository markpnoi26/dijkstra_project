import React from 'react'
import '../component-styles/navBar.css'


export default class NavBar extends React.Component {

    render () {
        return(
            <div className="nav-bar">
                <div>
                    <label className="label-name"> Manipulate Grid: </label>
                    <select className="drop-down" value={this.props.currentSelection} onChange={this.props.handleSelectionChange} disabled={this.props.isCurrentlyAnimating}> 
                        <option value="buildWall">Build Node Walls</option>
                        <option value="tearWall">Delete Node Walls</option>
                        <option value="toggleWeight">Toggle Node Resistance</option>
                    </select>

                    <label className="label-name"> Algorithm: </label>
                    <select className="drop-down" value={this.props.currentAlgorithm} onChange={this.props.handleAlgorithmChange} disabled={this.props.isCurrentlyAnimating}> 
                        <option value="dijkstra">Dijkstra Shortest Path</option>
                        <option value="aStar">A*</option>
                        <option value="dfs">DFS</option>
                        <option value="bfs">BFS</option>
                        <option value="bfsKWallsRemoval"> BFS (1) Wall Removal</option>
                    </select>
                    <label className="label-name"> Mode: </label>
                    <select className="drop-down" value={this.props.currentMode} onChange={this.props.handleModeChange} disabled={this.props.isCurrentlyAnimating}> 
                        <option value="rook">Rook</option>
                        <option value="bishop">Bishop</option>
                        <option value="queen">Queen</option>
                    </select>
                    <button className="button-visualize" onClick={this.props.drawVisualization} disabled={this.props.isCurrentlyAnimating}> Visualize Path Finding</button>
                </div>

                <div>
                    <button className="button" onClick={this.props.resetBoard} disabled={this.props.isCurrentlyAnimating}>Reset Board</button>
                    <button className="button" onClick={this.props.resetWalls} disabled={this.props.isCurrentlyAnimating}>Reset Walls</button>
                    <button className="button" onClick={this.props.resetVisitedPath} disabled={this.props.isCurrentlyAnimating}>Reset Visited/Path</button>
                    <button className="button" onClick={this.props.drawMaze} disabled={this.props.isCurrentlyAnimating}> Generate Random Maze </button>
                </div>

            </div>
        )
    }
}