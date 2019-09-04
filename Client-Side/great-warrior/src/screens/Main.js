import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Main = props => {
    return (
        <View style={styles.page}>
            <Text>
                Main
            </Text>
        </View>
    );
}

export default Main;

const styles = StyleSheet.create({
    page: { flex: 1 }
});