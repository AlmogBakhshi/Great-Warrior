import React from 'react';
import '../styles/ModalStyle.css'
import { MdClose } from "react-icons/md";

const Modal = (props) => {
    return (
        <div id='modal' className='modal' >
            <div className='modalPosition'>
                <div className='modalClose' onClick={() => props.onClose()}>
                    <MdClose size='1em' style={{ cursor: 'pointer' }} />
                </div>
                <div className='modalContainer'>
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default Modal;