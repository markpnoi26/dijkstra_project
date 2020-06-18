import React from 'react'
import Modal from 'react-modal'
import TutorialCard from '../components/tutorialCard'
import modalSelection from '../tutorial-public/modalSelection'

export default class TutorialModalContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            current: 0
        }
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

    render() {
        const modalStyle = {
            overlay: {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(179, 179, 179, 0.75)'
            },
            content : {
                position: 'absolute',
                top: '2.5rem',
                left: '6rem',
                right: '6rem',
                bottom: '2.5rem',
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
                isOpen={this.props.isTutorialOpen} 
                style={modalStyle}>
                    <TutorialCard 
                        title={modalSelection[this.state.current].title}
                        img={modalSelection[this.state.current].img}
                        alt={modalSelection[this.state.current].img}
                        description={modalSelection[this.state.current].description}

                        closeModal={this.props.closeModal}
                        prevPage={this.prevPage}
                        nextPage={this.nextPage}
                        current={this.state.current}
                    />
                </Modal>
            </div>
        )
    }
}