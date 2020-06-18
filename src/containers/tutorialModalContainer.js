import React from 'react'
import Modal from 'react-modal'

export default class TutorialModalContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: true
        }
    }

    closeModal = () => {
        this.setState({
            isOpen: false
        })
    }

    nextPage = () => {
        console.log("clicking next page")
    }   

    prevPage = () => {
        console.log("clicking prev page")
    }

    renderTutorialPage = () => {
        console.log("clicking render tutorial Page")
    }

    render() {
        const customStyles = {
            content : {
                top                   : '50%',
                left                  : '50%',
                right                 : 'auto',
                bottom                : 'auto',
                marginRight           : '-50%',
                transform             : 'translate(-50%, -50%)'
            }
        };
        return(
            <div>
                <Modal isOpen={this.state.isOpen} style={customStyles}>
                    <h1>Welcome to Pathfinding Visualizer</h1>
                    {/** 
                     * 
                     * Welcome Page
                     * Description of App (why and inpiration)
                     * 
                     * Manipulating the board:
                     * Moving Start and End Nodes
                     * - you can click and drag the start and end nodes anywhere the node is open or resisted. (you can only drag the start and end to a resisted node (clicking will not toggle the weight of the node.), start and end nodes by default have a weight of 1) the start and end nodes will have a darker color once the shortest path is determined.
                     * 
                     * Building/Deleting Walls (can click and drag)
                     * - clicking and dragging to create walls will update the grid so that, depending on the mode (see modes), the path finding algorithm can not discover it.
                     * Toggle Resistance nodes (1 click for resistance of 3, 2 clicks for resistance of 5)
                     * - once selected, you can click to toggle the weight of possible empty nodes, walls maybe built on top of resisted nodes, but the algorithm will prioritize not going through walls.
                     * Create a random maze with start and end nodes randomly placed
                     * - creates a labyrinth of maze where it is possible for only one way to solve it.
                     * 
                     * Explaning the Algorithms:
                     * Build a random maze (algorithm uses recursive backtracker) => does not include adding resistance nodes
                     * Dijkstra's algorithm (developed by edgar dijkstra.... how it works and why it works)
                     * A* search algorithm (improved version of dijkstra's shortest path algorithm, it adds an extra parameter called heuristic value)
                     * DFS (common algorithm for recursive search through graph, does not guarantee the shortest path, though in some maze algorithms such as recursive backtracker, it can perform much better than dijkstra/A* /BFS)
                     * BFS (common algorithm that works similarly to how dijkstra works on a 2d undirected graph, however when the edges are weighted, BFS does not guarantee the most efficient path)
                     * 
                     * 
                     * Mode: 
                     * Rook Mode - similar to rook piece in chess, the algorithm can only traverse in 4 directions, up, down, left and right
                     * Bishop Mode - similar to the bishop piece in chess, the algorithm can only traverse diagonaly, so it is entirely possible for the end node to be undiscoverable, if the current node does not have (odd/odd coordinates -> start/end or even/even coordinates ->start/end)
                     * Queen Mode - the mother of all chess pieces, the algorithm will move in all 8 directions in an attempt to find the shortest/least resistent path from start to the end node.
                     * 
                     * 
                    */}
                    <button onClick={this.closeModal}> close tutorial </button>
                    <button onClick={this.prevPage}> prev </button>
                    <button onClick={this.nextPage}> next </button>
                </Modal>
            </div>
        )
    }
}