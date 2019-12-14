import { decorate, action, observable } from 'mobx';

class MainStore {
    selectedTab = 0;

    setSelectedTab = (selectedTab) => {
        this.selectedTab = selectedTab;
    }
}

decorate(MainStore, {
    selectedTab: observable,
    setSelectedTab: action,
})

export default new MainStore();