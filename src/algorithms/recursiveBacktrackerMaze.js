const recursiveBacktrack = (board, start=[1, 1]) => {
    const colMax = board[0].length
    const rowMax = board.length
    const visited = new Array(board.length)
    const queue = new Stack()

    // return values
    const nodesVisited = []

    let deQ;

    for (let row = 0; row < board.length; row++) {
        visited[row] = new Array(board[0].length).fill(false)
    }
    visited[start[0]][start[1]] = true

    queue.enqueue(start, [])

    while (queue.values.length) {
        deQ = queue.dequeue()
        if (deQ) {
            // check all directions, and add to priority queue
            const directions = shuffleDirections([[0, 2], [2, 0], [-2, 0], [0, -2]])
            const curRow = deQ.node[0]
            const curCol = deQ.node[1]
            if (deQ.from.length) nodesVisited.push([(curRow + deQ.from[0]) / 2, (curCol + deQ.from[1]) / 2])
            nodesVisited.push([curRow, curCol])

            for (let direction of directions) {
                let dRow = curRow + direction[0]
                let dCol = curCol + direction[1]
                // check if its within bounds
                if (dRow >= 0 && dCol >= 0 && dRow < rowMax && dCol < colMax && !visited[dRow][dCol]) {
                    visited[dRow][dCol] = true
                    // console.log((curRow + dRow) / 2)
                    // console.log(curCol + dCol) / 2)
                    queue.enqueue([dRow, dCol], [curRow, curCol])
                }
            }
        }

    }

    const startAndEndNodes = randomStartAndEnd(nodesVisited)
    return [nodesVisited, startAndEndNodes]
}

const shuffleDirections = (directions) => {
    let currentIdx = directions.length, tempVal, randomIdx

    while (0 !== currentIdx) {
        randomIdx = Math.floor(Math.random() * currentIdx)
        currentIdx--

        tempVal = directions[currentIdx]
        directions[currentIdx] = directions[randomIdx]
        directions[randomIdx] = tempVal
    }

    return directions

}

const randomStartAndEnd = (nodesVisited) => {
    const nodesLength = nodesVisited.length
    let startNode = nodesVisited[Math.floor(Math.random()*nodesLength)]
    let endNode = nodesVisited[Math.floor(Math.random()*nodesLength)]

    while (startNode === endNode) {
        endNode = nodesVisited[Math.floor(Math.random() * nodesLength)]
    }
    
    return [startNode, endNode]
} 

class Stack {
    constructor() {
        this.values = []
    }

    enqueue = (node, from) => {
        this.values.push({ node, from })
    }

    dequeue = () => {
        return this.values.pop()
    }


}

export default recursiveBacktrack