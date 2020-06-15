import React from 'react'
import GridNode from '../components/gridNode'
import dijkstra from '../algorithms/dijkstra'
import aStar from '../algorithms/aStar'


export default class GridHolder extends React.Component {
 
    constructor(props) {
        super(props)
        this.state = {
            mode: "rook",
            algorithm: "dijkstra",
            selection: "buildWall",
            isMovingStart: false,
            isMovingEnd: false,
            isBuilding: false,
            isTearing: false,
            isCurrentlyAnimating: false,
            visitedNodes: [],
            pathNodes: [],
            originalStart: [15, 5],
            originalEnd: [15, 24],
            start: [15, 5],
            end: [15, 24],
            animationSpeed: 15,
            rowSize: 30,
            colSize: 50,
            grid: []
        }
    }

    //this handle the painting of the walls which is passed down to the child element
    handleMouseEvent = (event, row, col) => {
        if (this.state.isCurrentlyAnimating) return
        if (event.type === "mousedown" && this.state.start[0] === row && this.state.start[1] === col) {
            this.setState({
                isMovingStart: true
            })
        } else if (event.type === "mouseup" && this.state.isMovingStart) {
            this.setState({
                isMovingStart: false
            })
        } else if (event.type === "mousedown" && this.state.end[0] === row && this.state.end[1] === col) {
            this.setState({
                isMovingEnd: true
            })
        } else if (event.type === "mouseup" && this.state.isMovingEnd) {
            this.setState({
                isMovingEnd: false
            })
        } else if (event.type === "mousedown" && this.state.selection === "buildWall" && !this.state.isMovingStart && !this.state.isMovingEnd) {
            // console.log(row, col)
            const modifiedGrid = this.state.grid.slice()
            modifiedGrid[row][col].wall = true
            this.setState({
                isBuilding: true,
                grid : modifiedGrid
            })
        } else if (event.type === "mouseup" && this.state.selection === "buildWall") {
            this.setState({
                isBuilding: false
            })
        } else if (event.type === "mousedown" && this.state.selection === "tearWall" && !this.state.isMovingStart && !this.state.isMovingEnd) {
            const modifiedGrid = this.state.grid.slice()
            modifiedGrid[row][col].wall = false
            this.setState({
                isTearing: true,
                grid: modifiedGrid
            })
        } else if (event.type === "mouseup" && this.state.selection === "tearWall") {
            this.setState({
                isTearing: false
            })
        } 
    }

    // handles how the visualization method behaves

    handleAlgorithmChange = (event) => {
        this.setState({
            algorithm: event.target.value
        }, () => {
            console.log("current algorithm:", this.state.algorithm)
        })
        
    }

    handleModeChange = (event) => {
        this.setState({
            mode: event.target.value
        }, () => {
            console.log("current mode:", this.state.mode)
        })
    }

    // handles selection changes
    handleSelectionChange = (event) => {
        this.setState({
            selection: event.target.value
        }, () => {
            console.log("current selection:", this.state.selection)
        })
    }

    // updates the wall 

    addWall = (row, col) => {
        if (this.state.isCurrentlyAnimating) return
        const grid = this.state.grid.slice()
        const [startRow, startCol] = this.state.start
        const [endRow, endCol] = this.state.end
        if (row === startRow && col === startCol) return 
        if (row === endRow && col === endCol) return 
        grid[row][col].wall = true
        this.setState({
            grid: grid
        })
    }

    deleteWall = (row, col) => {
        if (this.state.isCurrentlyAnimating) return
        const grid = this.state.grid.slice()
        const [startRow, startCol] = this.state.start
        const [endRow, endCol] = this.state.end
        if (row === startRow && col === startCol) return 
        if (row === endRow && col === endCol) return 
        grid[row][col].wall = false
        this.setState({
            grid: grid
        })
    }

    // updates the start point & end point
    updateStart = (row, col) => {
        if (this.state.isCurrentlyAnimating) return
        const grid = this.state.grid.slice()
        const [startRow, startCol] = this.state.start
        grid[startRow][startCol].start = false
        grid[row][col].start = true
        this.setState({
            start: [row, col],
            grid: grid
        }, () => {
            this.resetVisitedPath()
        })
    }

    updateEnd = (row, col) => {
        if (this.state.isCurrentlyAnimating) return
        const grid = this.state.grid.slice()
        const [endRow, endCol] = this.state.end
        grid[endRow][endCol].end = false
        grid[row][col].end = true
        this.setState({
            end: [row, col],
            grid: grid
        }, () => {
            this.resetVisitedPath()
        })
    }

    // perform algorithm visualization
    drawVisualization = () => {
        // if the input is not valid, the code will not execute.
        if (!this.state.start.length || !this.state.end.length) return alert("Please pick a start point and an end point.")
        // declare constants first
        this.resetVisitedPath()

        const [path, visited] = this.state.algorithm !== "dijkstra"? 
            aStar(this.state.grid, this.state.start, this.state.end, this.state.mode): 
            dijkstra(this.state.grid, this.state.start, this.state.end, this.state.mode)

        this.setState({
            visitedNodes: visited,
            pathNodes: path
        })
        const pathLen = path.length
        const visitedNodesLen = visited.length

        // disable buttons while animating for a set amount of time.
        this.setState({
            isCurrentlyAnimating: !this.state.isCurrentlyAnimating
        })
        setTimeout(() => {
            this.setState({
                isCurrentlyAnimating: !this.state.isCurrentlyAnimating
            })
        }, (this.state.animationSpeed * pathLen) + (this.state.animationSpeed * visitedNodesLen) + 500)

        //animate visited nodes first followed by path (set on a timer after visited nodes are done animating)
        setTimeout(() => {
            const grid = this.state.grid
            for (let i = 0; i < path.length; i++) {
                setTimeout(() => {
                    const node = path[i];
                    grid[node[0]][node[1]].visited = false
                    grid[node[0]][node[1]].path = true
                    this.setState({ grid: grid })
                }, this.state.animationSpeed * i)
            }
        }, visitedNodesLen * this.state.animationSpeed + 500)


        const grid = this.state.grid
        for (let i = 0; i < visitedNodesLen; i++) {
            setTimeout(() => {
                const node = visited[i];
                grid[node[0]][node[1]].visited = true
                this.setState({ grid: grid })
            }, this.state.animationSpeed * i)
        }

        console.log(
            "Relative time it took to find end-node:", 
            visitedNodesLen * this.state.animationSpeed /1000, "seconds.", 
            "Using", this.state.algorithm, "algorithm, with", this.state.mode, "mode"
        ) 
    }

    // reset the certain conditions
    resetBoard = () => {
        const newGrid = this.generateGrid() 
        this.setState({
            grid: newGrid
        }, () => {
            this.updateStart(this.state.originalStart[0], this.state.originalStart[1])
            this.updateEnd(this.state.originalEnd[0], this.state.originalEnd[1])
        })
    }

    resetVisitedPath = () => {
        // const visitedNodes = this.state.visitedNodes.slice()
        const grid = this.state.grid.slice()

        for (let row = 0; row < grid.length; row++) {
            for (let col =0 ; col< grid[row].length; col++) {
                const curNode = grid[row][col]
                curNode.visited = false
                curNode.path = false
            }   
        }
        this.setState({ grid: grid })
    }


    resetWalls = () => {
        const grid = this.state.grid.slice()

        for (let row = 0; row < grid.length; row++) {
            for (let col =0 ; col< grid[row].length; col++) {
                const curNode = grid[row][col]
                curNode.visited = false
                curNode.path = false
                curNode.wall = false
            }   
        }
        this.setState({ grid: grid })
    }
    // generates the grid that will be used to create the frontend grid
    generateGrid = () => {
        const generatedGrid = new Array(this.state.rowSize)
        for (let row = 0; row < generatedGrid.length; row++) {
            generatedGrid[row] = new Array(this.state.colSize)
            for (let col = 0; col < generatedGrid[row].length; col++) {
                generatedGrid[row][col] = {wall: false, start: false, end: false, visited: false, path: false, weight: 1}
            }
        }
        return generatedGrid
    }

    // create frontend grid with special Nodes
    fillCol(rowIdx) {
        return(
            this.state.grid[rowIdx].map((node, colIdx) => {
                return (
                    <GridNode 
                        key={`node-row-${rowIdx}-col-${colIdx}`}
                        col={colIdx} 
                        row={rowIdx} 
                        start={node.start} 
                        end={node.end}
                        wall={node.wall}
                        visited={node.visited}
                        path={node.path}
                        updateStart={this.updateStart} 
                        updateEnd={this.updateEnd} 
                        isBuilding={this.state.isBuilding} 
                        isTearing={this.state.isTearing}
                        isMovingStart={this.state.isMovingStart}
                        isMovingEnd={this.state.isMovingEnd}
                        addWall={this.addWall}
                        deleteWall={this.deleteWall}
                        handleMouseEvent={this.handleMouseEvent}
                    />
                )
            })
        )
    }

    fillRow(rowIdx) {
        return(
            <div className="row-holder" key={`row-${rowIdx}`} style={{display: "table"}}> 
               {this.fillCol(rowIdx)}
            </div>
        )
    }

    // life cycle method to generate and mount the newly created grid.
    componentDidMount = () => {
        // Mount the created grid
        const generatedGrid = this.generateGrid()
        this.setState({
            grid: generatedGrid
        }, () => {
            this.updateStart(this.state.start[0], this.state.start[1])
            this.updateEnd(this.state.end[0], this.state.end[1])
        })
    }

    render() {
        return(
            <> 
                <button onClick={this.resetBoard} disabled={this.state.isCurrentlyAnimating}>Reset Board</button>
                <button onClick={this.resetWalls} disabled={this.state.isCurrentlyAnimating}>Reset Walls</button>
                <button onClick={this.resetVisitedPath} disabled={this.state.isCurrentlyAnimating}>Reset Visited/Path</button>

                <label> Selection: </label>
                <select value={this.state.selection} onChange={this.handleSelectionChange} disabled={this.state.isCurrentlyAnimating}> 
                    <option value="buildWall">Build Walls</option>
                    <option value="tearWall">Tear Walls Down</option>
                </select>

                <label> Algorithm: </label>
                <select value={this.state.algorithm} onChange={this.handleAlgorithmChange} disabled={this.state.isCurrentlyAnimating}> 
                    <option value="dijkstra">Dijkstra Shortest Path</option>
                    <option value="aStar">A*</option>
                </select>
                <label> Mode: </label>
                <select value={this.state.mode} onChange={this.handleModeChange} disabled={this.state.isCurrentlyAnimating}> 
                    <option value="rook">Rook (horizonal/vertical exploration)</option>
                    <option value="bishop">Bishop (diagonal exploration)</option>
                    <option value="queen">Queen (all directions)</option>
                </select>

                <button onClick={this.drawVisualization} disabled={this.state.isCurrentlyAnimating}> Visualize Path Finding</button>
                <div className="main-holder" style={{width: "10000px", height: "1000px"}} >
                    {this.state.grid.map((row, rowIdx) => {
                        return this.fillRow(rowIdx)
                    })}
                </div>
            </>
        )
    }
}



