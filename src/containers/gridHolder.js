import React from 'react'
import GridNode from '../components/gridNode'
import dijkstra from '../algorithms/dijkstra'


export default class GridHolder extends React.Component {
 
    constructor(props) {
        super(props)
        this.state = {
            isBuilding: false,
            isTearing: false,
            isCurrentlyAnimating: false,
            originalStart: [5, 5],
            originalEnd: [8, 5],
            start: [],
            end: [],
            size: 20,
            originalGrid: [],
            modifiedGrid: []
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
        const grid = this.state.modifiedGrid.slice()
        const [startRow, startCol] = this.state.start
        const [endRow, endCol] = this.state.end
        if (row === startRow && col === startCol) return 
        if (row === endRow && col === endCol) return 
        grid[row][col].wall = true
        this.setState({
            modifiedGrid: grid
        })
    }

    deleteWall = (row, col) => {
        const grid = this.state.modifiedGrid.slice()
        const [startRow, startCol] = this.state.start
        const [endRow, endCol] = this.state.end
        if (row === startRow && col === startCol) return 
        if (row === endRow && col === endCol) return 
        grid[row][col].wall = false
        this.setState({
            modifiedGrid: grid
        })
    }

    // updates the start point & end point
    updateStart = (row, col) => {
        const grid = this.state.modifiedGrid
        const [startRow, startCol] = this.state.start
        if (startRow && startCol) {
            grid[startRow][startCol].start = false
        }
        grid[row][col].start = true
        this.setState({
            start: [row, col],
            modifiedGrid: grid
        })
    }

    updateEnd = (row, col) => {
        const grid = this.state.modifiedGrid
        const [endRow, endCol] = this.state.end

        if (endRow && endCol) {
            grid[endRow][endCol].end = false
        }
        grid[row][col].end = true
        this.setState({
            end: [row, col],
            modifiedGrid: grid
        })
    }

    // perform algorithm visualization
    drawDijkstra = () => {
        // if the input is not valid, the code will not execute.
        if (!this.state.start.length || !this.state.end.length) return alert("Please pick a start point and an end point.")
        // declare constants first
        const [path, visited] = dijkstra(this.state.modifiedGrid, this.state.start, this.state.end)
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
            const grid = this.state.modifiedGrid
            for (let i = 0; i < path.length; i++) {
                setTimeout(() => {
                    const node = path[i];
                    grid[node[0]][node[1]].visited = false
                    grid[node[0]][node[1]].path = true
                    this.setState({ modifiedGrid: grid })
                }, this.props.animationSpeed * i)
            }
        }, visitedNodesLen * this.props.animationSpeed + 500)


        const grid = this.state.modifiedGrid
        for (let i = 0; i < visitedNodesLen; i++) {
            setTimeout(() => {
                const node = visited[i];
                grid[node[0]][node[1]].visited = true
                this.setState({ modifiedGrid: grid })
            }, this.props.animationSpeed * i)
        }
    }

    // generates the grid
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

    // reset the board
    resetBoard = () => {
        const newGrid = this.generateGrid() 
        this.setState({
            modifiedGrid: newGrid,
            start: [],
            end: []
        })
    }

    // create frontend grid with special Nodes
    fillCol(rowIdx) {

        return(
            this.state.modifiedGrid[rowIdx].map((node, colIdx) => {
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

    componentDidMount = () => {
        // generate grid
        const generatedGrid = this.generateGrid()
        this.setState({
            modifiedGrid: generatedGrid
        })
    }

    render() {
        return(
            <> 
                <div className="main-holder" style={{width: "1000px", height: "800px"}} >
                    {this.state.modifiedGrid.map((row, rowIdx) => {
                        return this.fillRow(rowIdx)
                    })}
                </div>
                <button onClick={this.drawDijkstra} disabled={this.state.isCurrentlyAnimating}> Visualize Path Finding!</button>
                <button onClick={this.resetBoard} disabled={this.state.isCurrentlyAnimating}>Reset Board</button>
            </>
        )
    }
}



