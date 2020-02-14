import { decorate, action, observable } from 'mobx';
import * as Fetch from '../fetches/Fetch';

class PlayersStore {
    allPlayers = [];
    filteredAllPlayers = null;
    selectedPlayerData = null;

    setAllPlayers = (players) => {
        this.allPlayers = players;
        this.setFilteredAllPlayers(players);
    }

    setFilteredAllPlayers = (players) => {
        this.filteredAllPlayers = players;
    }

    setSelectedPlayerData = async (player) => {
        this.selectedPlayerData = player;
    }

    searchPlayers = (value) => {
        const filtered = this.allPlayers.filter(player =>
            player.Player_Email.toUpperCase().includes(value.toUpperCase()) ||
            (player.Player_Name && player.Player_Name.toUpperCase().includes(value.toUpperCase())) ||
            (player.Player_Score && player.Player_Score.toString().includes(value.toUpperCase())));
        this.setFilteredAllPlayers(filtered);
    }

    fetchAllPlayers = () => {
        this.setFilteredAllPlayers(null);
        Fetch.Get('players')
            .then(res => this.setAllPlayers(res))
    }

    fetchAddPlayer = (player) => {
        Fetch.Post('players', player)
            .then(() => this.fetchAllPlayers())
    }

    fetchEditPlayer = (email, player) => {
        Fetch.Put(`players/${email}`, player)
            .then(() => this.fetchAllPlayers())
    }

    fetchDeletePlayer = (player) => {
        Fetch.Delete(`players/${player.Player_Email}`)
            .then(() => this.fetchAllPlayers())
    }
}

decorate(PlayersStore, {
    allPlayers: observable,
    filteredAllPlayers: observable,
    selectedPlayerData: observable,
    setAllPlayers: action,
    setFilteredAllPlayers: action,
    setSelectedPlayerData: action,
    searchPlayers: action,
    fetchAllPlayers: action,
    fetchAddPlayer: action,
    fetchEditPlayer: action,
    fetchDeletePlayer: action,
})

export default new PlayersStore();