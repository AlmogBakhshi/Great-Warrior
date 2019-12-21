import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import '../styles/LoginStyle.css';
import { TextField, FormControlLabel, Checkbox, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom'
import { GridLoader } from 'react-spinners';

const Login = (props) => {
    const { loginStore } = props.rootStore;
    const history = useHistory();

    useEffect(() => {
        const remember = localStorage.getItem('remember');
        remember === 'true' && history.push("/main");
    }, [])

    const HandleChangeValue = (event, input) => {
        switch (input) {
            case 'email':
                loginStore.setEmail(event.target.value)
                break;
            case 'password':
                loginStore.setPassword(event.target.value)
                break;
            default:
                console.error(`${input} not found`)
                break;
        }
        loginStore.setShowError(false);
    }

    const HandleRememberMe = (event) => {
        loginStore.setRememberMe(event.target.checked)
    }

    const HandleLogin = () => {
        loginStore.fetchLogin()
            .then(res => {
                if (res === true) {
                    localStorage.setItem('remember', loginStore.rememberMe);
                    history.push("/main");
                }
                else loginStore.setShowError(true)
                loginStore.setLoading();
            });
    }

    return (
        <div className='login'>
            <div className='loginContainer'>
                <img src={require('../assets/logo.png')} className='loginLogo' alt='Login' />
                <form className='loginForm' >
                    <TextField type='text' label="Email" variant="outlined" className='loginInput'
                        onChange={e => HandleChangeValue(e, 'email')} style={{ marginBottom: '10px' }} />
                    <TextField type='password' label="Password" variant="outlined" className='loginInput'
                        onChange={e => HandleChangeValue(e, 'password')} style={{ marginBottom: '10px' }} />
                    {loginStore.showError && <div className='loginError'>email or password incorrect</div>}
                    <FormControlLabel className='loginRememberMe noSelect'
                        onClick={e => e.target}
                        control={<Checkbox color="default" checked={loginStore.rememberMe} onChange={HandleRememberMe} />}
                        label="Remember me"
                    />
                    <Button variant="contained" className='loginSubmit' onClick={HandleLogin} >Submit</Button>
                </form>
            </div>
            {loginStore.loading && <div className='loginLoading'>
                <GridLoader
                    size={20}
                    color={'rgb(0, 201, 255)'}
                />
            </div>}
        </div>
    );
}

export default inject('rootStore')(observer(Login));