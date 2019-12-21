import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { TextField, Button } from '@material-ui/core';

const AddOrEditItem = (props) => {
    const [data, setData] = useState(props.data);
    const [emailToEdit, setEmailToEdit] = useState(null);

    useEffect(() => {
        // if clicked on add, set all data to be empty string
        let item = {};
        if (!data) {
            props.titles.map(title => item[`${props.title ? props.title + '_' : ''}${title}`] = '');
            setData(item);
        }
        else {
            // save the FK
            setEmailToEdit(data[`${props.id}`]);
            // if clicked on edit, reset the password to be empty string
            data[`${props.title}_Password`] && setData({ ...data, [`${props.title}_Password`]: '' });
        }
    }, [])

    const HandleChangeText = (event, title) => {
        // set text in data[title]. example: data[password] = '123'
        setData({ ...data, [`${props.title ? props.title + '_' : ''}${title}`]: event.target.value });
    }

    return (
        <Modal onClose={() => props.onClose()}>
            <form style={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
                {props.titles.map((title, index) =>
                    <TextField value={data && data[`${props.title ? props.title + '_' : ''}${title}`] ?
                        data[`${props.title ? props.title + '_' : ''}${title}`] : ''}
                        onChange={e => HandleChangeText(e, title)}
                        key={index} type={title === 'Password' ? 'password' : 'text'}
                        label={title} variant="outlined" style={{ marginBottom: '10px', width: '45%' }} />
                )}
            </form>
            <Button onClick={() => props.onClose()} color="primary">Cancel</Button>
            <Button onClick={() => props.save(emailToEdit, data)} color="primary">Save</Button>
        </Modal>
    );
}

export default AddOrEditItem;