import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { State as loginState, reducer as loginReducer, loginFeatureKey } from './login.reducer'

export interface State {
  [loginFeatureKey]: loginState
}

export const reducers: ActionReducerMap<State> = {
  [loginFeatureKey]: loginReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
