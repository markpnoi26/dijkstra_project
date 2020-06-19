import React from 'react'
import Modal from 'react-modal'
import Settings from '../components/settings'

export default class SettingsModalContainer extends React.Component {

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
            content: {
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
        return (
            <Modal
                isOpen={this.props.isSettingsOpen}
                style={modalStyle}
            >
                <Settings 
                    currentSpeed={this.props.animationSpeed}
                    rowSize={this.props.rowSize}
                    colSize={this.props.colSize}
                    closeSettingsModal={this.props.closeSettingsModal}
                />
            </Modal>
        )
    }
}