import React, { useEffect } from 'react';
import {
    View, FlatList, Text, TextInput, TouchableOpacity,
    KeyboardAvoidingView, StyleSheet
} from 'react-native';
import { observer, inject } from 'mobx-react'

const GlobalChat = (props) => {
    const { mainStore, globalChatStore } = props.rootStore;

    useEffect(() => {
        globalChatStore.setSocket();
    }, [])

    return (
        globalChatStore.socket &&
        <KeyboardAvoidingView style={styles.page} behavior='padding' >
            <FlatList
                style={styles.flatList}
                data={globalChatStore.globalChat}
                renderItem={({ item }) => <Text style={{ marginVertical: '1%' }}>{item}</Text>}
                keyExtractor={(item, index) => index.toString()}
                snapToEnd={true}
            />
            <View style={styles.footer}>
                <TextInput
                    style={styles.message}
                    placeholder='Enter a message'
                    value={globalChatStore.message}
                    onSubmitEditing={() => globalChatStore.sendMessage(mainStore.currentUser)}
                    onChangeText={e => globalChatStore.setMessage(e)}
                />
                <TouchableOpacity style={styles.submit} onPress={() => globalChatStore.sendMessage(mainStore.currentUser)} >
                    <Text>></Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView >
    );
}

export default inject('rootStore')(observer(GlobalChat));

const styles = StyleSheet.create({
    page: { flex: 1, width: '60%', backgroundColor: 'gray' },
    flatList: { flex: 0.9 },
    footer: { flex: 0.1, flexDirection: 'row', borderRadius: 10, backgroundColor: 'white', alignItems: 'center' },
    message: { flex: 0.9 },
    submit: { flex: 0.1, height: '90%', borderRadius: 100, backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center' }
});