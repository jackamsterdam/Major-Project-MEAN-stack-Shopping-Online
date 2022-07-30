import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { CategoryModel } from 'src/app/models/category.model';
import { ProductModel } from 'src/app/models/product.model';
import { UserModel } from 'src/app/models/user.model';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit, OnDestroy {
//!Regina =  this is משוכפל from regular home component do i need to get all products again here ??
  user: UserModel
  unsubscribe: Unsubscribe
  opened = false; 

  products: ProductModel[]
  categories: CategoryModel[]
  editedProduct: ProductModel;
  isAddAction: boolean;
  constructor(private productsService: ProductsService, private notify: NotifyService) { }

  async ngOnInit() {
    try {
      // this.unsubscribe = store.subscribe(async () => {
   
          // this.user = store.getState().authState.user

          //   if (this.user) {
              //now i have all th maarechet fulled with all that i need for the rest of the baby components
             this.products = await this.productsService.getAllProducts()
             this.categories =  await this.productsService.getAllCategories()  
          
            // }
          
        // })
    } catch (err: any) {
      this.notify.error(err)
    }
   

  }

  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }

  productToEdit(product: ProductModel) {
    this.isAddAction = false;
    this.editedProduct = null;
    this.editedProduct = product;
    this.opened = true
  }


}
