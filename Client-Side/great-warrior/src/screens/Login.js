import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Login = props => {
    return (
        <View style={styles.page}>
            <Text>
                Login
            </Text>
        </View>
    );
}

export default Login;

const styles = StyleSheet.create({
    page: { flex: 1 }
});