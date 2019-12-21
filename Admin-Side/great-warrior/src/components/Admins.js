import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import SearchAndAddItem from './SearchAndAddItem';
import Table from './Table';
import AddOrEditItem from './AddOrEditItem';

const Admins = (props) => {
    const { adminsStore } = props.rootStore;
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        adminsStore.fetchAllAdmins();
    }, [])

    const titles = ['Email', 'Password'];

    const HandleSearchValue = (value) => {
        adminsStore.searchAdmins(value);
    }

    const HandleAddAdmin = () => {
        setShowDialog(true);
    }

    const HandleEditAdmin = (data) => {
        adminsStore.setSelectedAdminData(data)
            .then(() => setShowDialog(true))
    }

    const HandleDeleteAdmin = (data) => {
        adminsStore.fetchDeleteAdmin(data);
    }

    const HandleClose = () => {
        adminsStore.setSelectedAdminData(null);
        setShowDialog(false);
    }

    const HandleSave = (email, admin) => {
        adminsStore.setSelectedAdminData(null);
        email ? adminsStore.fetchEditAdmin(email, admin) : adminsStore.fetchAddAdmin(admin);
        setShowDialog(false);
    }

    return (
        <div className='bodyContainer'>
            <SearchAndAddItem title='Admin' setSearch={HandleSearchValue} addItem={HandleAddAdmin} />
            <Table title='Admin' titles={titles}
                data={adminsStore.filteredAllAdmins}
                editItem={HandleEditAdmin}
                deleteItem={HandleDeleteAdmin} />
            {showDialog && <AddOrEditItem title='Admin' titles={titles} onClose={HandleClose} id='Admin_Email'
                data={adminsStore.selectedAdminData} save={HandleSave} />}
        </div>
    );
}

export default inject('rootStore')(observer(Admins));