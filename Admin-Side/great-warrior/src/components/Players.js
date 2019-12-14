import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import SearchAndAddItem from './SearchAndAddItem';
import Table from './Table';

const Players = (props) => {
    const { playersStore } = props.rootStore;

    useEffect(() => {
        playersStore.fetchAllPlayers();
    }, [])

    const HandleSearchValue = (value) => {
        playersStore.searchPlayers(value);
    }

    const HandleAddPlayer = () => {
        console.log('get in');
    }

    const HandleEditPlayer = (data) => {
        console.log('edit: ', data);
    }

    const HandleDeletePlayer = (data) => {
        console.log('delete: ', data);
    }

    return (
        <div className='bodyContainer'>
            <SearchAndAddItem title='Player' setSearch={HandleSearchValue} addItem={HandleAddPlayer} />
            <Table title='Player' titles={['Email', 'Name', 'Password', 'Score']}
                data={playersStore.filteredAllPlayers}
                editItem={HandleEditPlayer}
                deleteItem={HandleDeletePlayer} />
        </div>
    );
}

export default inject('rootStore')(observer(Players));