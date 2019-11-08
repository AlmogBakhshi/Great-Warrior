import React, { useState } from 'react';
import { View, FlatList, Text, TextInput, Button, StyleSheet } from 'react-native';
import { observer, inject } from 'mobx-react'

const GlobalChat = (props) => {
    const [getMessage, setMessage] = useState('');
    return (
        <View style={styles.page}>
            {
                props.rootStore.mainStore.socket !== null &&
                <View style={styles.page}>
                    <FlatList
                        style={styles.flatList}
                        data={props.rootStore.mainStore.globalChat}
                        renderItem={({ item }) => <Text>{item}</Text>}
                        keyExtractor={(item, index) => index}
                    //extraData={props.rootStore.mainStore.globalChat}
                    />
                    <TextInput
                        style={styles.message}
                        placeholder='Enter a message'
                        value={getMessage}
                        onChangeText={e => setMessage(e)}
                    />
                    {/* <Text>{props.rootStore.mainStore.message}</Text> */}
                    <Button title='submit' onPress={() => props.rootStore.mainStore.sendMessage(getMessage)} />
                </View>
            }
        </View>
    );
}

//export default GlobalChat
export default inject('rootStore')(observer(GlobalChat));

const styles = StyleSheet.create({
    page: { flex: 1 },
    flatList: { flex: 0.8 },
    message: { flex: 0.2 }
});