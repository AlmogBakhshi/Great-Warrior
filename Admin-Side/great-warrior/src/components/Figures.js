import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import SearchAndAddItem from './SearchAndAddItem';
import Table from './Table';
import AddOrEditItem from './AddOrEditItem';

const Figures = (props) => {
    const { figuresStore } = props.rootStore;
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        figuresStore.fetchAllFigures();
    }, [])

    const titles = ['Name', 'Attack', 'Defense'];

    const HandleSearchValue = (value) => {
        figuresStore.searchFigures(value);
    }

    const HandleAddFigure = () => {
        setShowDialog(true);
    }

    const HandleEditFigure = (data) => {
        figuresStore.setSelectedFigureData(data)
            .then(() => setShowDialog(true))
    }

    const HandleDeleteFigure = (data) => {
        figuresStore.fetchDeleteFigure(data);
    }

    const HandleClose = () => {
        figuresStore.setSelectedFigureData(null);
        setShowDialog(false);
    }

    const HandleSave = (name, figure) => {
        figuresStore.setSelectedFigureData(null);
        name ? figuresStore.fetchEditFigure(figure) : figuresStore.fetchAddFigure(figure);
        setShowDialog(false);
    }

    return (
        <div className='bodyContainer'>
            <SearchAndAddItem title='Figure' setSearch={HandleSearchValue} addItem={HandleAddFigure} />
            <Table title='Figure' titles={titles}
                data={figuresStore.filteredAllFigures}
                editItem={HandleEditFigure}
                deleteItem={HandleDeleteFigure} />
            {showDialog && <AddOrEditItem title='Figure' titles={titles} onClose={HandleClose} id='Figure_Name'
                data={figuresStore.selectedFigureData} save={HandleSave} />}
        </div>
    );
}

export default inject('rootStore')(observer(Figures));