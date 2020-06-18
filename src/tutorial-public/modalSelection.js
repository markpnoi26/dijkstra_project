const modalSelection = [
    {
        title: "Welcome to Path Visualizer",
        img: "welcome",
        description: "This application is designed to show how path finding algorithms behave so you can. Proceed forward to view the tutorial on how to use the application. You may also choose to skip the tutorial and go straight to the path finding action!"
    },
    {
        title: "Placing the Start node",
        img: "moveStart",
        description: "Drag the green start node anywhere; this will be the beginning node for the path finding algorithms."
    },
    {
        title: "Placing the End node",
        img: "moveEnd",
        description: "Drag the red end node anywhere; this will be the final node where the path finding algorithm should eventually go."
    }, 
    {
        title: "Building node walls",
        img: "buildWall",
        description: "On the top selection under 'Manipulate Grid', select 'Build Node Walls', click and drag to create walls around the grid."
    }, 
    {
        title: "Delete node walls",
        img: "deleteWall",
        description: "On the top selection under 'Manipulate Grid', select 'Delete Node Walls', click and drag to delete walls around the grid."
    }, 
    {
        title: "Toggle node resistance",
        img: "toggleResistance",
        description: "On the top selection under 'Manipulate Grid', select 'Toggle Resistance', click repeatedly until the desired resistance is achieved for that node. By default all nodes have a resistance equal to 1, toggling cycles through 3 and 5 respectively, before returning to 1."
    },
    {
        title: "Create random maze",
        img: "randomMaze",
        description: "Pressing 'Create Random Maze' uses the recursive backtracking method to generate a random maze. This button also randomly selects where the new start and end nodes are."
    },
    {
        title: "Algorithms",
        img: "welcome",
        description: "Under Pathfinding Algorithm, there are 4 selections of different algorithms. DFS (depth first search), BFS (breath first search), Dijkstra's shortest Path, and A*. Each has a unique set of rules on how to traverse the grid. Dijkstra's and A* both guarantee to have the shortest path between start and end nodes. A* is a modification of Dijkstra's algorithm, with a much 'smarter' way of searching for the end node, by using a hueristic value. By default Dijkstra's algorithm uses 0 as the hueristic value for all the nodes. BFS and Dijkstra share a similar pattern of exploration, but differ in priority. Dijkstra and A* will show more valueable in situations where resistance nodes exist. While BFS will treat each node the same, Dijkstra and A* will ALWAYS look for the path of least resistance (e.g. shortest path)."
    },
    {
        title: "Mode: Rook",
        img: "rookMode",
        description: "Under 'Exploration Mode' selecting rook mode causes the traversal of the nodes to go vertical and horizontal. Similar to the game of chess, rook mode can only traverse towards nodes until they hit a wall, find a turn, or find the end node."
    },
    {
        title: "Mode: Bishop",
        img: "bishopMode",
        description: "Under 'Exploration Mode' selecting bishop mode causes the traversal of the nodes to go diagonal. Similar to the game of chess, bishop mode can only traverse towards nodes until they hit a wall, find a turn, or find the end node. However, bishop mode can 'cut through' corners alowing it to jump walls if the corners are not sealed. **It is entirely possible for the end node to be undiscoverable if the nodes do not fall within diagonal search parameters."
    },
    {
        title: "Mode: Queen",
        img: "queenMode",
        description: "Under 'Exploration Mode' selecting queen mode causes the traversal of the nodes to go diagonal, horizontal, and vertical. The mother of all chess pieces, queen mode can 'cut through' corners alowing it to jump walls if the corners are not sealed, and is not limited to only diagonal search patterns, allowing this mode to have the best efficiency getting to the end node."
    },
    {
        title: "Start Path Visualization",
        img: "startPathFinding",
        description: "Enjoy!"
    }

]

export default modalSelection