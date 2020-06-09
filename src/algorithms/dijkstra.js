const dijkstra = (board, start, end) => {

    const xMax = board.length-1
    const yMax = board[0].length-1
    const distances = new Array(board.length)
    const previousNode = {}
    const queue = new PriorityQueue()
    // just a check
    let steps = 0

    // return values
    const shortestPath = []
    const nodesVisited = []

    let deQ;

    for (let x=0; x<board.length; x++) {
        distances[x] = new Array(board[0].length).fill(Infinity)
    }
    distances[start[0]][start[1]] = 0
    previousNode[`${start[0]}-${start[1]}`] = "none"

    queue.enqueue(start, 0) 

    while (queue.values.length) {
        deQ = queue.dequeue()
        const curX = deQ.node[0]
        const curY = deQ.node[1]
        
        // check if target is reached
        if (curX === end[0] && curY === end[1]) {
            
            shortestPath.push(end)
            let [backtrackX, backtrackY] = previousNode[`${curX}-${curY}`]

            while (previousNode[`${backtrackX}-${backtrackY}`] !== "none") {
                shortestPath.unshift([backtrackX, backtrackY])
                let [prevX, prevY] = previousNode[`${backtrackX}-${backtrackY}`]
                backtrackX = prevX
                backtrackY = prevY
            }
            shortestPath.unshift(start)
            return [shortestPath, nodesVisited]
        }

        if (deQ) {
            // check all directions, and add to priority queue
            const directions = [[0,1], [1,0], [0,-1], [-1,0]]

            for (let direction of directions) {
                let dx = curX + direction[0]
                let dy = curY + direction[1]
                // check if its within bounds
                if (dx > 0 && dy > 0 && dx <= xMax && dy <= yMax && board[dx][dy] !== "*") {
                    const newWt = deQ.wt+1
                    if (newWt < distances[dx][dy]) {
                        nodesVisited.push([curX, curY])
                        distances[dx][dy] = newWt
                        previousNode[`${dx}-${dy}`] = [curX, curY]
                        queue.enqueue([dx, dy], newWt)
                    }
                }
            }
        }

    }

    console.log("could not find the node!")
    return[[],[]]
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