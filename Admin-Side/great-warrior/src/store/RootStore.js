import loginStore from './LoginStore';
import mainStore from './MainStore';
import adminsStore from './AdminsStore';
import playersStore from './PlayersStore';
import figuresStore from './FiguresStore';
import figuresOfPlayerStore from './FiguresOfPlayerStore';

const RootStore = {
    loginStore,
    mainStore,
    adminsStore,
    playersStore,
    figuresStore,
    figuresOfPlayerStore
}
export default RootStore;