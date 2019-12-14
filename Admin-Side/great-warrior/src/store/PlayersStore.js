import { decorate, action, observable } from 'mobx';
import * as Fetch from '../fetches/Fetch';

class PlayersStore {
    allPlayers = [];
    filteredAllPlayers = [];

    setAllPlayers = (players) => {
        this.allPlayers = players;
        this.setFilteredAllPlayers(players);
    }

    setFilteredAllPlayers = (players) => {
        this.filteredAllPlayers = players;
    }

    searchPlayers = (value) => {
        const filtered = this.allPlayers.filter(player =>
            player.Player_Email.toUpperCase().includes(value.toUpperCase()) ||
            (player.Player_Name && player.Player_Name.toUpperCase().includes(value.toUpperCase())) ||
            (player.Player_Score && player.Player_Score.toUpperCase().includes(value.toUpperCase())));
        this.setFilteredAllPlayers(filtered);
    }

    fetchAllPlayers = () => {
        Fetch.Get('players')
            .then(res => this.setAllPlayers(res))
    }
}

decorate(PlayersStore, {
    allPlayers: observable,
    filteredAllPlayers: observable,
    setAllPlayers: action,
    setFilteredAllPlayers: action,
    searchPlayers: action,
    fetchAllPlayers: action,
})

export default new PlayersStore();