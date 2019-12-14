import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import '../styles/MainStyle.css';
import Header from '../components/Header';
import Admins from '../components/Admins';
import Players from '../components/Players';

const Main = (props) => {
    const { mainStore } = props.rootStore;
    const history = useHistory();

    useEffect(() => {
        const remember = localStorage.getItem('remember');
        !remember && history.goBack();
    }, [])

    const HandleSelectedTab = (selectedTab) => {
        mainStore.setSelectedTab(selectedTab);
    };

    const Body = () => {
        switch (mainStore.selectedTab) {
            case 0:
                return <Admins />
            case 1:
                return <Players />
            default:
                return <Admins />
        }
    }

    return (
        <div className='main'>
            <Header setSelectedTab={HandleSelectedTab} selectedTab={mainStore.selectedTab} />
            <Body />
        </div>
    );
}

export default inject('rootStore')(observer(Main));