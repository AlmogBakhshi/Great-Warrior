import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {observer, inject} from 'mobx-react'

const Register = props => {
    return (
        <View style={styles.page}>
            <Text>
                Register
            </Text>
        </View>
    );
}

export default inject('rootStore')(observer(Register));

const styles = StyleSheet.create({
    page: { flex: 1 }
});