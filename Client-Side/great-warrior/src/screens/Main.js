import React, { useEffect } from 'react'
import {
    View, Text, ImageBackground, TouchableOpacity, AsyncStorage,
    TouchableWithoutFeedback, StyleSheet, StatusBar
} from 'react-native'
import { observer, inject } from 'mobx-react'
import GlobalChat from '../components/GlobalChat'

const Main = props => {
    const { mainStore } = props.rootStore;

    useEffect(() => {
        AsyncStorage.getItem('user')
            .then(res => mainStore.setCurrentUser(res));
        StatusBar.setHidden(true);
    }, [])

    return (
        < View style={[styles.page]} >
            <ImageBackground style={styles.page} resizeMode='stretch' source={require('../../assets/images/screen1.png')} >
                <View style={{ flex: 0.8, justifyContent: 'center' }}>
                    <TouchableOpacity style={styles.Button} onPress={() => mainStore.setShowGlobalChat(true)}>
                        <Text style={styles.ButtonText}>Start Game</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.Button} onPress={() => mainStore.setShowGlobalChat(true)}>
                        <Text style={styles.ButtonText}>Global Chat</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Button} onPress={() => mainStore.setShowGlobalChat(true)}>
                        <Text style={styles.ButtonText}>Figures</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Button} onPress={() => mainStore.setShowGlobalChat(true)}>
                        <Text style={styles.ButtonText}>TOP 100</Text>
                    </TouchableOpacity>
                </View>
                {mainStore.showGlobalChat &&
                    <TouchableOpacity style={styles.globalChat} onPress={() => mainStore.setShowGlobalChat(false)}>
                        <GlobalChat />
                    </TouchableOpacity>}
            </ImageBackground>
        </View >
    );
}

export default inject('rootStore')(observer(Main));

const styles = StyleSheet.create({
    page: { flex: 1 },
    footer: { flex: 0.2, flexDirection: 'row', justifyContent: 'space-evenly' },
    Button: {
        flex: 0.2, height: '80%', justifyContent: 'center', alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 100
    },
    ButtonText: { textAlign: 'center', color: 'white' },
    globalChat: { position: 'absolute', height: '100%', width: '100%', backgroundColor: 'rgba(0,0,0,0)' }
});