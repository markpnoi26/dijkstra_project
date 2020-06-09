import React from 'react'
import GridNode from '../components/gridNode'


class GridHolder extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isBuilding: false,
            isTearing: false,
            start: [5, 14],
            end: [24, 14],
            size: 30,
            nodesVisited: null,
            shortestPath: null,
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
       const grid = [...this.state.grid]
       grid[y][x] = "*"
       this.setState({ grid: grid})
    }

    deleteWall = (x,y) => {
        const grid = [...this.state.grid]
        grid[y][x] = 1
        this.setState({ grid: grid})
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
            <div className="main-holder" style={{width: "1000px", height: "1000px"}} >
                {rowNum.map((y) => {
                    return this.fillRow(y)
                })}
            </div>
        )
    }
}

export default GridHolder
