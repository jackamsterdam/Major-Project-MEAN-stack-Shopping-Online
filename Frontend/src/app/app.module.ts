import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './components/layout-area/header/header.component';
import { FooterComponent } from './components/layout-area/footer/footer.component';
import { MenuComponent } from './components/layout-area/menu/menu.component';
import { HomeComponent } from './components/home-area/home/home.component';
import { PageNotFoundComponent } from './components/layout-area/page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LogoComponent } from './components/layout-area/logo/logo.component';
import { JwtInterceptor } from './services/jwt.interceptor';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { AuthMenuComponent } from './components/auth-area/auth-menu/auth-menu.component';
import { ProductsListComponent } from './components/shared-area/products-list/products-list.component';
import { AboutComponent } from './components/home-area/about/about.component';
import { StoreInfoComponent } from './components/home-area/store-info/store-info.component';

import { ValidateEqualModule } from 'ng-validate-equal';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    HomeComponent,
    PageNotFoundComponent,
    LogoComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    AuthMenuComponent,
    ProductsListComponent,
    AboutComponent,
    StoreInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    ValidateEqualModule
  ],
  // Causes Angular to invoke that interceptor on each request:
  providers: [{
    useClass: JwtInterceptor,
    provide: HTTP_INTERCEPTORS,
    multi: true
  }],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
