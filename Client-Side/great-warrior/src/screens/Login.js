import React, { useEffect } from 'react'
import {
    ImageBackground, View, Text, TextInput, TouchableOpacity, Alert,
    Image, KeyboardAvoidingView, StyleSheet, AsyncStorage
} from 'react-native'
import { observer, inject } from 'mobx-react'

const Login = props => {
    let timer;
    useEffect(() => {
        //AsyncStorage.clear();
        HandleGoMain();
        let x = 1;
        let y = 10;
        timer = setInterval(() => {
            //console.log('timer')
            if (props.rootStore.loginStore.characterPosition.x === 40 || props.rootStore.loginStore.characterPosition.x === -40) {
                x *= -1;
                if (props.rootStore.loginStore.characterPosition.y === 20 || props.rootStore.loginStore.characterPosition.y === -40)
                    y *= -1;
                props.rootStore.loginStore.setCharacterPosition(0, y)
            }
            props.rootStore.loginStore.setCharacterPosition(x, 0)
        }, 100);
    }, [])

    useEffect(() => {
        HandleGoMain();
    }, [props.rootStore.registerStore.goBack])

    const HandleGoMain = () => {
        AsyncStorage.getItem('user').then(res => res !== null && props.navigation.replace('Main') && clearInterval(timer));
    }

    const HandleLogin = () => {
        if (props.rootStore.loginStore.email.trim() !== '' && props.rootStore.loginStore.password.trim() !== '') {
            props.rootStore.loginStore.login()
                .then(res => {
                    res === 'notExist' ? Alert.alert('Warning', 'Wrang email or password')
                        : res ? AsyncStorage.setItem('user', props.rootStore.loginStore.email).then(HandleGoMain())
                            : Alert.alert('Error', 'There is problem with the server.\nTry again later')
                });
        }
        else Alert.alert('Warning', 'Wrang email or password');
    }

    const HandleFaceBookLogin = () => {
        props.rootStore.loginStore.facebookLogin().then(res => HandleSocialLogin(res));
    }

    const HandleGoogleLogin = () => {
        props.rootStore.loginStore.googleLogin().then(res => HandleSocialLogin(res));
    }

    const HandleSocialLogin = res => {
        res ? AsyncStorage.setItem('user', res).then(HandleGoMain())
            : Alert.alert('Error', 'There is problem with the server.\nTry again later')
    }

    return (
        <KeyboardAvoidingView style={styles.page} behavior="padding" >
            <ImageBackground style={styles.page} resizeMode='stretch' source={require('../../assets/images/screen2.png')}>
                <View style={styles.logo}>
                    <Image style={styles.logoImage} source={require('../../assets/images/logo.png')} resizeMode='contain' />
                </View>
                <View style={styles.form}>
                    <TextInput
                        style={styles.txtInput}
                        placeholder='Example@example.com'
                        placeholderTextColor='black'
                        keyboardType='email-address'
                        value={props.rootStore.loginStore.email}
                        onChangeText={e => props.rootStore.loginStore.setEmail(e)} />
                    <TextInput
                        style={styles.txtInput}
                        placeholder="Password"
                        placeholderTextColor='black'
                        maxLength={20}
                        secureTextEntry={true}
                        value={props.rootStore.loginStore.password}
                        onChangeText={e => props.rootStore.loginStore.setPassword(e)} />
                    <TouchableOpacity style={styles.submitButton} onPress={HandleLogin}>
                        <Text>Login</Text>
                    </TouchableOpacity>
                    <View style={styles.socialLogin}>
                        <TouchableOpacity style={styles.socialButton} onPress={HandleFaceBookLogin}>
                            <Image style={styles.socialImage} resizeMode='contain' source={require('../../assets/images/Facebook.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton} onPress={HandleGoogleLogin}>
                            <Image style={styles.socialImage} resizeMode='contain' source={require('../../assets/images/Google.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.bottom}>
                    <TouchableOpacity style={[styles.characterButton, {
                        left: `${props.rootStore.loginStore.characterPosition.x}%`,
                        top: `${props.rootStore.loginStore.characterPosition.y}%`
                    }]}
                        onPress={() => props.navigation.navigate('Register')}
                    >
                        <ImageBackground source={require('../../assets/images/character2.png')} resizeMode='contain' style={styles.characterImage}>
                            <Text style={styles.characterText}>Register</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
}

export default inject('rootStore')(observer(Login));

const styles = StyleSheet.create({
    page: { flex: 1 },
    logo: { flex: 0.2, alignItems: 'center', justifyContent: 'center' },
    logoImage: { flex: 1 },
    form: { flex: 0.6, alignItems: 'center', justifyContent: 'space-evenly' },
    txtInput: { height: 40, width: '90%', textAlign: 'center', borderWidth: 1, borderColor: "black", borderRadius: 10 },
    submitButton: { height: 40, width: '40%', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: "black", borderRadius: 10 },
    socialLogin: { flex: 0.3, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' },
    socialButton: { flex: 0.5, alignItems: 'center' },
    socialImage: { flex: 1, width: '50%' },
    bottom: { flex: 0.2, alignItems: 'center', justifyContent: 'center' },
    characterButton: { flex: 0.5, width: '25%' },
    characterImage: { flex: 1, alignItems: 'center', justifyContent: 'flex-end' },
    characterText: { fontWeight: 'bold' }
});