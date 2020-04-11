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
import { ErrorInterceptor } from './helpers/error.interceptor';
import { AlertService } from './services/alert.service';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { fakeBackendProvider } from './helpers/fake-backend';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AddGirlComponent } from './directives/add-girl/add-girl.component';
import { ImageUploadComponent } from './directives/image-upload/image-upload.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    NavigationComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    AlertComponent,
    HomepageComponent,
    AddGirlComponent,
    ImageUploadComponent

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
    AuthenticationService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }





