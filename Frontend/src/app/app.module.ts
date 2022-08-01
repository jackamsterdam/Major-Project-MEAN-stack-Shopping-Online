import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './components/layout-area/header/header.component';
import { FooterComponent } from './components/layout-area/footer/footer.component';
import { HomeComponent } from './components/home-area/home/home.component';
import { PageNotFoundComponent } from './components/layout-area/page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LogoComponent } from './components/layout-area/logo/logo.component';
import { JwtInterceptor } from './services/jwt.interceptor';
import { LoginComponent } from './components/auth-area/login/login.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { AuthMenuComponent } from './components/auth-area/auth-menu/auth-menu.component';
import { AboutComponent } from './components/home-area/about/about.component';
import { ShoppingInfoComponent } from './components/home-area/shopping-info/shopping-info.component';
import { ValidateEqualModule } from 'ng-validate-equal';
import { ShoppingComponent } from './components/shopping-area/shopping/shopping.component';
import { CartListComponent } from './components/shopping-area/cart-list/cart-list.component';
import { CategoryListComponent } from './components/products-area/category-list/category-list.component';
import { SidenavDetailsComponent } from './components/shared-area/sidenav-details/sidenav-details.component';
import { OrderComponent } from './components/orders-area/order/order.component';
import { AddOrderComponent } from './components/orders-area/add-order/add-order.component';
import { ProductDialogComponent } from './components/products-area/product-dialog/product-dialog.component';
import { OrderSuccessDialogComponent } from './components/orders-area/order-success-dialog/order-success-dialog.component';
import { ConfirmDeleteDialogComponent } from './components/shopping-area/confirm-delete-dialog/confirm-delete-dialog.component';
import { AddProductComponent } from './components/admins-area/add-product/add-product.component';
import { UpdateProductComponent } from './components/admins-area/update-product/update-product.component';
import { AdminHomeComponent } from './components/admins-area/admin-home/admin-home.component';
import { ProductCardComponent } from './components/shared-area/product-card/product-card.component';
import { ProductListComponent } from './components/shared-area/product-list/product-list.component';
import { AddOrUpdateProductComponent } from './components/admins-area/add-or-update-product/add-or-update-product.component';
import { SearchComponent } from './components/shared-area/search/search.component';
import { HighlightSearchPipe } from './pipes/highlight-search.pipe';
import { RegisterStepOneComponent } from './components/auth-area/register-step-one/register-step-one.component';
import { RegisterStepTwoComponent } from './components/auth-area/register-step-two/register-step-two.component';
import { RegisterBothStepsComponent } from './components/auth-area/register-both-steps/register-both-steps.component';
import { PdfReceiptComponent } from './components/orders-area/pdf-receipt/pdf-receipt.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PageNotFoundComponent,
    LogoComponent,
    LoginComponent,
    LogoutComponent,
    AuthMenuComponent,
    AboutComponent,
    ShoppingInfoComponent,
    ShoppingComponent,
    CartListComponent,
    ProductCardComponent,
    ProductListComponent,
    CategoryListComponent,
    SidenavDetailsComponent,
    OrderComponent,
    AddOrderComponent,
    ProductDialogComponent,
    OrderSuccessDialogComponent,
    ConfirmDeleteDialogComponent,
    AddProductComponent,
    UpdateProductComponent,
    AdminHomeComponent,
    AddOrUpdateProductComponent,
    SearchComponent,
    HighlightSearchPipe,
    RegisterStepOneComponent,
    RegisterStepTwoComponent,
    RegisterBothStepsComponent,
    PdfReceiptComponent,
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
