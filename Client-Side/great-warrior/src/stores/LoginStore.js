import { decorate, observable, action, configure } from 'mobx'
configure({ enforceActions: 'observed' });
import { IP, facebookID, googleAndroidClientId, googleIosClientId } from '../routes/Connection'
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';

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
        return await fetch(`${IP}:3000/api/players/login`, {
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json;charset=utf-8"
            }),
            body: JSON.stringify({ email: this.email, password: this.password })
        })
            .then(res => res.json())
            .then(res => res)
            .catch(err => console.warn(err))
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
            res === 'notExist' ? fetch(`${IP}:3000/api/players/socialRegister`, {
                method: "post",
                headers: new Headers({
                    "Content-Type": "application/json;charset=utf-8"
                }),
                body: JSON.stringify({ email })
            })
                .then(res => res.json())
                .then(res => res)
                .catch(err => console.warn(err))
                : res ? email : res
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