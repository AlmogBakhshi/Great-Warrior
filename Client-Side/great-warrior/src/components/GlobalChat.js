import React, { useEffect } from 'react';
import {
    View, FlatList, Text, TextInput, TouchableOpacity,
    KeyboardAvoidingView, StyleSheet
} from 'react-native';
import { observer, inject } from 'mobx-react'
import Modal from 'react-native-modal';

const GlobalChat = (props) => {
    const { mainStore, globalChatStore } = props.rootStore;

    useEffect(() => {
        globalChatStore.setSocket();
    }, [])

    return (
        globalChatStore.socket &&
        <Modal
            style={styles.modal}
            animationIn={'slideInLeft'}
            animationOut={'slideOutLeft'}
            backdropOpacity={0}
            isVisible={props.open}
            onBackdropPress={() => props.close()}
            onBackButtonPress={() => props.close()}>
            <KeyboardAvoidingView style={styles.page} behavior='padding' >
                <FlatList
                    style={styles.flatList}
                    data={globalChatStore.globalChat}
                    renderItem={({ item }) => <Text style={{ marginVertical: '1%' }}>{item}</Text>}
                    keyExtractor={(item, index) => index.toString()}
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
        </Modal>
    );
}

export default inject('rootStore')(observer(GlobalChat));

const styles = StyleSheet.create({
    modal: { margin: 0, padding: 0, width: '60%' },
    page: { flex: 1, backgroundColor: 'gray' },
    flatList: { flex: 1, marginTop: 5, marginLeft: 5 },
    footer: { flex: 0.1, flexDirection: 'row', borderRadius: 10, backgroundColor: 'white', alignItems: 'center' },
    message: { flex: 1 },
    submit: { flex: 0.1, height: '90%', borderRadius: 100, backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center' }
});