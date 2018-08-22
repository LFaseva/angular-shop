import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {
  LoginFormComponent,
  SignupComponent,
  UserComponent
} from './components';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

const appRoutes: Routes = [
  {
    path: '',
    component: LoginFormComponent,
    data: { title: 'Login' }
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: { title: 'Sign Up' }
  },
  {
    path: 'user',
    component: UserComponent,
    data: { title: 'User' }
  },
  // {
  //   path: '',
  //   redirectTo: '/item',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  declarations: [
    LoginFormComponent,
    SignupComponent,
    UserComponent,
    LoginComponent
  ],
  exports: [
    LoginFormComponent,
    SignupComponent,
    UserComponent,
    LoginComponent,
    RouterModule
  ],
  bootstrap: [LoginComponent]
})

export class LoginModule { }
