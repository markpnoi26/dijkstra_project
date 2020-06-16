const aStar = (board, start, end, mode="rook") => {

    const colMax = board[0].length
    const rowMax = board.length

    const distancesVal = new Array(board.length)
    const heuristicVal = new Array(board.length)
    const totalCost = new Array(board.length)

    const previousNode = {}
    const queue = new PriorityQueue()
    const moves = {
        queen: [[0,1], [1,0], [0,-1], [-1,0],[1,1], [1,-1], [-1,-1], [-1,1]],
        bishop: [[1,1], [1,-1], [-1,-1], [-1,1]],
        rook: [[0,1], [1,0], [0,-1], [-1,0]]
    }

    // return values
    const shortestPath = []
    const nodesVisited = []

    let deQ;

    for (let row=0; row<board.length; row++) {
        distancesVal[row] = new Array(board[0].length).fill(Infinity)
        totalCost[row] = new Array(board[0].length).fill(Infinity)
        heuristicVal[row] = new Array(board[0].length)
        for (let col=0; col<board[0].length; col++) {
            if (mode === "bishop" || mode === "queen") {
                heuristicVal[row][col] = Math.sqrt((row-end[0])**2 + (col-end[1])**2)
            } else {
                heuristicVal[row][col] = Math.abs(row-end[0]) + Math.abs(col-end[1])
            }
        }
    }
    distancesVal[start[0]][start[1]] = 0

    previousNode[`${start[0]}-${start[1]}`] = "none"


    queue.enqueue(start, 0, 0) 

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

                    // A* => f = g + h
                    // look for smallest f
                    // f = total cost to go to this node
                    // g = distance from start to current
                    // h = distance from current to end

                    const distanceFromStart = deQ.weight + board[dRow][dCol].weight
                    const cost = distanceFromStart + heuristicVal[dRow][dCol]
                    
                    // calculate the lowest cost and add into 
                    if (cost < totalCost[dRow][dCol] && distanceFromStart < distancesVal[dRow][dCol]) {
                        distancesVal[dRow][dCol] = distanceFromStart
                        totalCost[dRow][dCol] = cost
                        previousNode[`${dRow}-${dCol}`] = [curRow, curCol]
                        queue.enqueue([dRow, dCol], distanceFromStart, cost)
                    }
                }
            }
        }

    }
    return[[],nodesVisited]
}

class PriorityQueue {
    constructor() {
        this.values = []
    }

    enqueue = (node, weight, cost) => {
        this.values.unshift({node, weight, cost})
        this.sort()
    }

    dequeue = () => {
        return this.values.shift()
    }


    sort = () => {
        this.values.sort((a, b) => a.cost - b.cost)
    }
    
}


export default aStar