import React from 'react'
import Modal from 'react-modal'
import Settings from '../components/settingsCard'

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
                top: '25rem',
                left: '10rem',
                right: '10rem',
                bottom: '25rem',
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
                ariaHideApp={false}
            >
                <Settings 
                    animationSpeed={this.props.animationSpeed}
                    rowSize={this.props.rowSize}
                    colSize={this.props.colSize}
                    closeSettingsModal={this.props.closeSettingsModal}

                    updateAnimationSpeed={this.props.updateAnimationSpeed}
                />
            </Modal>
        )
    }
}