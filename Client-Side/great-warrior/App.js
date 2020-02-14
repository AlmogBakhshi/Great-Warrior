import React from 'react';
import { View, StyleSheet, StatusBar, I18nManager } from 'react-native'
import { Provider } from 'mobx-react'
import RootStore from './src/stores/RootStore'
import StackNavigator from './src/routes/StackNavigator'

I18nManager.allowRTL(false);
I18nManager.forceRTL(false);
StatusBar.setHidden(true);
console.disableYellowBox = true;

const App = () => {
  return (
    <View style={styles.page}>
      <Provider rootStore={RootStore}>
        <StackNavigator />
      </Provider>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  page: { flex: 1 }
});