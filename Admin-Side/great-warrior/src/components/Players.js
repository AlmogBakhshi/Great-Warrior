import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import SearchAndAddItem from './SearchAndAddItem';
import Table from './Table';
import AddOrEditItem from './AddOrEditItem';

const Players = (props) => {
    const { playersStore } = props.rootStore;
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        playersStore.fetchAllPlayers();
    }, [])

    const titles = ['Email', 'Name', 'Password', 'Score'];

    const HandleSearchValue = (value) => {
        playersStore.searchPlayers(value);
    }

    const HandleAddPlayer = () => {
        setShowDialog(true)
    }

    const HandleEditPlayer = (data) => {
        playersStore.setSelectedPlayerData(data)
            .then(() => setShowDialog(true))
    }

    const HandleDeletePlayer = (data) => {
        playersStore.fetchDeletePlayer(data);
    }

    const HandleClose = () => {
        playersStore.setSelectedPlayerData(null);
        setShowDialog(false);
    }

    const HandleSave = (email, player) => {
        playersStore.setSelectedPlayerData(null);
        email ? playersStore.fetchEditPlayer(email, player) : playersStore.fetchAddPlayer(player);
        setShowDialog(false);
    }

    return (
        <div className='bodyContainer'>
            <SearchAndAddItem title='Player' setSearch={HandleSearchValue} addItem={HandleAddPlayer} />
            <Table title='Player' titles={titles}
                data={playersStore.filteredAllPlayers}
                editItem={HandleEditPlayer}
                deleteItem={HandleDeletePlayer} />
            {showDialog && <AddOrEditItem title='Player' titles={titles} onClose={HandleClose} id='Player_Email'
                data={playersStore.selectedPlayerData} save={HandleSave} />}
        </div>
    );
}

export default inject('rootStore')(observer(Players));