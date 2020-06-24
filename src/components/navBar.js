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
                        <option value="bfs">BFS</option>
                        <option value="dfs">DFS (no wall removal)</option>
                    </select>

                    <label className="label-name"> Walls To Remove: </label>
                    <select className="drop-down" value={this.props.currentWallsToRemove} onChange={this.props.handleWallsToRemoveChange} disabled={this.props.isCurrentlyAnimating}>
                        <option value={0}>0</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
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