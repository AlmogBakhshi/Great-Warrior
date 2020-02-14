import React, { useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { observer, inject } from 'mobx-react';
import Modal from 'react-native-modal';

const Top100 = (props) => {
    const { top100Store } = props.rootStore;

    useEffect(() => {
        top100Store.fetchTop100();
    }, [])

    return (
        <Modal
            style={styles.modal}
            backdropOpacity={0}
            animationIn={'zoomInDown'}
            animationOut={'zoomOutUp'}
            animationInTiming={1000}
            animationOutTiming={1000}
            backdropTransitionInTiming={1000}
            backdropTransitionOutTiming={1000}
            isVisible={props.open}
            onBackdropPress={() => props.close()}
            onBackButtonPress={() => props.close()}>
            <View style={styles.page}>
                <FlatList
                    data={top100Store.top100}
                    renderItem={({ item }) => <Text>{item.Player_Email} {item.Player_Name} {item.Player_Score}</Text>}
                    keyExtractor={item => item.Player_Email}
                />
            </View>
        </Modal>
    )
}

export default inject('rootStore')(observer(Top100));

const styles = StyleSheet.create({
    modal: { flex: 0.6 },
    page: { flex: 1, backgroundColor: 'gray' },
})