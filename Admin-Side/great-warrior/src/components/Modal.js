import React from 'react';
import '../styles/ModalStyle.css';
import { Paper } from '@material-ui/core';
import { MdClose } from "react-icons/md";

const Modal = (props) => {
    return (
        <div id='modal' className='modal' >
            <Paper className='modalPosition'>
                <div className='modalClose'>
                    <MdClose size='1em' style={{ cursor: 'pointer' }} onClick={() => props.onClose()} />
                </div>
                <div className='modalContainer'>
                    {props.children}
                </div>
            </Paper>
        </div>
    );
}

export default Modal;