const dijkstra = (board, start, end) => {

    const colMax = board[0].length
    const rowMax = board.length
    const distances = new Array(board.length)
    const previousNode = {}
    const queue = new PriorityQueue()

    // return values
    const shortestPath = []
    const nodesVisited = []

    let deQ;

    for (let row=0; row<board.length; row++) {
        distances[row] = new Array(board[0].length).fill(Infinity)
    }
    distances[start[0]][start[1]] = 0
    previousNode[`${start[0]}-${start[1]}`] = "none"

    queue.enqueue(start, 0) 

    while (queue.values.length) {
        deQ = queue.dequeue()
        const curRow = deQ.node[0]
        const curCol = deQ.node[1]
        
        // check if target is reached
        if (curRow === end[0] && curCol === end[1]) {
            
            shortestPath.push(end)
            let [backtrackRow, backtrackCol] = previousNode[`${curRow}-${curCol}`]

            while (previousNode[`${backtrackRow}-${backtrackCol}`] !== "none") {
                shortestPath.unshift([backtrackRow, backtrackCol])
                let [prevRow, prevCol] = previousNode[`${backtrackRow}-${backtrackCol}`]
                backtrackRow = prevRow
                backtrackCol = prevCol
            }
            shortestPath.unshift(start)
            return [shortestPath, nodesVisited]
        }

        if (deQ) {
            // check all directions, and add to priority queue
            const directions = [[0,1], [1,0], [0,-1], [-1,0]]
            nodesVisited.push([curRow, curCol])
            
            for (let direction of directions) {
                let dRow = curRow + direction[0]
                let dCol = curCol + direction[1]
                // check if its within bounds
                if (dRow >= 0 && dCol >= 0 && dRow < rowMax && dCol < colMax && !board[dRow][dCol].wall) {
                    const newWt = deQ.wt+1
                    if (newWt < distances[dRow][dCol]) {
                        distances[dRow][dCol] = newWt
                        previousNode[`${dRow}-${dCol}`] = [curRow, curCol]
                        queue.enqueue([dRow, dCol], newWt)
                    }
                }
            }
        }

    }

    console.log("No path to end node found. Check to see you have created no walls around the end point.")
    return[[],nodesVisited]
}

class PriorityQueue {
    constructor() {
        this.values = []
    }

    enqueue = (node, wt) => {
        this.values.push({node, wt})

    }

    dequeue = () => {
        return this.values.shift()
    }


    sort = () => {
        this.values.sort((a, b) => a.wt - b.wt)
    }
    
}


export default dijkstra