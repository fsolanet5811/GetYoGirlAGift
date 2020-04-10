import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './directives/about/about.component';
import { HomeComponent } from './directives//home/home.component';
import { HomepageComponent } from './directives//homepage/homepage.component';
import { LoginComponent } from './directives//login/login.component';
import { RegisterComponent } from './directives//register/register.component';

import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'About', component: AboutComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Register', component: RegisterComponent },
  { path: 'Home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'Homepage', component: HomepageComponent }
  
];

export const routing = RouterModule.forRoot(appRoutes);
