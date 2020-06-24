const aStarKWallsRemoval = (board, start, end, mode = "rook", wallBreak = 1) => {

    const colMax = board[0].length
    const rowMax = board.length

    const nodesVisitedTracker = new Array(board.length)
    const heuristicVal = new Array(board.length)
    const totalCost = new Array(board.length)

    const uniquePathDistances = {}
    const previousNode = {}
    const queue = new PriorityQueue()
    const moves = {
        queen: [[0, 1], [1, 0], [0, -1], [-1, 0], [1, 1], [1, -1], [-1, -1], [-1, 1]],
        bishop: [[1, 1], [1, -1], [-1, -1], [-1, 1]],
        rook: [[0, 1], [1, 0], [0, -1], [-1, 0]]
    }

    // return values
    const shortestPath = []
    const nodesVisited = []

    for (let row = 0; row < board.length; row++) {
        nodesVisitedTracker[row] = new Array(board[0].length).fill(false)
        totalCost[row] = new Array(board[0].length).fill(Infinity)
        heuristicVal[row] = new Array(board[0].length)
        for (let col = 0; col < board[0].length; col++) {
            if (mode === "bishop" || mode === "queen") {
                heuristicVal[row][col] = Math.sqrt((row - end[0]) ** 2 + (col - end[1]) ** 2)
            } else {
                heuristicVal[row][col] = Math.abs(row - end[0]) + Math.abs(col - end[1])
            }
        }
    }
    // distancesVal[start[0]][start[1]] = 0

    uniquePathDistances[`${start[0]}-${start[1]}-${wallBreak}`] = 0
    previousNode[`${start[0]}-${start[1]}-${wallBreak}`] = "none"


    queue.enqueue(start, 0, 0, wallBreak)

    while (queue.values.length) {
        const deQ = queue.dequeue()
        const curRow = deQ.node[0]
        const curCol = deQ.node[1]
        const curWallBreak = deQ.wallBreakLeft

        // check if target is reached
        if (curRow === end[0] && curCol === end[1]) {

            shortestPath.push(end)
            let [backtrackRow, backtrackCol, backtrackWallBreak] = previousNode[`${curRow}-${curCol}-${curWallBreak}`]

            while (previousNode[`${backtrackRow}-${backtrackCol}-${backtrackWallBreak}`] !== "none") {
                shortestPath.unshift([backtrackRow, backtrackCol])
                let [prevRow, prevCol, prevWallBreak] = previousNode[`${backtrackRow}-${backtrackCol}-${backtrackWallBreak}`]
                backtrackRow = prevRow
                backtrackCol = prevCol
                backtrackWallBreak = prevWallBreak
            }
            shortestPath.unshift(start)
            return [shortestPath, nodesVisited, uniquePathDistances[`${curRow}-${curCol}-${curWallBreak}`]]
        }

        if (deQ) {
            // check all directions, and add to priority queue
            const directions = moves[mode]
            if (!nodesVisitedTracker[curRow][curCol]) nodesVisited.push([curRow, curCol])

            for (let direction of directions) {
                let dRow = curRow + direction[0]
                let dCol = curCol + direction[1]
                // check if its within bounds
                if (dRow >= 0 && dCol >= 0 && dRow < rowMax && dCol < colMax) {

                    // A* => f = g + h
                    // look for smallest f
                    // f = total cost to go to this node
                    // g = distance from start to current
                    // h = distance from current to end

                    const distanceFromStart = deQ.weight + board[dRow][dCol].weight
                    const cost = distanceFromStart + heuristicVal[dRow][dCol]

                    // calculate the lowest cost and add into 
                    if (board[dRow][dCol].wall && curWallBreak > 0) {
                        const dKey = `${dRow}-${dCol}-${curWallBreak-1}`
                        if (cost < totalCost[dRow][dCol] && (uniquePathDistances[dKey] === undefined || distanceFromStart < uniquePathDistances[dKey])) {
                            uniquePathDistances[dKey] = distanceFromStart
                            totalCost[dRow][dCol] = cost
                            previousNode[dKey] = [curRow, curCol, curWallBreak]
                            queue.enqueue([dRow, dCol], distanceFromStart, cost, curWallBreak-1)
                        }

                    } else if (!board[dRow][dCol].wall) {
                        const dKey = `${dRow}-${dCol}-${curWallBreak}`
                        if (cost < totalCost[dRow][dCol] && (uniquePathDistances[dKey] === undefined || distanceFromStart < uniquePathDistances[dKey])) {
                            uniquePathDistances[dKey] = distanceFromStart
                            totalCost[dRow][dCol] = cost
                            previousNode[dKey] = [curRow, curCol, curWallBreak]
                            queue.enqueue([dRow, dCol], distanceFromStart, cost, curWallBreak)
                        }
                    }
                }
            }
        }

    }
    return [[], nodesVisited]
}

class PriorityQueue {
    constructor() {
        this.values = []
    }

    enqueue = (node, weight, cost, wallBreakLeft) => {
        this.values.unshift({ node, weight, cost, wallBreakLeft })
        this.sort()
    }

    dequeue = () => {
        return this.values.shift()
    }


    sort = () => {
        this.values.sort((a, b) => a.cost - b.cost)
    }

}


export default aStarKWallsRemoval