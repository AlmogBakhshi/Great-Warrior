import { decorate, observable, action, configure } from 'mobx'
configure({ enforceActions: "observed" });
import * as Fetch from '../fetches/Fetch';

class RegisterStore {
    email = '';
    password = '';
    confirmPassword = '';
    goBack = false;

    setEmail = (email) => {
        this.email = email;
    }

    setPassword = (password) => {
        this.password = password;
    }

    setConfirmPassword = (confirmPassword) => {
        this.confirmPassword = confirmPassword;
    }

    setGoBack = () => {
        this.goBack = !this.goBack;
    }

    emailExist = async (email) => {
        return await Fetch.Get(`players/${email}`)
            .catch(err => console.error(err));
    }

    register = async () => {
        return await this.emailExist(this.email).then(res =>
            res === 'notExist' ? Fetch.Post('players/register', { email: this.email, password: this.password }) :
                res ? 'exist' : res
        ).catch(err => console.warn(err));
    }
}

decorate(RegisterStore, {
    email: observable,
    password: observable,
    confirmPassword: observable,
    goBack: observable,
    setEmail: action,
    setPassword: action,
    setConfirmPassword: action,
    setGoBack: action,
    register: action
});

export default new RegisterStore()