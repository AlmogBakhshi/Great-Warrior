import { decorate, observable, action, configure } from 'mobx'
configure({ enforceActions: 'observed' });
import * as Fetch from '../fetches/Fetch';

class Top100Store {
    top100 = null;

    setTop100 = (value) => {
        this.top100 = value;
    }

    fetchTop100 = () => {
        Fetch.Get('players/top')
            .then(res => this.setTop100(...res))
            .catch(err => console.error(err));
    }
}

decorate(Top100Store, {
    top100: observable,
    setTop100: action,
    fetchTop100: action,
});

export default new Top100Store()