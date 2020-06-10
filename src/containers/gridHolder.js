import React from 'react'
import GridNode from '../components/gridNode'
import dijkstra from '../algorithms/dijkstra'


export default class GridHolder extends React.Component {
 
    constructor(props) {
        super(props)
        this.state = {
            isBuilding: false,
            isTearing: false,
            isDrawing: false,
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
        } 
        if (event.type === "mousedown" && this.props.selection === "teardown") {
            this.setState({
                isTearing: true
            })
        } else if (event.type === "mouseup" && this.props.selection === "teardown") {
            this.setState({
                isTearing: false
            })
        } 
    }

    addWall = (x,y) => {
        const grid = this.updateGridWithWall(this.state.grid, x, y)
        this.setState({
            grid
        })
    }

    deleteWall = (x,y) => {
        const grid = this.updateGridWithoutWall(this.state.grid, x, y)
        this.setState({
            grid
        })
    }

    drawDijkstra = () => {
        // perform algorithm visualization
        const [path, visited] = dijkstra(this.state.grid, this.state.start, this.state.end)
        const visitedNodesLen = visited.length
        setTimeout(() => {
            for (let i = 0; i < path.length; i++) {
                setTimeout(() => {
                    const node = path[i];
                    document.getElementById(`node-row-${node[0]}-col-${node[1]}`).style.backgroundColor = "orange"
                }, 50 * i)
            }
        }, visitedNodesLen * 5 + 500)

        for (let i = 1; i < visitedNodesLen; i++) {
            setTimeout(() => {
                const node = visited[i];
                document.getElementById(`node-row-${node[0]}-col-${node[1]}`).style.backgroundColor = "cornflowerblue"
            }, 5 * i)
        }
    }

    // updates the start point & end point
    updateStart = (row, col) => {
        const grid = this.state.grid
        const [startRow, startCol] = this.state.start
        grid[startRow][startCol].start = false
        grid[row][col].start = true
        this.setState({
            start: [row, col],
            grid: grid
        })
    }

    updateEnd = (row, col) => {
        this.setState({
            end: [row, col]
        })
    }

    // generates the grid
    generateGrid = () => {
        const generatedGrid = new Array(this.state.size)
        const [startRow, startCol] = this.state.start
        const [endRow, endCol] = this.state.end
        
        for (let row = 0; row < generatedGrid.length; row++) {
            generatedGrid[row] = new Array(this.state.size)
            for (let col = 0; col < generatedGrid[row].length; col++) {
                generatedGrid[row][col] = {wall: false, start: false, end: false, visited: false, path: false}
            }
        }

        // it must me the reverse because of how frontend is generated
        generatedGrid[startRow][startCol]["start"] = true
        generatedGrid[endRow][endCol]["end"] = true
        return generatedGrid
    }

    //updating the wall
    updateGridWithWall = (grid, row, col) => {
        const newGrid = grid.slice()
        const [startRow, startCol] = this.state.start
        const [endRow, endCol] = this.state.end
        if (row === startRow && col === startCol) return newGrid
        if (row === endRow && col === endCol) return newGrid
        newGrid[row][col].wall = true
        return newGrid
    }
    
    updateGridWithoutWall = (grid, row, col) => {
        const newGrid = grid.slice()
        const [startRow, startCol] = this.state.start
        const [endRow, endCol] = this.state.end
        if (row === startRow && col ===startCol) return newGrid
        if (row === endRow && col === endCol) return newGrid
        newGrid[row][col].wall = false
        return newGrid
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
            grid: generatedGrid
        })
    }

    render() {
        return(
            <> 
                <div className="main-holder" style={{width: "1000px", height: "800px"}} >
                    {this.state.grid.map((row, rowIdx) => {
                        return this.fillRow(rowIdx)
                    })}
                </div>
                <button onClick={this.drawDijkstra}> Visualize Path Finding!</button>
            </>
        )
    }
}



