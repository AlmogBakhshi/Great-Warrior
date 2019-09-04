import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

import Login from '../screens/Login'
import Register from '../screens/Register'
import Main from '../screens/Main'

const StackNavigator = (props) => {

    const RootStack = createStackNavigator(
        {
            Login,
            Register,
            Main
        },
        {
            initialRouteName: 'Login',
            defaultNavigationOptions: { header: null }
        }
    );

    const AppContainer = createAppContainer(RootStack);

    return <AppContainer />;
};

export default StackNavigator;