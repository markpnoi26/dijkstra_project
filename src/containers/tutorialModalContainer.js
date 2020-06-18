import React from 'react'
import Modal from 'react-modal'
import TutorialCard from '../components/tutorialCard'

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
        this.setState({
            isOpen: true
        })
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
                    <TutorialCard />
                    <button onClick={this.closeModal}> close tutorial </button>
                    <button onClick={this.prevPage}> prev </button>
                    <button onClick={this.nextPage}> next </button>
                </Modal>
            </div>
        )
    }
}