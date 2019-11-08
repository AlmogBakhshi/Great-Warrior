import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { HttpClient } from "@angular/common/http"
import { State } from '../../store/reducers';
import { Observable } from 'rxjs';
import * as loginActions from '../../store/actions/login.actions';

const regexEmail = /^(([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}))$/;
const regexPassword = /^(.{6,20})$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  email$: Observable<string> = this._state$.pipe(select('login', 'email'));
  password$: Observable<string> = this._state$.pipe(select('login', 'password'));
  emailError$: Observable<string> = this._state$.pipe(select('login', 'emailErr'));
  passwordError$: Observable<string> = this._state$.pipe(select('login', 'passwordErr'));

  constructor(private _state$: Store<State>, private _http: HttpClient) { }

  ngOnInit() {
  }

  sendEmail = (event) => {
    this._state$.dispatch(loginActions.emailError({ emailErr: regexEmail.test(event.target.value) ? "" : "wrang email, please write correct email" }))
    this._state$.dispatch(loginActions.changeEmail({ email: event.target.value }))
  }

  sendPassword = (event) => {
    this._state$.dispatch(loginActions.passwordError({ passwordErr: regexPassword.test(event.target.value) ? "" : "password should be between 6-20 characters" }))
    this._state$.dispatch(loginActions.changePassword({ password: event.target.value }))
  }

  login = () => {
    event.preventDefault();
    console.log('email: ', this.email$.actionsObserver.value.email)
    this._http.post("http://localhost:51334/api/admins/Login", {
      Admin_Email: this.email$,
      Admin_Password: this.password$
    })
      .subscribe(res => { console.log(res) })
    console.log('get in')
  }
}
