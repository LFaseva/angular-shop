import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { RouterModule, Routes } from '@angular/router';
import {
  NavigationComponent,
  SliderComponent,
  SidebarComponent,
  MainComponent,
  HeaderComponent
} from './components';
import {  LoginModule } from '@client/login';

// const appRoutes: Routes = [
  // {
  //   path: 'item',
  //   component: ItemComponent,
  //   data: { title: 'Book List' }
  // },
  // {
  //   path: 'login-form',
  //   component: LoginFormComponent,
  //   data: { title: 'Login' }
  // },
  // {
  //   path: 'signup',
  //   component: SignupComponent,
  //   data: { title: 'Sign Up' }
  // },
  // {
  //   path: 'user',
  //   component: UserComponent,
  //   data: { title: 'User' }
  // },
  // {
  //   path: '',
  //   redirectTo: '/item',
  //   pathMatch: 'full'
  // }
// ];

  @NgModule({
  imports: [
    CommonModule,
    LoginModule,
    // RouterModule.forRoot(
    //   appRoutes,
    //   { enableTracing: true } // <-- debugging purposes only
    // )
  ],
  declarations: [
    HeaderComponent,
    NavigationComponent,
    SliderComponent,
    SidebarComponent,
    MainComponent,
  ],
  exports: [
    HeaderComponent,
    NavigationComponent,
    SliderComponent,
    SidebarComponent,
    MainComponent,
  ],
})
export class BaseLayoutModule { }
