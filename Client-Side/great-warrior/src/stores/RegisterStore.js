import { decorate, observable, action, computed } from 'mobx'

class RegisterStore {
    email = '';
    password = '';
    confirmPassword = '';

    setEmail = (email) => {
        this.email = email;
    }

    setPassword = (password) => {
        this.password = password;
    }

    setConfirmPassword = (confirmPassword) => {
        this.confirmPassword = confirmPassword;
    }
}

decorate(RegisterStore, {
    email: observable,
    password: observable,
    confirmPassword: observable,
    setEmail: action,
    setPassword: action,
    setConfirmPassword: action
});

export default new RegisterStore()