import { decorate, observable, action, configure } from 'mobx'
configure({ enforceActions: "observed" });
import { IP } from '../routes/Connection'

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
        return await fetch(`${IP}:3000/api/players/${email}`, {
            method: "get",
            headers: new Headers({
                "Content-Type": "application/json;charset=utf-8"
            })
        })
            .then(res => res.json())
            .then(res => res)
            .catch(err => console.warn(err))
    }

    register = async () => {
        return await this.emailExist(this.email).then(res =>
            res === 'notExist' ? fetch(`${IP}:3000/api/players/register`, {
                method: "post",
                headers: new Headers({
                    "Content-Type": "application/json;charset=utf-8"
                }),
                body: JSON.stringify({ email: this.email, password: this.password })
            })
                .then(res => res.json())
                .then(res => res)
                .catch(err => console.warn(err))
                : res ? 'exist' : res
        ).catch(err => console.warn(err))
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