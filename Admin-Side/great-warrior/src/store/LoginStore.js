import { decorate, action, observable, configure } from 'mobx';
import * as Fetch from '../fetches/Fetch';

configure({ enforceActions: 'observed' });

class LoginStore {
    email = '';
    password = '';
    showError = false;
    loading = false
    rememberMe = false;

    setEmail = (vale) => {
        this.email = vale;
    }

    setPassword = (vale) => {
        this.password = vale;
    }

    setShowError = (show) => {
        this.showError = show
    }

    setLoading = () => {
        this.loading = !this.loading;
    }

    setRememberMe = (remember) => {
        this.rememberMe = remember;
    }

    fetchLogin = async () => {
        this.setLoading();
        const body = { Admin_Email: this.email, Admin_Password: this.password };
        return await Fetch.Post('admins/login', body);
    }
}

decorate(LoginStore, {
    email: observable,
    password: observable,
    showError: observable,
    loading: observable,
    rememberMe: observable,
    setEmail: action,
    setPassword: action,
    setShowError: action,
    setLoading: action,
    setRememberMe: action,
    fetchLogin: action,
})

export default new LoginStore();