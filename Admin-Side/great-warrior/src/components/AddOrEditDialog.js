import React, { useRef } from 'react';
import Modal from './Modal';
// import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@material-ui/core';

const AddOrEditDialog = (props) => {
    // const allRefs = useRef(props.titles.map(() => React.createRef()));
    return (
        <div>

        </div>
        // <Dialog open={props.open} onClose={() => props.onClose()}>
        //     <DialogTitle>{props.title}</DialogTitle>
        //     <DialogContent>
        //         <form>
        //             {props.titles.map((title, index) =>
        //                 <TextField key={index} type={title === 'Password' ? 'password' : 'text'}
        //                     label={title} variant="outlined" style={{ marginBottom: '10px' }} />
        //                 // ref={allRefs[index]}
        //             )}
        //             {/* <TextField type='text' label="Email" variant="outlined"
        //                 style={{ marginBottom: '10px' }} /> */}
        //             {/* onChange={e => HandleChangeValue(e, 'email')} */}
        //         </form>
        //     </DialogContent>
        //     <DialogActions>
        //         <Button onClick={() => props.onClose()} color="primary">Cancel</Button>
        //         <Button onClick={() => console.log('allRefs.current')} color="primary">Save</Button> {/* props.save() */}
        //     </DialogActions>
        // </Dialog>
    );
}

export default AddOrEditDialog;