const modalSelection = [
    {
        title: "Welcome to Path Finding Visualizer",
        img: "welcome",
        description: "This application is designed to show how path finding algorithms behave so you can easily analyze it. Proceed forward to view the tutorial on how to use the application. You may also choose to skip the tutorial and go straight to the path finding action!"
    },
    {
        title: "Moving the Start Node",
        img: "moveStart",
        description: "Drag the green start node anywhere; this will be the beginning node for the path finding algorithms. You cannot move this node into a wall."
    },
    {
        title: "Moving the End Node",
        img: "moveEnd",
        description: "Drag the red end node anywhere; this will be the final node where the path finding algorithm should eventually go. You cannot move this node into a wall."
    }, 
    {
        title: "Manipulate Grid: Building Node Walls",
        img: "buildWall",
        description: "Selecting 'Build Node Walls' will allow you to click and drag to create walls around the grid."
    }, 
    {
        title: "Manipulate Grid: Delete Node Walls",
        img: "deleteWall",
        description: "Selecting 'Delete Node Walls' will allow you to click and drag to delete walls around the grid."
    }, 
    {
        title: "Manipulate Grid: Toggle Node Resistance",
        img: "toggleResistance",
        description: "Selecting 'Toggle Resistance', will allow you click a node repeatedly cycling between different node resistance values. By default all nodes have a resistance value of 1 and will show as an empty node, clicking will toggle different resistances (1-default, 3 & 5). Added resistance means that it takes 3x or 5x the effort for certain algorithms to explore the node before moving to the next one, such is the case for Dijkstra's Shortest Path and A* search."
    },
    {
        title: "Random Maze Generator",
        img: "randomMaze",
        description: "'Generate Random Maze' button will trigger a maze generating algorithm that uses the recursive backtracking pattern. The grid will animate how the maze is created starting from node [1,1] (indexed as [0,0]). Start and End Nodes are then randomly selected after the maze is generated.",
        links: [
            ['How Recursive Backtracking Works', 'https://en.wikipedia.org/wiki/Maze_generation_algorithm']
        ]
    },
    {
        title: "Algorithms Selection",
        img: "welcome",
        description: "There are 4 selections of different algorithms. DFS (depth first search), BFS (breath first search), Dijkstra's shortest path, and A*. Each have a unique set of rules on how to traverse the grid. Dijkstra's and A* both guarantee to have the shortest path between start and end nodes for majority of cases. A* is a modification of Dijkstra's algorithm, and by design has a calculated way of searching for the end node faster by using a hueristic value. By default, Dijkstra's algorithm uses 0 as the hueristic value for all the nodes. BFS and Dijkstra share a similar pattern of exploration, but differ in priority, this is true for mazes that contain resistance nodes. While BFS will treat each node the same, Dijkstra and A* will ALWAYS attempt to find the shortest possible and least resistive path. If the shortest path is desired for all cases, Dijkstra's shortest path is the universal standard, because there are some very rare cases where A* does not find the shortest path. Links below for more information",
        links: [
            ["More about A* Search Algorithm",'https://en.wikipedia.org/wiki/A*_search_algorithm'],
            ["Heuristic Explanations", 'http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html']
        ]
    },
    {
        title: "Mode: Rook",
        img: "rookMode",
        description: "Selecting Rook mode causes vertical and horizontal node traversal. Rook mode can only traverse towards nodes until the algorithm hits a wall, finds a turn, or find the end node. (note: in chess, this is how the rook moves.)",
        links: [
            ['Chess Piece (Rook)', "https://en.wikipedia.org/wiki/Rook_(chess)"]
        ]
    },
    {
        title: "Mode: Bishop",
        img: "bishopMode",
        description: "Selecting Bishop mode causes the diagonal node traversal. Bishop mode can only traverse towards nodes until the algorithm hits a corner, finds another free diagonal direction, or find the end node. Bishop mode can move through corners allowing it to jump walls if the corners are not sealed. It is entirely possible for the end node to be undiscoverable if the nodes do not fall within diagonal search parameters. (note: in chess, this is how the bishop moves.) ",
        links: [
            ['Chess Piece (Bishop)', "https://en.wikipedia.org/wiki/Bishop_(chess)"]
        ]
    },
    {
        title: "Mode: Queen",
        img: "queenMode",
        description: "Selecting Queen mode causes diagonal, horizontal, and vertical node traversals. Queen mode can move through corners allowing it to jump walls if the corners are not sealed, and is not limited to only diagonal search patterns. This is the best mode for finding the most efficient route from Start to End nodes. (note: in chess, this is how the queen moves, making it one of the most versatile pieces.)",
        links: [
            ['Chess Piece (Queen)', "https://en.wikipedia.org/wiki/Queen_(chess)"]
        ]
    },
    {
        title: "Other Features!",
        img: "startPathFinding",
        description: "Once you have your grid set up, you can also choose if the algorithm has the ability to bypass walls for more efficiency. Pressing on Start Path Finding will animate the path finding algorithm of your choice. It will first show the visited nodes, then visualize a path towards the end node if it exists, in the case of Dijkstra and A*, this will be the shortest path of least resistance and if any walls are subject to removal, the algorithm will account for possible shortcuts to aim for the shortest path."
    }

]

export default modalSelection