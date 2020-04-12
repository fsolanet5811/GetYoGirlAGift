import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './directives/about/about.component';
import { NavigationComponent } from './directives/navigation/navigation.component';
import { LoginComponent } from './directives/login/login.component';
import { RegisterComponent } from './directives/register/register.component';
import { AlertComponent } from './directives/alert/alert.component';
import { HomeComponent } from './directives//home/home.component';
import { HomepageComponent } from './directives//homepage/homepage.component';
import { AuthGuard } from './guards/auth.guard';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { AlertService } from './services/alert.service';
import { UserService } from './services/user.service';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    NavigationComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    AlertComponent,
    HomepageComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    routing
  ],
  providers: [
    AuthGuard,
    AlertService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }





