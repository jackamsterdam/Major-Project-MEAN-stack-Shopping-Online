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
import { AboutComponent } from './components/home-area/about/about.component';
import { ShoppingInfoComponent } from './components/home-area/shopping-info/shopping-info.component';

import { ValidateEqualModule } from 'ng-validate-equal';
import { ShoppingComponent } from './components/shopping-area/shopping/shopping.component';
import { CartListComponent } from './components/shared-area/cart-list/cart-list.component';
import { AutoFocusDirective } from './directives/auto-focus.directive';
import { ProductCardComponent } from './components/products-area/product-card/product-card.component';
import { ProductListComponent } from './components/products-area/product-list/product-list.component';
import { CategoryListComponent } from './components/products-area/category-list/category-list.component';
import { SidenavDetailsComponent } from './components/shared-area/sidenav-details/sidenav-details.component';
import { OrderComponent } from './components/orders-area/order/order.component';

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
    AboutComponent,
    ShoppingInfoComponent,
    ShoppingComponent,
    CartListComponent,
    AutoFocusDirective,
    ProductCardComponent,
    ProductListComponent,
    CategoryListComponent,
    SidenavDetailsComponent,
    OrderComponent,
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
