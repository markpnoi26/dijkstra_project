import React from 'react'
import GridNode from '../components/gridNode'
import dijkstraHorizontal from '../algorithms/dijkstraHorizontal'
// import dijkstraDiagonal from '../algorithms/dijkstraDiagonal'
// import dijkstraCombined from '../algorithms/dijkstraCombined'


export default class GridHolder extends React.Component {
 
    constructor(props) {
        super(props)
        this.state = {
            isBuilding: false,
            isTearing: false,
            isCurrentlyAnimating: false,
            originalStart: [15, 5],
            originalEnd: [15, 24],
            start: [15, 5],
            end: [15, 24],
            size: 30,
            grid: []
        }
    }

    //this handle the painting of the walls which is passed down to the child element
    handleMouseEvent = (event) => {
        if (event.type === "mousedown" && this.props.selection === "wall") {
            this.setState({
                isBuilding: true
            })
        } else if (event.type === "mouseup" && this.props.selection === "wall") {
            this.setState({
                isBuilding: false
            })
        } else if (event.type === "mousedown" && this.props.selection === "teardown") {
            this.setState({
                isTearing: true
            })
        } else if (event.type === "mouseup" && this.props.selection === "teardown") {
            this.setState({
                isTearing: false
            })
        } 
    }

    // updates the wall 

    addWall = (row, col) => {
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
        const grid = this.state.grid.slice()
        const [startRow, startCol] = this.state.start
        grid[startRow][startCol].start = false
        grid[row][col].start = true
        this.setState({
            start: [row, col],
            grid: grid
        })
    }

    updateEnd = (row, col) => {
        const grid = this.state.grid.slice()
        const [endRow, endCol] = this.state.end
        grid[endRow][endCol].end = false
        grid[row][col].end = true
        this.setState({
            end: [row, col],
            grid: grid
        })
    }

    // perform algorithm visualization
    drawDijkstra = () => {
        // if the input is not valid, the code will not execute.
        if (!this.state.start.length || !this.state.end.length) return alert("Please pick a start point and an end point.")
        // declare constants first
        const [path, visited] = dijkstraHorizontal(this.state.grid, this.state.start, this.state.end)
        const pathLen = path.length
        const visitedNodesLen = visited.length

        // disable buttons while animating for a set amount of time.
        this.setState({isCurrentlyAnimating: !this.state.isCurrentlyAnimating})
        setTimeout(() => {
            this.setState({
                isCurrentlyAnimating: !this.state.isCurrentlyAnimating
            })
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
    }

    // reset the board
    resetBoard = () => {
        const newGrid = this.generateGrid() 
        this.setState({
            grid: newGrid
        }, () => {
            this.updateStart(this.state.originalStart[0], this.state.originalStart[1])
            this.updateEnd(this.state.originalEnd[0], this.state.originalEnd[1])
        })
    }

    // generates the grid that will be used to create the frontend grid
    generateGrid = () => {
        const generatedGrid = new Array(this.state.size)
        for (let row = 0; row < generatedGrid.length; row++) {
            generatedGrid[row] = new Array(this.state.size)
            for (let col = 0; col < generatedGrid[row].length; col++) {
                generatedGrid[row][col] = {wall: false, start: false, end: false, visited: false, path: false}
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
                        selection={this.props.selection} 
                        start={node.start} 
                        end={node.end}
                        wall={node.wall}
                        visited={node.visited}
                        path={node.path}
                        updateStart={this.updateStart} 
                        updateEnd={this.updateEnd} 
                        isBuilding={this.state.isBuilding} 
                        isTearing={this.state.isTearing}
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
                <div className="main-holder" style={{width: "1000px", height: "850px"}} >
                    {this.state.grid.map((row, rowIdx) => {
                        return this.fillRow(rowIdx)
                    })}
                </div>
                <button onClick={this.drawDijkstra} disabled={this.state.isCurrentlyAnimating}> Visualize Path Finding!</button>
                <button onClick={this.resetBoard} disabled={this.state.isCurrentlyAnimating}>Reset Board</button>
            </>
        )
    }
}



