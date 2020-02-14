import React, { useEffect } from 'react';
import { View, FlatList, Text, Image, StyleSheet, AsyncStorage, Dimensions, TouchableOpacity } from 'react-native';
import { observer, inject } from 'mobx-react';
import Modal from 'react-native-modal';

const { width, height } = Dimensions.get('window');

const Figures = (props) => {
    const { figuresStore } = props.rootStore;

    useEffect(() => {
        figuresStore.fetchAllFigures()
            .then(() => AsyncStorage.getItem('user').then(res => figuresStore.fetchFiguresOfPlayer(res)));
    }, [])

    const AllFiguresOfPlayer = ({ item }) => {
        const exist = item !== 'none';
        return (
            <View style={styles.figuresOfPlayer}>
                {exist && <Image source={item.icon} resizeMode='contain' style={{ flex: 0.6 }} />}
                {exist && <Text>{item.Figure_Name}</Text>}
                {exist && <TouchableOpacity style={styles.figuresOfPlayerButton} onPress={() => HandleDeleteFigure(item.Figure_Name)}><Text>remove</Text></TouchableOpacity>}
            </View>
        );
    }

    const AllFigures = ({ item }) => {
        return (
            <View style={styles.figure}>
                <Image source={item.icon} resizeMode='contain' style={{ flex: 0.6 }} />
                <Text>{item.Figure_Name}</Text>
                <Text>Attack: {item.Figure_Attack}</Text>
                <Text>Life: {item.Figure_Defense}</Text>
                <TouchableOpacity style={styles.figureButton} onPress={() => HandleAddFigure(item.Figure_Name)}><Text>Set</Text></TouchableOpacity>
            </View>
        );
    }

    const HandleAddFigure = (figureName) => {
        !figuresStore.figuresOfPlayer.every(figure => figure !== 'none') && // check if have 4 figure
            !figuresStore.figuresOfPlayer.find(figure => figure !== 'none' && figure.Figure_Name === figureName) && // check if figure already exist
            AsyncStorage.getItem('user')
                .then(email => figuresStore.fetchAddToFigureOfPlayer({ email, figureName })
                    .then(res => res !== false && figuresStore.fetchFiguresOfPlayer(email)));
    }

    const HandleDeleteFigure = (figureName) => {
        AsyncStorage.getItem('user')
            .then(email => figuresStore.fetchDeleteFromFigureOfPlayer({ email, figureName })
                .then(res => res !== false && figuresStore.fetchFiguresOfPlayer(email)));
    }

    return (
        <Modal
            style={styles.modal}
            backdropOpacity={1}
            animationIn={'slideInUp'}
            animationOut={'slideOutUp'}
            isVisible={props.open}
            onBackdropPress={() => props.close()}
            onBackButtonPress={() => props.close()}>
            <View style={styles.page}>
                <View style={styles.figuresOfPlayerFlatList}>
                    <FlatList
                        numColumns={4}
                        data={figuresStore.figuresOfPlayer}
                        renderItem={AllFiguresOfPlayer}
                        keyExtractor={item => item.Figure_Name}
                        extraData={figuresStore.figuresOfPlayer}
                    />
                </View>
                <View style={styles.figureFlatList}>
                    <FlatList
                        numColumns={3}
                        data={figuresStore.figures}
                        renderItem={AllFigures}
                        keyExtractor={item => item.Figure_Name}
                    />
                </View>
                <View style={styles.back}>
                    <TouchableOpacity style={styles.button} onPress={() => props.close()} >
                        <Text style={styles.buttonText}>Back</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default inject('rootStore')(observer(Figures));

const styles = StyleSheet.create({
    modal: { margin: 0, padding: 0, flex: 1 },
    page: { flex: 1, backgroundColor: 'gray' },
    figuresOfPlayerFlatList: { flex: 0.15 },
    figureFlatList: { flex: 0.75 },
    back: { flex: 0.1, flexDirection: 'row', justifyContent: 'space-evenly' },
    figure: {
        flex: 1, borderRadius: 10, backgroundColor: 'red', margin: 1, alignItems: 'center',
        justifyContent: 'center', height: width / 3,
        backgroundColor: "#FFFFFF", borderRadius: 10, shadowOpacity: 1,
        shadowColor: "rgba(0,0,0,0.15)", shadowRadius: 5, elevation: 15
    },
    figuresOfPlayer: {
        flex: 1, borderRadius: 10, backgroundColor: 'red', margin: 1, alignItems: 'center',
        justifyContent: 'center', height: width / 4,
        backgroundColor: "#FFFFFF", borderRadius: 10, shadowOpacity: 1,
        shadowColor: "rgba(0,0,0,0.15)", shadowRadius: 5, elevation: 15
    },
    figureButton: { borderWidth: 1, borderColor: 'black', padding: 2, borderRadius: 5 },
    figuresOfPlayerButton: { borderWidth: 1, borderColor: 'black', padding: 2, borderRadius: 5 },
    button: {
        flex: 0.2, height: '80%', justifyContent: 'center', alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 100
    },
    buttonText: { textAlign: 'center', color: 'white' },
})