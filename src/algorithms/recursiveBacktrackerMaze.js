const recursiveBacktrack = (board) => {
    const colMax = board[0].length
    const rowMax = board.length
    const visited = new Array(board.length)

    // return values
    let nodesVisited = []

    for (let row = 0; row < board.length; row++) {
        visited[row] = new Array(board[0].length).fill(false)
    }

    const dfsRecursive = (row, col) => {
        const directions = shuffleDirections([[0, 2], [2, 0], [-2, 0], [0, -2]])
        visited[row][col] = true
        nodesVisited.push([row, col])

        for (let direction of directions) {
            let dRow = row + direction[0]
            let dCol = col + direction[1]
            // check if its within bounds
            if (dRow >= 0 && dCol >= 0 && dRow < rowMax && dCol < colMax && !visited[dRow][dCol]) {
                visited[row][col] = true
                const midRow = (row + dRow) / 2
                const midCol = (col + dCol) / 2
                nodesVisited.push([midRow, midCol])
                dfsRecursive(dRow, dCol)
            } 
        }
    }
    
    dfsRecursive(1, 1)
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


export default recursiveBacktrack