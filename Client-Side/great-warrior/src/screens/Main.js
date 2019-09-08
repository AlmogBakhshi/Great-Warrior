import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {observer, inject} from 'mobx-react'

const Main = props => {
    return (
        <View style={styles.page}>
            <Text>
                Main
            </Text>
        </View>
    );
}

export default inject('rootStore')(observer(Main));

const styles = StyleSheet.create({
    page: { flex: 1 }
});