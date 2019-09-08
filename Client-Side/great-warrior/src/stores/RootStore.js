import LoginStore from './LoginStore'
import RegisterStore from './RegisterStore'
import MainStore from './MainStore'

// class RootStore {
//     constructor() {
//         this.loginStore = LoginStore;
//         this.registerStore = RegisterStore;
//         this.mainStore = MainStore;
//     }
// }

// export default new RootStore();

const RootStore = {
    loginStore: LoginStore,
    registerStore: RegisterStore,
    mainStore: MainStore
}
export default RootStore;