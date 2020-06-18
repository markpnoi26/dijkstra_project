import React from 'react'
import Modal from 'react-modal'
import TutorialCard from '../components/tutorialCard'
import modalSelection from '../tutorial-styles/modalSelection'

export default class TutorialModalContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: true,
            current: 0
        }
    }

    closeModal = () => {
        this.setState({
            isOpen: false
        })
    }

    nextPage = () => {
        if (this.state.current !== 11) {
            this.setState({
                current: this.state.current+1
            })
        }
    }   

    prevPage = () => {
        if (this.state.current > 0) {
            this.setState({
                current: this.state.current-1
            })
        }
    }

    renderTutorialPage = () => {
        this.setState({
            isOpen: true
        })
        console.log("clicking render tutorial Page")
    }

    render() {
        const customStyles = {
            overlay: {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.75)'
            },
            content : {
                position: 'absolute',
                top: '150',
                left: '150px',
                right: '200px',
                bottom: '200px',
                border: '1px solid #ccc',
                background: '#fff',
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                borderRadius: '10px',
                outline: 'none',
                padding: '10px'
            }
        };
        return(
            <div>
                <Modal 
                isOpen={this.state.isOpen} 
                style={customStyles}>
                    <TutorialCard 
                        title={modalSelection[this.state.current].title}
                        img={modalSelection[this.state.current].img}
                        alt={modalSelection[this.state.current].img}
                        description={modalSelection[this.state.current].description}
                    />
                    <button onClick={this.closeModal}> close tutorial </button>
                    <button onClick={this.prevPage}> prev </button>
                    <button onClick={this.nextPage}> next </button>
                </Modal>
            </div>
        )
    }
}