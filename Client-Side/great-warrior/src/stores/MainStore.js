import { decorate, observable, action, configure } from 'mobx'
configure({ enforceActions: 'observed' });
import io from 'socket.io-client'
import { IP } from '../routes/Connection'

class MainStore {
    socket = null;
    globalChat = [];

    setSocket = () => {
        this.socket = io(`${IP}:3001`);
        console.log('a user connected, socket!=null', this.socket !== null);
        this.getMessages();
    }

    getMessages = () => {
        console.log('setGetMessage1');
        this.socket.on('chat message', msg => {
            this.setGlobalChat(msg);
            //this.setMessage(msg);
            console.log('getmessage: ', msg);
        });
        console.log('setGetMessage2');
    }

    setGlobalChat = (msg) => {
        this.globalChat = [...this.globalChat, msg]
    }

    sendMessage = (msg) => {
        console.log(msg)
        this.socket.emit('chat message', msg);
        console.log('sent message');
        //this.setMessage('');
    }

    setMessage = (val) => {
        this.message = val;
    }
}

decorate(MainStore, {
    socket: observable,
    globalChat: observable,
    message: observable,
    setSocket: action,
    setSendMessage: action,
    setGlobalChat: action,
    setMessage: action,
});

export default new MainStore()