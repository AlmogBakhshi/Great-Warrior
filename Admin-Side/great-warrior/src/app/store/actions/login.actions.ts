import { createAction, props } from '@ngrx/store';

export const changeEmail = createAction(
  '[Login] Login User',
  props<{ email: string }>()
);

export const changePassword = createAction(
  '[Login] Change Password',
  props<{ password: string }>()
);

export const loginSuccess = createAction(
  '[Login] Login Success',
  props<{ loggedIn: boolean }>()
);

export const emailError = createAction(
  '[Login] Email Error',
  props<{ emailErr: string }>()
);

export const passwordError = createAction(
  '[Login] Password Error',
  props<{ passwordErr: string }>()
);
