import { decorate, observable, action, computed } from 'mobx'

class LoginStore {
    email = '';
    password = ''
    characterPosition = { x: 0, y: 0 };

    setEmail = (email) => {
        this.email = email;
    }

    setPassword = (password) => {
        this.password = password;
    }

    setCharacterPosition = (x, y) => {
        this.characterPosition.x += x;
        this.characterPosition.y += y;
    }
}

decorate(LoginStore, {
    email: observable,
    password: observable,
    characterPosition: observable,
    setEmail: action,
    setPassword: action,
    setCharacterPosition: action
});

export default new LoginStore()