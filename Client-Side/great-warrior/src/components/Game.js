import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing, Image, StyleSheet, Dimensions, AsyncStorage } from 'react-native';
import { observer, inject } from 'mobx-react';
import Modal from 'react-native-modal';

const { height } = Dimensions.get('window')

const Game = (props) => {
    const { gameStore } = props.rootStore;

    const xFiguresValue = new Animated.Value(0);
    const xEnemyValue = new Animated.Value(0);
    const springFiguresValue = new Animated.Value(1);
    const springEnemyValue = new Animated.Value(1);
    const springPlayerLifeValue = new Animated.Value(0.01);

    const randAttack = Math.floor(Math.random() * gameStore.attack) + 1

    useEffect(() => {
        AsyncStorage.getItem('user').then(res => gameStore.fetchFiguresOfPlayer(res))
    }, [])

    const HandleShowFigures = () => {
        return (
            gameStore.playerFigures.length > 0 && gameStore.playerFigures.map((figure, index) =>
                <Image key={index} source={figure.icon} style={styles.playerFigure} resizeMode='contain' />)
        )
    }

    // #region Animated
    const HandleMoveFigures = () => {
        Animated.timing(xFiguresValue, {
            toValue: height * 0.7,
            duration: 1000,
            easing: Easing.cubic
        }).start(() => {
            Animated.timing(xFiguresValue, {
                toValue: 0,
                duration: 500,
                easing: Easing.linear
            }).start(() => HandleSpringEnemy())
        })
    }

    const HandleMoveEnemy = () => {
        Animated.timing(xEnemyValue, {
            toValue: height * 0.7,
            duration: 1000,
            easing: Easing.cubic
        }).start(() => {
            Animated.timing(xEnemyValue, {
                toValue: 0,
                duration: 500,
                easing: Easing.linear
            }).start(() => HandleSpringFigures())
        });
    }

    const HandleSpringFigures = () => {
        Animated.spring(springFiguresValue, {
            toValue: 0.7,
            friction: 2.5,
        }).start(() =>
            Animated.spring(springFiguresValue, {
                toValue: 1,
                friction: 2.5,
            }).start(() => HandleSpringPlayerLife()));
    }

    const HandleSpringEnemy = () => {
        Animated.spring(springEnemyValue, {
            toValue: 0.7,
            friction: 2.5,
        }).start(() => Animated.spring(springEnemyValue, {
            toValue: 1,
            friction: 2.5,
        }).start(() => HandleMoveEnemy()));
    }

    const HandleSpringPlayerLife = () => {
        Animated.spring(springPlayerLifeValue, {
            toValue: 2,
            friction: 7,
        }).start(() => Animated.spring(springPlayerLifeValue, {
            toValue: 0.01,
            friction: 7,
        }).start(() => {
            gameStore.setAllowAttack();
            gameStore.setLife(randAttack);
        }))
    }
    // #endregion

    const HandleClose = () => {
        AsyncStorage.getItem('user')
            .then(res => gameStore.fetchUpdatePlayerScore(res)
                .then(() => props.close()));
    }

    return (
        <Modal
            style={styles.modal}
            isVisible={props.open}
            onBackButtonPress={HandleClose}>
            <View style={styles.container}>
                <View style={styles.canvas} >
                    <Animated.Image source={require('../../assets/images/dragonEnemy.png')} resizeMode='contain'
                        style={[styles.enemy, { top: xEnemyValue, transform: [{ scale: springEnemyValue }] }]}></Animated.Image>
                    <Animated.View style={[styles.playerFigures, { bottom: xFiguresValue, transform: [{ scale: springFiguresValue }] }]}>
                        {gameStore.playerFigures && <HandleShowFigures />}
                        <Animated.Text style={{ position: 'absolute', left: '50%', transform: [{ scale: springPlayerLifeValue }] }}>
                            {randAttack}
                        </Animated.Text>
                    </Animated.View>
                </View>
                <View style={styles.footer} >
                    <TouchableOpacity style={styles.back} onPress={HandleClose} >
                        <Text style={styles.buttonText}>Back</Text>
                    </TouchableOpacity>
                    <View style={styles.lifeContainer}>
                        <View style={[styles.life, { width: `${gameStore.life / gameStore.totalLife * 100}%` }]} />
                        <View style={styles.lifeTextPosition}>
                            <Text>My HP</Text>
                            <Text>{gameStore.totalLife} / {gameStore.life}</Text>
                        </View>
                    </View>
                    <TouchableOpacity disabled={!gameStore.allowAttack} style={styles.attack} onPress={() => gameStore.setAllowAttack()} >
                        <Text style={styles.buttonText}>Attack</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {!gameStore.allowAttack && HandleMoveFigures()}
            {gameStore.life < 1 && gameStore.gameStart && HandleClose()}
        </Modal>
    )
}

export default inject('rootStore')(observer(Game));

const styles = StyleSheet.create({
    modal: { margin: 0, padding: 0, flex: 1 },
    container: { flex: 1, backgroundColor: '#fff' },
    canvas: { flex: 0.85, justifyContent: 'space-between' },
    enemy: { flex: 0.15, alignSelf: 'center' },
    playerFigures: { flex: 0.15, flexDirection: 'row', justifyContent: 'space-evenly' },
    playerFigure: { flex: 0.2, height: '100%' },
    footer: { flex: 0.15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', backgroundColor: 'gray' },
    back: {
        flex: 0.2, height: '80%', justifyContent: 'center', alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 100
    },
    lifeContainer: { flex: 0.5, height: '50%', borderRadius: 10, borderWidth: 1 },
    life: { flex: 1, borderRadius: 10, backgroundColor: 'red' },
    lifeTextPosition: { position: 'absolute', alignSelf: 'center', justifyContent: 'center', alignItems: 'center' },
    // lifeText: {alignSelf: 'center' },
    attack: {
        flex: 0.2, height: '80%', justifyContent: 'center', alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 100
    },
    buttonText: { textAlign: 'center', color: 'white' },
})