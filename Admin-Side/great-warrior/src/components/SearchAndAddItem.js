import React from 'react';
import { TextField, Button } from '@material-ui/core';

const SearchAndAddItem = (props) => {
    const HandleChangeValue = (event) => {
        props.setSearch(event.target.value);
    }

    const HandleAddItem = () => {
        props.addItem();
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <TextField label="Search" style={{ width: '80%' }} onChange={HandleChangeValue} />
            <Button variant="contained" color="primary" style={{ width: '15%', fontSize: '0.8em' }} onClick={HandleAddItem}>
                Add {props.title}
            </Button>
        </div>
    );
}

export default SearchAndAddItem;