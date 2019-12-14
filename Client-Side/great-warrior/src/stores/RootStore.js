import LoginStore from './LoginStore'
import RegisterStore from './RegisterStore'
import MainStore from './MainStore'
import GlobalChatStore from './GlobalChatStore'

const RootStore = {
    loginStore: LoginStore,
    registerStore: RegisterStore,
    mainStore: MainStore,
    globalChatStore: GlobalChatStore
}
export default RootStore;