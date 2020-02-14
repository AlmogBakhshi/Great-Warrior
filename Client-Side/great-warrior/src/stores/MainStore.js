import { decorate, observable, action, configure } from 'mobx';
configure({ enforceActions: 'observed' });

class MainStore {
    currentUser = null;
    showGlobalChat = false;
    showFigures = false;
    showTop100 = false;
    startGame = false;

    setCurrentUser = (user) => {
        this.currentUser = user;
    }

    setShowGlobalChat = (value) => {
        this.showGlobalChat = value;
    }

    setShowFigures = (value) => {
        this.showFigures = value;
    }

    setShowTop100 = (value) => {
        this.showTop100 = value;
    }

    setStartGame = (value) => {
        this.startGame = value;
    }
}

decorate(MainStore, {
    currentUser: observable,
    showGlobalChat: observable,
    showFigures: observable,
    showTop100: observable,
    startGame: observable,
    setCurrentUser: action,
    setShowGlobalChat: action,
    setShowFigures: action,
    setShowTop100: action,
    setStartGame: action,
});

export default new MainStore()