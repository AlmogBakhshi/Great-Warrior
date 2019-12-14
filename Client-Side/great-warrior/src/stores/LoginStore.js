import { decorate, observable, action, configure } from 'mobx'
configure({ enforceActions: 'observed' });
import { facebookID, googleAndroidClientId, googleIosClientId } from '../routes/Connection'
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import * as Fetch from '../fetches/Fetch';

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

    login = async () => {
        return await Fetch.Post('players/login', { email: this.email, password: this.password });
    }

    emailExist = async (email) => {
        return await Fetch.Get(`players/${email}`);
    }

    facebookLogin = async () => {
        return await Facebook.logInWithReadPermissionsAsync(facebookID, { permissions: ['email'] })
            .then(({ type, token }) => fetch(`https://graph.facebook.com/me?fields=email&access_token=${token}`)
                .then(response => response.json())
                .then(result => type === 'success' && this.socialLogin(result.email))
                .catch(err => console.warn(err))
            ).catch(err => console.warn(err))
    }

    googleLogin = async () => {
        return await Google.logInAsync({
            androidClientId: googleAndroidClientId,
            iosClientId: googleIosClientId,
            scopes: ['email']
        }).then(response => response.type === 'success' && this.socialLogin(response.user.email))
            .catch(err => console.warn(err))
    }

    socialLogin = async (email) => {
        return await this.emailExist(email).then(res =>
            res === 'notExist' ? Fetch.Post('players/socialRegister', { email }) :
                res ? email : res
        ).catch(err => console.warn(err))
    }
}

decorate(LoginStore, {
    email: observable,
    password: observable,
    characterPosition: observable,
    setEmail: action,
    setPassword: action,
    setCharacterPosition: action,
    login: action,
    facebookLogin: action,
    googleLogin: action
});

export default new LoginStore()