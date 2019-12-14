import { decorate, observable, action, configure } from 'mobx'
configure({ enforceActions: 'observed' });
import io from 'socket.io-client'
import { IP } from '../routes/Connection'

class MainStore {
    currentUser = null;
    showGlobalChat = false;

    setCurrentUser = (user) => {
        this.currentUser = user;
    }

    setShowGlobalChat = (value) => {
        this.showGlobalChat = value;
    }
}

decorate(MainStore, {
    currentUser: observable,
    showGlobalChat: observable,
    setCurrentUser: action,
    setShowGlobalChat: action
});

export default new MainStore()