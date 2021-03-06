const bfsKWallsRemoval = (board, start, end, mode="rook", wallBreak=1) => {

    const colMax = board[0].length
    const rowMax = board.length

    const nodesVisitedTracker = new Array(board.length)
    const uniquePathDistances = {}
    const previousNode = {}
    const queue = new Queue()
    const moves = {
        queen: [[0,1], [1,0], [0,-1], [-1,0],[1,1], [1,-1], [-1,-1], [-1,1]],
        bishop: [[1,1], [1,-1], [-1,-1], [-1,1]],
        rook: [[0,1], [1,0], [0,-1], [-1,0]]
    }

    // return values
    const shortestPath = []
    const nodesVisited = []

    for (let row = 0; row < board.length; row++) {
        nodesVisitedTracker[row] = new Array(board[0].length).fill(false)
    }
    
    uniquePathDistances[`${start[0]}-${start[1]}-${wallBreak}`] = 0
    previousNode[`${start[0]}-${start[1]}-${wallBreak}`] = "none"

    queue.enqueue(start, wallBreak, 0) 

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
            if (nodesVisitedTracker[curRow][curCol] === false) {
                nodesVisitedTracker[curRow][curCol] = true
                nodesVisited.push([curRow, curCol])
            } 
            
            for (let direction of directions) {
                let dRow = curRow + direction[0]
                let dCol = curCol + direction[1]
                // check if its within bounds
                if (dRow >= 0 && dCol >= 0 && dRow < rowMax && dCol < colMax) {
                    const distanceFromStart = deQ.weight + board[dRow][dCol].weight
                    if (board[dRow][dCol].wall && curWallBreak > 0) {
                        const dKey = `${dRow}-${dCol}-${curWallBreak-1}`
                        if (uniquePathDistances[dKey] === undefined) {
                            const dKey = `${dRow}-${dCol}-${curWallBreak-1}`
                            uniquePathDistances[dKey] = distanceFromStart
                            previousNode[dKey] = [curRow, curCol, curWallBreak]
                            queue.enqueue([dRow, dCol], curWallBreak-1, distanceFromStart)
                        }
                    } else if (!board[dRow][dCol].wall) {
                        const dKey = `${dRow}-${dCol}-${curWallBreak}`
                        if (uniquePathDistances[dKey] === undefined) {
                            const dKey = `${dRow}-${dCol}-${curWallBreak}`
                            uniquePathDistances[dKey] = distanceFromStart
                            previousNode[dKey] = [curRow, curCol, curWallBreak]
                            queue.enqueue([dRow, dCol], curWallBreak, distanceFromStart)
                        }
                    }
                }
            }
        }

    }

    return[[], nodesVisited]
}

class Queue {
    constructor() {
        this.values = []
    }

    enqueue = (node, wallBreakLeft ,weight) => {
        this.values.push({node, wallBreakLeft, weight})
    }

    dequeue = () => {
        return this.values.shift()
    }

    
}


export default bfsKWallsRemoval