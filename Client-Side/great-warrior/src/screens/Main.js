import React, { useEffect } from 'react'
import {
    View, Text, ImageBackground, TouchableOpacity, TouchableWithoutFeedback,
    AsyncStorage, StyleSheet
} from 'react-native'
import { observer, inject } from 'mobx-react'
import GlobalChat from '../components/GlobalChat';
import Figures from '../components/Figures';
import Top100 from '../components/Top100';
import Game from '../components/Game';

const Main = props => {
    const { mainStore } = props.rootStore;

    useEffect(() => {
        AsyncStorage.getItem('user')
            .then(res => mainStore.setCurrentUser(res));
    }, [])

    return (
        < View style={[styles.page]} >
            <ImageBackground style={styles.page} resizeMode='stretch' source={require('../../assets/images/screen1.png')} >
                <View style={{ flex: 0.8, justifyContent: 'center' }}>
                    <TouchableOpacity style={styles.button} onPress={() => mainStore.setStartGame(true)}>
                        <Text style={styles.buttonText}>Start Game</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.button} onPress={() => mainStore.setShowGlobalChat(true)}>
                        <Text style={styles.buttonText}>Global Chat</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => mainStore.setShowFigures(true)}>
                        <Text style={styles.buttonText}>Figures</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => mainStore.setShowTop100(true)}>
                        <Text style={styles.buttonText}>TOP 100</Text>
                    </TouchableOpacity>
                </View>

                {mainStore.showGlobalChat && <GlobalChat open={mainStore.showGlobalChat}
                    close={() => mainStore.setShowGlobalChat(false)} />}
                {mainStore.showFigures && <Figures open={mainStore.showFigures}
                    close={() => mainStore.setShowFigures(false)} />}
                {mainStore.showTop100 && <Top100 open={mainStore.showTop100}
                    close={() => mainStore.setShowTop100(false)} />}
                {mainStore.startGame && <Game open={mainStore.startGame}
                    close={() => mainStore.setStartGame(false)} />}
            </ImageBackground>
        </View >
    );
}

export default inject('rootStore')(observer(Main));

const styles = StyleSheet.create({
    page: { flex: 1 },
    footer: { flex: 0.2, flexDirection: 'row', justifyContent: 'space-evenly' },
    button: {
        flex: 0.2, height: '80%', justifyContent: 'center', alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 100
    },
    buttonText: { textAlign: 'center', color: 'white' },
    modal: { position: 'absolute', height: '100%', width: '100%', backgroundColor: 'rgba(0,0,0,0)' }
});