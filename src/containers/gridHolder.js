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
            start: [5, 15],
            end: [24, 15],
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
                    document.getElementById(`node-x-${node[0]}-y-${node[1]}`).style.backgroundColor = "orange"
                }, 50 * i)
            }
        }, visitedNodesLen * 5 + 500)

        for (let i = 1; i < visitedNodesLen; i++) {
            setTimeout(() => {
                const node = visited[i];
                document.getElementById(`node-x-${node[0]}-y-${node[1]}`).style.backgroundColor = "cornflowerblue"
            }, 5 * i)
        }
    }

    // updates the start point & end point
    updateStart = (coordinates) => {
        const grid = this.state.grid
        const [startX, startY] = this.state.start
        grid[startY][startX].start = false
        grid[coordinates[1]][coordinates[0]].start = true
        this.setState({
            start: [coordinates[0], coordinates[1]],
            grid: grid
        })
    }

    updateEnd = (coordinates) => {
        this.setState({
            end: [coordinates[0], coordinates[1]]
        })
    }

    // generates the grid
    generateGrid = () => {
        const generatedGrid = new Array(this.state.size)
        const [startX, startY] = this.state.start
        const [endX, endY] = this.state.end
        
        for (let x = 0; x < generatedGrid.length; x++) {
            generatedGrid[x] = new Array(this.state.size)
            for (let y = 0; y < generatedGrid[x].length; y++) {
                generatedGrid[x][y] = {wall: false, start: false, end: false, visited: false, path: false}
            }
        }

        // it must me the reverse because of how frontend is generated
        generatedGrid[startY][startX]["start"] = true
        generatedGrid[endY][endX]["end"] = true
        return generatedGrid
    }

    //updating the wall
    updateGridWithWall = (grid, x, y) => {
        const newGrid = grid.slice()
        const [startX, startY] = this.state.start
        const [endX, endY] = this.state.end
        if (x === startX && y ===startY) return newGrid
        if (x === endX && y ===endY) return newGrid
        newGrid[x][y].wall = true
        return newGrid
    }
    
    updateGridWithoutWall = (grid, x, y) => {
        const newGrid = grid.slice()
        const [startX, startY] = this.state.start
        const [endX, endY] = this.state.end
        if (x === startX && y ===startY) return newGrid
        if (x === endX && y ===endY) return newGrid
        newGrid[x][y].wall = false
        return newGrid
    }

    // create frontend grid with special Nodes
    fillCol(rowIdx) {

        return(
            this.state.grid[rowIdx].map((col, colIdx) => {
                return (
                    <GridNode 
                        key={`node-x-${colIdx}-y-${rowIdx}`}
                        x={colIdx} y={rowIdx} 
                        selection={this.props.selection} 
                        start={col.start} 
                        end={col.end}
                        wall={col.wall}
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
            <div className="row-holder" key={`row-y-${rowIdx}`} style={{display: "table"}}> 
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



