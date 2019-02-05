import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap'; 
import './Modal-Compo.css';

class VerticallyCenteredModal extends Component {

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {this.props.modalHeader}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{this.props.modalContentHeader}</h4>
          <p>
            {this.props.modalContent}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default VerticallyCenteredModal;