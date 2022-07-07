import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './components/admins-area/admin-home/admin-home.component';
import { UpdateProductComponent } from './components/admins-area/update-product/update-product.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { HomeComponent } from './components/home-area/home/home.component';
import { PageNotFoundComponent } from './components/layout-area/page-not-found/page-not-found.component';
import { OrderComponent } from './components/orders-area/order/order.component';
import { ShoppingComponent } from './components/shopping-area/shopping/shopping.component';
import { AdminGuard } from './services/admin.guard';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [

  {path: 'register', component: RegisterComponent},
  // {path: 'login', component: LoginComponent}, //We dont need this casue its our home page
  {path: 'logout', component: LogoutComponent},

  //! add admin adn auth guards to the routes!!!!!!!!!
  //! { path: "products/new", component: AddProductComponent, canActivate: [AuthGuard, AdminGuard] },


  {path: 'home', component: HomeComponent},

  {path: 'shopping', component: ShoppingComponent, canActivate: [AuthGuard]},

  {path: 'admin-home', component: AdminHomeComponent, canActivate: [AdminGuard]},
  {path: 'admin/edit/:id', component: UpdateProductComponent, canActivate: [AdminGuard]},
  //! if you are not admin and go back to home you wont see the right hand side notification !! 

  {path: 'order', component: OrderComponent, canActivate: [AuthGuard]},



  // {path: 'product-list', component: ProductListComponent},
  // {path: 'add-product', component: AddProductComponent},
  
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
