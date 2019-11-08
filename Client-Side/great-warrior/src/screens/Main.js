import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { observer, inject } from 'mobx-react'
import GlobalChat from '../components/GlobalChat'

const Main = props => {
    useEffect(() => {
        props.rootStore.mainStore.setSocket();
    }, [])

    return (
        < View style={styles.page} >
            {console.log('main rend')}
            <GlobalChat props={props} />
        </View >
    );
}

export default inject('rootStore')(observer(Main));

const styles = StyleSheet.create({
    page: { flex: 1 }
});