import { Action, createReducer, on } from '@ngrx/store';
import * as loginActions from '../actions/login.actions';

export const loginFeatureKey = 'login';

export interface State {
  email: string;
  password: string;
  loggedIn: boolean;
  emailErr: string;
  passwordErr: string;
}

export const initialState: State = {
  email: '',
  password: '',
  loggedIn: false,
  emailErr: '',
  passwordErr: ''
};

const loginReducer = createReducer(
  initialState,
  on(loginActions.changeEmail, (state, action) => ({ ...state, email: action.email })),
  on(loginActions.changePassword, (state, action) => ({ ...state, password: action.password })),
  on(loginActions.loginSuccess, (state, action) => ({ ...state, loggedIn: action.loggedIn })),
  on(loginActions.emailError, (state, action) => ({ ...state, emailErr: action.emailErr })),
  on(loginActions.passwordError, (state, action) => ({ ...state, passwordErr: action.passwordErr }))
);

export function reducer(state: State | undefined, action: Action) {
  return loginReducer(state, action);
}
