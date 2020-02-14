import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import '../styles/MainStyle.css';
import Header from '../components/Header';
import Admins from '../components/Admins';
import Players from '../components/Players';
import Figures from '../components/Figures';
import FiguresOfPlayer from '../components/FiguresOfPlayer';

const Main = (props) => {
    const { mainStore } = props.rootStore;
    const history = useHistory();

    useEffect(() => {
        !localStorage.getItem('remember') && history.replace('/');
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
            case 2:
                return <Figures />
            case 3:
                return <FiguresOfPlayer />
            default:
                return <Admins />
        }
    }

    const titles = ['Admins', 'Players', 'Figures', 'Figures Of Player'];

    return (
        <div className='main'>
            <Header setSelectedTab={HandleSelectedTab} selectedTab={mainStore.selectedTab} titles={titles} />
            <Body />
        </div>
    );
}

export default inject('rootStore')(observer(Main));