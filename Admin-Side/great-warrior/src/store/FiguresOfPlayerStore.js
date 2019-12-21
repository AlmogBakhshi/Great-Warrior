import { decorate, action, observable } from 'mobx';
import * as Fetch from '../fetches/Fetch';

class FiguresOfPlayerStore {
    allFiguresOfPlayer = [];
    filteredAllFiguresOfPlayer = null;
    selectedFigureOfPlayerData = null;

    allPlayers = [];
    allFigures = [];

    setAllFiguresOfPlayer = (figuresOfPlayer) => {
        this.allFiguresOfPlayer = figuresOfPlayer;
        this.setFilteredAllFiguresOfPlayer(figuresOfPlayer);
    }

    setFilteredAllFiguresOfPlayer = (figuresOfPlayer) => {
        this.filteredAllFiguresOfPlayer = figuresOfPlayer;
    }

    setSelectedFigureOfPlayerData = async (figureOfPlayer) => {
        this.selectedFigureOfPlayerData = figureOfPlayer;
    }

    searchFiguresOfPlayer = (value) => {
        const filtered = this.allFiguresOfPlayer.filter(figureOfPlayer =>
            figureOfPlayer.Player_Email.toUpperCase().includes(value.toUpperCase()) ||
            figureOfPlayer.Figure_Name.toUpperCase().includes(value.toUpperCase()));
        this.setFilteredAllFiguresOfPlayer(filtered);
    }

    setAllPlayers = (players) => {
        this.allPlayers = players;
    }

    setAllFigures = (figures) => {
        this.allFigures = figures;
    }

    fetchAllFiguresOfPlayer = () => {
        this.setFilteredAllFiguresOfPlayer(null);
        this.fetchAllPlayers();
        this.fetchAllFigures();
        Fetch.Get('figuresOfPlayers')
            .then(res => this.setAllFiguresOfPlayer(res))
    }

    fetchAddFigureOfPlayer = (figureOfPlayer) => {
        Fetch.Post('figuresOfPlayers', figureOfPlayer)
            .then(() => this.fetchAllFiguresOfPlayer())
    }

    fetchEditFigureOfPlayer = (figureOfPlayer) => {
        Fetch.Put('figuresOfPlayers', figureOfPlayer)
            .then(() => this.fetchAllFiguresOfPlayer())
    }

    fetchDeleteFigureOfPlayer = (figureOfPlayer) => {
        Fetch.Delete('figuresOfPlayers', figureOfPlayer)
            .then(() => this.fetchAllFiguresOfPlayer())
    }

    fetchAllPlayers = () => {
        Fetch.Get('players')
            .then(res => this.setAllPlayers(res))
    }

    fetchAllFigures = () => {
        Fetch.Get('figures')
            .then(res => this.setAllFigures(res))
    }
}

decorate(FiguresOfPlayerStore, {
    allFiguresOfPlayer: observable,
    filteredAllFiguresOfPlayer: observable,
    selectedFigureOfPlayerData: observable,
    allPlayers: observable,
    allFigures: observable,
    setAllFiguresOfPlayer: action,
    setFilteredAllFiguresOfPlayer: action,
    setSelectedFigureOfPlayerData: action,
    searchFiguresOfPlayer: action,
    setAllPlayers: action,
    setAllFigures: action,
    fetchAllFiguresOfPlayer: action,
    fetchAddFigureOfPlayer: action,
    fetchEditFigureOfPlayer: action,
    fetchDeleteFigureOfPlayer: action,
    fetchAllPlayers: action,
    fetchAllFigures: action,
})

export default new FiguresOfPlayerStore();