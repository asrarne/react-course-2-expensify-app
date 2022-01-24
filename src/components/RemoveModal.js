import React from 'react';
import Modal from 'react-modal';


const RemoveModal = (props) => (
    <Modal
        isOpen={props.removeClicked}
        onRequestClose={props.handleRemoveNo}
        ariaHideApp={false}
        contentLabel="Do you want to remove expense?"
        closeTimeoutMS={200}
        className="modal"
    >
        <h3 className="modal__title"> Do you want to remove expense?</h3>
        <div className="modal__action">
        <button className="button" onClick={props.handleRemoveYes}>Yes</button>
        <button className="button" onClick={props.handleRemoveNo}>No</button>
        </div>
    </Modal>
);

export default RemoveModal;