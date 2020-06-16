const dfs = (board, start, end, mode="rook") => {
    const colMax = board[0].length
    const rowMax = board.length
    const distancesVal = new Array(board.length)
    const previousNode = {}
    const queue = new Stack()
    const moves = {
        queen: [[0,1], [1,0], [0,-1], [-1,0],[1,1], [1,-1], [-1,-1], [-1,1]],
        bishop: [[1,1], [1,-1], [-1,-1], [-1,1]],
        rook: [[1,0],[0,1],[-1,0], [0,-1]]
    }

    // return values
    const shortestPath = []
    const nodesVisited = []

    let deQ;

    for (let row=0; row<board.length; row++) {
        distancesVal[row] = new Array(board[0].length).fill(Infinity)
    }
    distancesVal[start[0]][start[1]] = 0
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
            return [shortestPath, nodesVisited, distancesVal[end[0]][end[1]]]
        }

        if (deQ) {
            // check all directions, and add to priority queue
            const directions = moves[mode]
            nodesVisited.push([curRow, curCol])
            
            for (let direction of directions) {
                let dRow = curRow + direction[0]
                let dCol = curCol + direction[1]
                // check if its within bounds
                if (dRow >= 0 && dCol >= 0 && dRow < rowMax && dCol < colMax && !board[dRow][dCol].wall) {
                    const distanceFromStart = deQ.weight + board[dRow][dCol].weight
                    if (distancesVal[dRow][dCol] === Infinity) {
                        distancesVal[dRow][dCol] = distanceFromStart
                        previousNode[`${dRow}-${dCol}`] = [curRow, curCol]
                        queue.enqueue([dRow, dCol], distanceFromStart)
                    }
                }
            }
        }

    }

    return[[], nodesVisited]
}

class Stack {
    constructor() {
        this.values = []
    }

    enqueue = (node, weight) => {
        this.values.push({node, weight})
    }

    dequeue = () => {
        return this.values.pop()
    }

    
}


export default dfs
