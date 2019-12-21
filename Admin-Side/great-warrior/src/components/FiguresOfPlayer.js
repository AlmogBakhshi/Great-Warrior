import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import SearchAndAddItem from './SearchAndAddItem';
import Table from './Table';
import AddOrEditItem from './AddOrEditItem';

const FiguresOfPlayer = (props) => {
    const { figuresOfPlayerStore } = props.rootStore;
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        figuresOfPlayerStore.fetchAllFiguresOfPlayer();
    }, [])

    const titles = ['Player_Email', 'Figure_Name', 'Figure_Level'];

    const HandleSearchValue = (value) => {
        figuresOfPlayerStore.searchFiguresOfPlayer(value);
    }

    const HandleAddFigureOfPlayer = () => {
        setShowDialog(true);
    }

    const HandleEditFigureOfPlayer = (data) => {
        figuresOfPlayerStore.setSelectedFigureOfPlayerData(data)
            .then(() => setShowDialog(true))
    }

    const HandleDeleteFigureOfPlayer = (data) => {
        figuresOfPlayerStore.fetchDeleteFigureOfPlayer(data);
    }

    const HandleClose = () => {
        figuresOfPlayerStore.setSelectedFigureOfPlayerData(null);
        setShowDialog(false);
    }

    const HandleSave = (email, figureOfPlayer) => {
        figuresOfPlayerStore.setSelectedFigureOfPlayerData(null);
        // email should not be null if want to edit
        email ? figuresOfPlayerStore.fetchEditFigureOfPlayer(figureOfPlayer) :
            figuresOfPlayerStore.fetchAddFigureOfPlayer(figureOfPlayer);
        setShowDialog(false);
    }

    return (
        <div className='bodyContainer'>
            <SearchAndAddItem title='Figure Of Player' setSearch={HandleSearchValue} addItem={HandleAddFigureOfPlayer} />
            <Table titles={titles}
                data={figuresOfPlayerStore.filteredAllFiguresOfPlayer}
                editItem={HandleEditFigureOfPlayer}
                deleteItem={HandleDeleteFigureOfPlayer} />
            {showDialog && <AddOrEditItem titles={titles} onClose={HandleClose} id='Player_Email'
                data={figuresOfPlayerStore.selectedFigureOfPlayerData} save={HandleSave} />}
        </div>
    );
}

export default inject('rootStore')(observer(FiguresOfPlayer));