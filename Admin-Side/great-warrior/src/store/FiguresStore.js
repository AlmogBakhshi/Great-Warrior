import { decorate, action, observable } from 'mobx';
import * as Fetch from '../fetches/Fetch';

class FiguresStore {
    allFigures = [];
    filteredAllFigures = null;
    selectedFigureData = null;

    setAllFigures = (figures) => {
        this.allFigures = figures;
        this.setFilteredAllFigures(figures);
    }

    setFilteredAllFigures = (figures) => {
        this.filteredAllFigures = figures;
    }

    setSelectedFigureData = async (figure) => {
        this.selectedFigureData = figure;
    }

    searchFigures = (value) => {
        const filtered = this.allFigures.filter(figure => figure.Figure_Name.toUpperCase().includes(value.toUpperCase()) ||
            figure.Figure_Attack.toString().includes(value) || figure.Figure_Defense.toString().includes(value));
        this.setFilteredAllFigures(filtered);
    }

    fetchAllFigures = () => {
        this.setFilteredAllFigures(null);
        Fetch.Get('figures')
            .then(res => this.setAllFigures(res))
    }

    fetchAddFigure = (figure) => {
        Fetch.Post('figures', figure)
            .then(() => this.fetchAllFigures())
    }

    fetchEditFigure = (figure) => {
        Fetch.Put('figures', figure)
            .then(() => this.fetchAllFigures())
    }

    fetchDeleteFigure = (figure) => {
        Fetch.Delete('figures', figure)
            .then(() => this.fetchAllFigures())
    }
}

decorate(FiguresStore, {
    allFigures: observable,
    filteredAllFigures: observable,
    selectedFigureData: observable,
    setAllFigures: action,
    setFilteredAllFigures: action,
    setSelectedFigureData: action,
    searchFigures: action,
    fetchAllFigures: action,
    fetchAddFigure: action,
    fetchEditFigure: action,
    fetchDeleteFigure: action,
})

export default new FiguresStore();