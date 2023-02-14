
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";

const ModalResult = (props) => {
    const { show, setShow, dataModalResult } = props


    const handleClose = () => {
        setShow(false)
    }

    return (

        <Modal
            size="xl"
            show={show}
            onHide={handleClose}
            backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Your result: <span style={{ fontWeight: '700', color: "#b83e3e" }}>{(dataModalResult.countCorrect / dataModalResult.countTotal) * 100} </span> score </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>Total Question: <b>{dataModalResult.countTotal}</b> </div>
                <div>Total Correct answers: <b>{dataModalResult.countCorrect}</b> </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Show answers
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalResult