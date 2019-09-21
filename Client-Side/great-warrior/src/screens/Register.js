import React from 'react'
import {
    View, Text, TextInput, TouchableOpacity, Image, AsyncStorage,
    ImageBackground, Alert, KeyboardAvoidingView, StyleSheet
} from 'react-native'
import { observer, inject } from 'mobx-react'

const Register = props => {
    const regexEmail = /^(([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}))$/;
    const regexPassword = /^(.{6,20})$/;

    const { email, password, confirmPassword } = props.rootStore.registerStore;

    const HandleSubmit = () => {
        if (regexEmail.test(email.toUpperCase()) && regexPassword.test(password) &&
            regexPassword.test(confirmPassword) && password === confirmPassword) {
            props.rootStore.registerStore.register()
                .then(res => {
                    res === 'exist' ? Alert.alert('Warning', 'Email already exist')
                        : res ? AsyncStorage.setItem('user', email)
                            .then(() => {
                                props.navigation.goBack();
                                props.rootStore.registerStore.setGoBack()
                            })
                            : Alert.alert('Error', 'There is problem with the server.\nTry again later')
                })
        }
    }

    return (
        <KeyboardAvoidingView style={styles.page} behavior="padding" >
            <ImageBackground style={styles.page} resizeMode='stretch' source={require('../../assets/images/screen2.png')}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => props.navigation.goBack()}>
                        <Image resizeMode='contain' source={require('../../assets/images/back.png')} />
                    </TouchableOpacity>
                    <Image style={styles.logoImage} source={require('../../assets/images/logo.png')} resizeMode='contain' />
                </View>
                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.txtInput, {
                                borderColor: (email === "" && "black" ||
                                    !regexEmail.test(email.toUpperCase()) && "red" || "green")
                            }]}
                            placeholderTextColor='black'
                            placeholder='Example@example.com'
                            keyboardType='email-address'
                            value={email}
                            onChangeText={e => props.rootStore.registerStore.setEmail(e)}
                        />
                        <Text style={styles.inputError}>
                            {(email === '' && "Enter your email" || !regexEmail.test(email.toUpperCase()) && "Email is invalid" ||
                                "We’ll occasionally send updates about your account to this inbox.\nWe’ll never share your email address with anyone.")}
                        </Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.txtInput, {
                                borderColor: (password === "" && "black" ||
                                    !regexPassword.test(password) && "red" || "green")
                            }]}
                            placeholder="Password"
                            placeholderTextColor='black'
                            maxLength={20}
                            secureTextEntry={true}
                            value={password}
                            onChangeText={e => props.rootStore.registerStore.setPassword(e)} />
                        <Text style={styles.inputError}>
                            {(password === '' && "Enter a password" ||
                                !regexPassword.test(password) && "The password sold be between 6 - 20 characters" ||
                                "We encrypt your password for your protection")}
                        </Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.txtInput, {
                                borderColor: (confirmPassword === "" && "black" ||
                                    (!regexPassword.test(confirmPassword) || password !== confirmPassword) && "red" || "green")
                            }]}
                            placeholder="Confirm Password"
                            placeholderTextColor='black'
                            maxLength={20}
                            secureTextEntry={true}
                            value={confirmPassword}
                            onChangeText={e => props.rootStore.registerStore.setConfirmPassword(e)} />
                        <Text style={styles.inputError}>
                            {(confirmPassword === '' && "Confirm your password" ||
                                !regexPassword.test(confirmPassword) && "The password sold be between 6 - 20 characters" ||
                                password !== confirmPassword && "Not equal to password" || "Password confirmed.")}
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.submitButton} onPress={HandleSubmit}>
                        <Text>
                            Submit
                    </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
}

export default inject('rootStore')(observer(Register));

const styles = StyleSheet.create({
    page: { flex: 1 },
    header: { flex: 0.2, alignItems: 'center' },
    logoImage: { flex: 1 },
    backButton: { position: 'absolute', left: '5%', top: '15%' },
    form: { flex: 0.8, alignItems: 'center', justifyContent: 'space-evenly' },
    inputContainer: { width: '100%', alignItems: 'center' },
    txtInput: { height: 40, width: '90%', textAlign: 'center', borderWidth: 1, borderColor: "black", borderRadius: 10 },
    inputError: { fontSize: 11, color: 'gray', textAlign: 'center' },
    submitButton: { height: 40, width: '40%', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: "black", borderRadius: 10 },
});