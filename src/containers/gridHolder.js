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
        const grid = updateGridWithWall(this.state.grid, x, y)
        this.setState({
            grid
        })
    }

    deleteWall = (x,y) => {
        const grid = updateGridWithoutWall(this.state.grid, x, y)
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
                document.getElementById(`node-x-${node[0]}-y-${node[1]}`).style.backgroundColor = "blue"
            }, 5 * i)
        }
    }

    // updates the start point & end point
    updateStart = (coordinates) => {
        this.setState({
            start: [coordinates[0], coordinates[1]]
        })
    }

    updateEnd = (coordinates) => {
        this.setState({
            end: [coordinates[0], coordinates[1]]
        })
    }

    // generates the grid
    fillCol(y) {
        const colNum = Array.from(Array(this.state.size).keys())
        return(
            colNum.map((x) => {
                return (
                    <GridNode 
                        key={`node-x-${x}-y-${y}`}
                        x={x} y={y} 
                        selection={this.props.selection} 
                        start={this.state.start} 
                        end={this.state.end} 
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

    fillRow(y) {
        return(
            <div className="row-holder" key={`row-y-${y}`} style={{display: "table"}}> 
               {this.fillCol(y)}
            </div>
        )
    }

    componentDidMount = () => {
        // generate grid
        const generatedGrid = new Array(this.state.size)
        for (let row = 0; row < generatedGrid.length; row++) {
            generatedGrid[row] = new Array(this.state.size).fill(1)
        }

        this.setState({
            grid: generatedGrid
        })
    }

    render() {
        const rowNum = Array.from(Array(this.state.size).keys())
        return(
            <>
                <div className="main-holder" style={{width: "1000px", height: "800px"}} >
                    {rowNum.map((y) => {
                        return this.fillRow(y)
                    })}
                </div>
                <button onClick={this.drawDijkstra}> Visualize Path Finding!</button>
            </>
        )
    }
}

const updateGridWithWall = (grid, x, y) => {
    const newGrid = grid.slice()
    newGrid[x][y] = "*"
    return newGrid
}

const updateGridWithoutWall = (grid, x, y) => {
    const newGrid = grid.slice()
    newGrid[x][y] = 1
    return newGrid
}
