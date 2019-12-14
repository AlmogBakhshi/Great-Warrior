import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import SearchAndAddItem from './SearchAndAddItem';
import Table from './Table';
import AddOrEditDialog from './AddOrEditDialog';

const Admins = (props) => {
    const { adminsStore } = props.rootStore;
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        adminsStore.fetchAllAdmins();
    }, [])

    const HandleSearchValue = (value) => {
        adminsStore.searchAdmins(value);
    }

    const HandleAddAdmin = () => {
        //console.log('get in');
        // setShowDialog(true);
    }

    const HandleEditAdmin = (data) => {
        console.log('edit: ', data);
    }

    const HandleDeleteAdmin = (data) => {
        console.log('delete: ', data);
    }

    const handleClose = (val) => {
        console.log(val);
    }

    return (
        <div className='bodyContainer'>
            {/* <AddOrEditDialog title='Admin' open={showDialog} onClose={() => setShowDialog(false)} titles={['Email', 'Password']} /> */}
            <SearchAndAddItem title='Admin' setSearch={HandleSearchValue} addItem={HandleAddAdmin} />
            <Table title='Admin' titles={['Email', 'Password']}
                data={adminsStore.filteredAllAdmins}
                editItem={HandleEditAdmin}
                deleteItem={HandleDeleteAdmin} />
        </div>
    );
}

export default inject('rootStore')(observer(Admins));