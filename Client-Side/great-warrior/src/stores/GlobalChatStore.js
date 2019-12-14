import { decorate, observable, action, configure } from 'mobx'
configure({ enforceActions: 'observed' });
import io from 'socket.io-client'
import { IP } from '../routes/Connection'

class GlobalChatStore {
    socket = null;
    globalChat = [];
    message = '';

    setSocket = () => {
        this.socket = io(IP);
        this.getMessages();
    }

    getMessages = () => {
        this.socket.on('chat message', msg => {
            this.setGlobalChat(msg);
        });
    }

    setGlobalChat = (msg) => {
        this.globalChat = [...this.globalChat, msg]
    }

    sendMessage = (user) => {
        this.socket.emit('chat message', `${user}: ${this.message}`);
        this.setMessage('');
    }

    setMessage = (val) => {
        this.message = val;
    }
}

decorate(GlobalChatStore, {
    socket: observable,
    globalChat: observable,
    message: observable,
    setSocket: action,
    sendMessage: action,
    setGlobalChat: action,
    setMessage: action,
});

export default new GlobalChatStore()