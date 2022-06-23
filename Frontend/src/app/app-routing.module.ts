import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth-area/login/login.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { HomeComponent } from './components/home-area/home/home.component';
import { PageNotFoundComponent } from './components/layout-area/page-not-found/page-not-found.component';
import { ShoppingComponent } from './components/shopping-area/shopping/shopping.component';

const routes: Routes = [

  {path: 'register', component: RegisterComponent},
  // {path: 'login', component: LoginComponent}, //We dont need this casue its our home page
  {path: 'logout', component: LogoutComponent},

  //! add admin adn auth guards to the routes!!!!!!!!!
  //! { path: "products/new", component: AddProductComponent, canActivate: [AuthGuard, AdminGuard] },


  {path: 'home', component: HomeComponent},

  {path: 'shopping', component: ShoppingComponent},



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
