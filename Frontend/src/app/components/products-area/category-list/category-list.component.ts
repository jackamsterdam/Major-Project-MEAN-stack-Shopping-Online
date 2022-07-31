import { Unsubscribe } from 'redux';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';
import { ProductModel } from 'src/app/models/product.model';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';
import store, { storeAuth } from 'src/app/redux/store';

import { FormControl } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy {
categories: CategoryModel[]
products: ProductModel[]
unsubscribe: Unsubscribe
searchText = ''

constructor(private productsService: ProductsService, private notify: NotifyService) { }

@ViewChild(MatTabGroup) tabGroup: MatTabGroup;

async ngOnInit() {

  try {

    this.categories = await this.productsService.getAllCategories()  

     //no subscribe cause there will be no changes in categories.

       
    //  this.unsubscribe = storeAuth.subscribe(() => {
     this.unsubscribe = store.subscribe(() => {
      this.searchText =  store.getState().productsState.searchText;
      
      if (this.searchText !== '') {

        // select all category
         this.tabGroup.selectedIndex  = 0
      }
      

    })

  } catch (err: any) {
    this.notify.error(err)
  }
 
}

// async logChange(categoryId: any) {
//   try {
//     debugger
//     console.log(categoryId)
//     console.log(categoryId.tab.textLabel)
//     this.products = await this.productsService.getProductsByCategory(categoryId.tab.textLabel) 
//   } catch (err: any) {
//     this.notify.error(err)
//   }
// }

// async selectCategory(event: any) {
//   try {
//     // debugger
  
//    const ele =  event.target as HTMLDivElement

//    if (ele.id === 'all') {
//     this.productsService.setSelectedCategory('all') 
//    } else {
//      this.productsService.setSelectedCategory(ele.id) 
//    }
//   } catch (err: any) {
//     this.notify.error(err)
//   }
// }

async selectCategoryByIndex(index: number) {
  try {
    // debugger
  
   if (index === 0) {
    this.productsService.setSelectedCategory('all') 
   } else {
    //Instead of going to the backend I am more efficient displaying products based on category ID saved to redux and subscribed in the component
    this.productsService.setSelectedCategory(this.categories[index - 1]._id) 
  }
  } catch (err: any) {
    this.notify.error(err)
  }
}

test(event: any) {
}

ngOnDestroy(): void {
  if (this.unsubscribe) {
    this.unsubscribe()
  }
}
}
