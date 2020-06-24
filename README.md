## Path Finding Visualizer

This is a project for visualizing the different path finding algorithms. The goal of this project is to be able to see and analyze the advantages and disadvantages of using a specific algorithm. The project also focuses on the different ways the algorithm can traverse nodes. Theoretically, the possible "moves" are endless. The current moves used in the application are based on chess moves (rook, bishop, and queen).

## Algorithms

DFS: a common traversing algorithm that prioritizes going as deep as possible until all possible nodes have been visited and discovered, before traversing other neighbor nodes.

BFS: another common traversing algorithm that prioritizes closest neighbors first, before exploring the depth.

Dijkstra's shortest path: A very famous algorithm, commonly used in modern day applications. The algorithm revolves around a priority queue, and updates the visited nodes with the lowest possible distance value. By the time the target node is reached, because of how priority queue works, it would have guaranteed the shortest path to reach that node. 

A*: A variation of Dijkstra's shortest path. A* updates the priority queue based on the shortest possible path from the start AND also a value called heuristic value. The heuristic value can be any value of "distance", depending on how the heuristic is calculated, the traversing of the the nodes may look different. Common heuristic values are the manhattan distance, euclidean distance, there are many more, this is what makes A* a really flexible algorithm. A* is capable of doing Dijkstra's algorithm smarter based on certain parameters. Common applications for this algorithm are used in how GPS routing works with traffic, tolls, physical distance, time traveled and many more. In this application we have chosen both the manhattan distance and euclidean distance as our primary heuristic value calculation (manhattan for rook mode, and euclidean for bishop/queen mode)

## Modes

Rook: Traversing direction that can only move vertically and horizontally.
Bishop: Traversing direction that can only move diagonally, only diagonal nodes are ever explored, making it possible to cut through unsealed corners. Roughly half of the nodes in the grid will be unexplorable by this mode.
Queen: Traversing direction that can move vertically, horizontally, and diagonally. This mode can cut through unsealed corners. Undoubtedly, this mode is the most efficient way to traverse through the grid.

## Running the application

Copy the repo, run ```npm install```, then ```npm run```. You can then access the application on ```localhost:3000```.

## Roadmap and Future features

The code is written in such a way that adding other algorithms or modes can easily be done. The ability to add "pit stops" or multiple nodes to traverse before arriving at the end node is in the works. Other maze generator algorithms will also be added. Feel free to contact me if you want to add features to this project.

## Anomalies, Special Cases and Conclusion

Ever since the introduction of wall bypass feature, there are known anomalies for how A* performs in comparison to Dijkstra's shortest path algorithm, in Queen mode, with greater than 7 wall bypass, distance longer than 30-35 nodes, and specific to randomly generated mazes. Because of how the heuristic value is calculated under queen mode, it is possible for A* to find a slightly longer path than Dijkstra's shortest path (normally 2-5 more nodes, depending on the complexity of the maze). This happens because of how A* prioritizes the euclidean distance + distance from the start node as a special cost. With the introduction of wall bypass feature, A* tries to go straight towards the node regardless of how many walls it goes through, without first checking if a path exist with fewer wall breaks. In return, the priority queue has no chance to explore possible shorter paths when it reaches the target node, resulting in a slightly higher "shortest path". However, in comparison to all the nodes A* has already visited, the shortest path is always guaranteed within the parameters of the visited paths, in contrast to the entire grid.

A potential solution to this is to come up with a different heuristic value if wall breaks are introduced. Giving all the nodes surrounding the start node a better shot of attaining the shortest path possible. Another solution would be to have the priority queue change its priority depending on how many wall breaks are left for a possible current path in the queue. Another alternative solution is to introduce a small BFS code inside the A* when dealing with wall breaks to expand the possible search parameters of A*. All of these potential solutions have their drawbacks, but more importantly, it may behave differently for Rook mode with less than 7 wall bypasses. 

In conclusion, there is no single algorithm that will outperform all others when variations to the graph are introduced. Code performance all depends on what specific metric is being measured, in some cases, finding the shortest path is the desired outcome, in others, it's the computation time for finding an optimal solution (even though the path may or may not be the shortest path). It is highly unlikely to come up with an algorithm that works or *all* different types of problems. The important distinction for performance is picking the correct set of algorithms for the desired outcome. Assessing the algorithm's merits and potential drawbacks is what counts when determining how useful it is.

## License

MIT License

Copyright (c) 2020 Mark Daniel Delgado

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.