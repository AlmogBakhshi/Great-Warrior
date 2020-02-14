import loginStore from './LoginStore';
import registerStore from './RegisterStore';
import mainStore from './MainStore';
import globalChatStore from './GlobalChatStore';
import figuresStore from './FiguresStore';
import top100Store from './Top100Store';
import gameStore from './GameStore';

const RootStore = {
    loginStore,
    registerStore,
    mainStore,
    globalChatStore,
    figuresStore,
    top100Store,
    gameStore
}
export default RootStore;