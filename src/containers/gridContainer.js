import React from 'react'
import GridNode from '../components/gridNode'
import NavBar from '../components/navBar'
import dijkstra from '../algorithms/dijkstra'
import aStar from '../algorithms/aStar'
import bfs from '../algorithms/bfs'
import dfs from '../algorithms/dfs'
import recursiveBacktrackerMaze from '../algorithms/recursiveBacktrackerMaze'

import '../component-styles/gridContainer.css'


export default class GridContainer extends React.Component {
 
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
            originalStart: [17, 5],
            originalEnd: [17, 55],
            start: [17, 5],
            end: [17, 55],
            animationSpeed: 15,
            grid: []
        }
    }

    //this handle the painting of the walls, tearing walls down, dragging start, dragging end, adding resistance "weight" to nodes
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
        } else if (event.type === "mousedown"  && this.state.selection === "toggleWeight") {
            const modifiedGrid = this.state.grid.slice()
            let nodeWeight = modifiedGrid[row][col].weight

            if (nodeWeight === 5) {
                modifiedGrid[row][col].weight = 1
            } else {
                modifiedGrid[row][col].weight = nodeWeight + 2
            }

            this.setState({
                grid: modifiedGrid
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
        const modifiedGrid = this.state.grid.slice()
        const [startRow, startCol] = this.state.start
        const [endRow, endCol] = this.state.end
        if (row === startRow && col === startCol) return 
        if (row === endRow && col === endCol) return 
        modifiedGrid[row][col].wall = true
        this.setState({
            grid: modifiedGrid
        })
    }

    deleteWall = (row, col) => {
        if (this.state.isCurrentlyAnimating) return
        const modifiedGrid = this.state.grid.slice()
        const [startRow, startCol] = this.state.start
        const [endRow, endCol] = this.state.end
        if (row === startRow && col === startCol) return 
        if (row === endRow && col === endCol) return 
        modifiedGrid[row][col].wall = false
        this.setState({
            grid: modifiedGrid
        })
    }

    // updates the start point & end point
    updateStart = (row, col) => {
        if (this.state.isCurrentlyAnimating) return
        const modifiedGrid = this.state.grid.slice()
        const [startRow, startCol] = this.state.start
        if (modifiedGrid[row][col].wall) return
        modifiedGrid[startRow][startCol].start = false
        modifiedGrid[row][col].start = true
        this.setState({
            start: [row, col],
            grid: modifiedGrid
        }, () => {
            this.resetVisitedPath()
        })
    }

    updateEnd = (row, col) => {
        if (this.state.isCurrentlyAnimating) return
        const modifiedGrid = this.state.grid.slice()
        const [endRow, endCol] = this.state.end
        if (modifiedGrid[row][col].wall) return
        modifiedGrid[endRow][endCol].end = false
        modifiedGrid[row][col].end = true
        this.setState({
            end: [row, col],
            grid: modifiedGrid
        }, () => {
            this.resetVisitedPath()
        })
    }

    // select which algorithm to run
    runSelectedAlgorithm = () => {
        switch (this.state.algorithm) {
            case "dijkstra":
                return dijkstra(this.state.grid, this.state.start, this.state.end, this.state.mode);
            case "aStar":
                return aStar(this.state.grid, this.state.start, this.state.end, this.state.mode);
            case "bfs":
                return bfs(this.state.grid, this.state.start, this.state.end, this.state.mode);
            case "dfs":
                return dfs(this.state.grid, this.state.start, this.state.end, this.state.mode);
            default:
                return bfs(this.state.grid, this.state.start, this.state.end, this.state.mode)
        }
    }

    // perform algorithm visualization
    drawVisualization = () => {
        // if the input is not valid, the code will not execute.
        if (!this.state.start.length || !this.state.end.length) return alert("Please pick a start point and an end point.")
        this.resetVisitedPath()
        const [path, visited, distance] = this.runSelectedAlgorithm()
        
        // declare constants first
        const pathLen = path.length
        const visitedNodesLen = visited.length

        // disable buttons while animating for a set amount of time.
        // also disables tutorial and settings button which resides in parent component
        this.props.updateIsGridAnimating()
        this.setState({
            isCurrentlyAnimating: !this.state.isCurrentlyAnimating
        })
        setTimeout(() => {
            this.setState({
                isCurrentlyAnimating: !this.state.isCurrentlyAnimating
            }, this.props.updateIsGridAnimating())
        }, (this.props.animationSpeed * pathLen) + (this.props.animationSpeed * visitedNodesLen) + 500)

        //animate visited nodes first followed by path (set on a timer after visited nodes are done animating)
        setTimeout(() => {
            const grid = this.state.grid
            for (let i = 0; i < path.length; i++) {
                setTimeout(() => {
                    const node = path[i];
                    grid[node[0]][node[1]].visited = false
                    grid[node[0]][node[1]].path = true
                    this.setState({ grid: grid })
                }, this.props.animationSpeed * i)
            }
        }, visitedNodesLen * this.props.animationSpeed + 500)


        const grid = this.state.grid
        for (let i = 0; i < visitedNodesLen; i++) {
            setTimeout(() => {
                const node = visited[i];
                grid[node[0]][node[1]].visited = true
                this.setState({ grid: grid })
            }, this.props.animationSpeed * i)
        }

        if (distance !== undefined) {
            console.log(
                "Relative time it took to find end-node:", 
                visitedNodesLen * this.props.animationSpeed /1000, "seconds.", 
                "Using", this.state.algorithm, "algorithm, on", this.state.mode, "mode,", "with a total distance of", distance
            ) 
        } else {
            console.log("No path to end node found. Check to see you have created no walls around the end point.")
        }
        
    }

    // draw Maze
    drawMaze = () => {

        // declare constants
        const modifiedGrid = this.state.grid.slice()
        const [visitedNodes, startAndEndNodes] = recursiveBacktrackerMaze(this.state.grid)
        const visitedNodesLen = visitedNodes.length

        // disable buttons while animating for a set amount of time. Includes parent component buttons
        this.props.updateIsGridAnimating()
        this.setState({
            isCurrentlyAnimating: !this.state.isCurrentlyAnimating
        })
        setTimeout(() => {
            this.setState({
                isCurrentlyAnimating: !this.state.isCurrentlyAnimating
            }, this.props.updateIsGridAnimating())
        }, (this.props.animationSpeed * visitedNodesLen) + 500)


        for (let row = 0; row < modifiedGrid.length; row ++) {
            for (let col = 0; col < modifiedGrid[0].length; col ++) {
                const node = modifiedGrid[row][col]
                node.start = false
                node.end = false
                node.wall = true
                node.weight = 1
                node.path = false
                node.visited = false
            }
        }

        for (let i = 0; i < visitedNodesLen; i++) {
            setTimeout(() => {
                const node = visitedNodes[i];
                modifiedGrid[node[0]][node[1]].wall = false
                this.setState({ grid: modifiedGrid })
            }, this.props.animationSpeed * i)
        }

        setTimeout(() => {
            const [start, end] = startAndEndNodes
            this.updateStart(start[0], start[1])
            this.updateEnd(end[0], end[1])
        }, this.props.animationSpeed * visitedNodesLen)
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
        const generatedGrid = new Array(this.props.rowSize)
        for (let row = 0; row < generatedGrid.length; row++) {
            generatedGrid[row] = new Array(this.props.colSize)
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
                        weight={node.weight}
                        wall={node.wall}
                        visited={node.visited}
                        path={node.path}

                        isBuilding={this.state.isBuilding} 
                        isTearing={this.state.isTearing}
                        isMovingStart={this.state.isMovingStart}
                        isMovingEnd={this.state.isMovingEnd}

                        updateStart={this.updateStart} 
                        updateEnd={this.updateEnd} 
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
            <div className="row-container" key={`row-${rowIdx}`} style={{display: "table"}}> 
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
                <NavBar 
                    resetBoard={this.resetBoard}
                    resetWalls={this.resetWalls}
                    resetVisitedPath={this.resetVisitedPath}
                    drawVisualization={this.drawVisualization}
                    drawMaze={this.drawMaze}
                    handleSelectionChange={this.handleSelectionChange}
                    handleAlgorithmChange={this.handleAlgorithmChange}
                    handleModeChange={this.handleModeChange}

                    isCurrentlyAnimating={this.state.isCurrentlyAnimating}
                    currentSelection={this.state.selection}
                    currentAlgorithm={this.state.algorithm}
                    currentMode={this.state.mode}
                />

                <div className="grid-container" >
                    {this.state.grid.map((row, rowIdx) => {
                        return this.fillRow(rowIdx)
                    })}
                </div>
            </>
        )
    }
}



