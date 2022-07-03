import { ProductsService } from 'src/app/services/products.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { ProductModel } from 'src/app/models/product.model';
import store from 'src/app/redux/store';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: ProductModel[]
  unsubscribe: Unsubscribe

  constructor(private productsService: ProductsService, private notify: NotifyService) { }

 
  async ngOnInit() {

    try {
      // debugger
      this.products = await this.productsService.getAllProducts()  //Since we usually get all the products in login this will go to service and service will get products stright from redux' store
  
      this.unsubscribe = store.subscribe(() => {
       const selectedCategoryId =  store.getState().categoriesState.selectedCategory
       // Filter products by selected category
       if (selectedCategoryId!='all') {
        this.products =store.getState().productsState.products.filter(p => p.categoryId === selectedCategoryId);
       } else {
         this.products =store.getState().productsState.products
       }
       

       })
    } catch (err: any) {
      this.notify.error(err)
    }
   
  }


  ngOnDestroy(): void {
    this.unsubscribe()
  }
}
