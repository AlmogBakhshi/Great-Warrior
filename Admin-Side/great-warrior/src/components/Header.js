import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/HeaderStyle.css';
import { Paper, Tabs, Tab, Button } from '@material-ui/core';

const Header = (props) => {
    const history = useHistory();

    const HandleSelectedTab = (event, selectedTab) => {
        props.setSelectedTab(selectedTab);
    };

    const HandleLogout = () => {
        localStorage.removeItem('remember');
        history.goBack();
    }

    return (
        <Paper className='mainHeader' style={{ backgroundColor: 'rgba(0,0,0,0.1)' }} >
            <div className='mainHeaderLogo' >
                <img src={require('../assets/logo.png')} alt='Great Warrior' className='mainHeaderLogoImage' />
            </div>
            <div className='mainHeaderLinks' >
                <Paper className='mainHeaderLinksContainer' style={{ backgroundColor: 'rgba(0,0,0,0)' }}>
                    <Tabs value={props.selectedTab} indicatorColor="primary" textColor="primary"
                        onChange={HandleSelectedTab} >
                        {props.titles.map((title, index) => <Tab key={index} style={{ fontSize: '0.8em' }} label={title} />)}
                    </Tabs>
                </Paper>
                <Button style={{ fontSize: '0.8em' }} variant="contained" onClick={HandleLogout}>Logout</Button>
            </div>
        </Paper>
    );
}

export default Header;