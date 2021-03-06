import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';
import { ProductModel } from 'src/app/models/product.model';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
categories: CategoryModel[]
products: ProductModel[]

constructor(private productsService: ProductsService, private notify: NotifyService) { }


async ngOnInit() {

  try {

    this.categories = await this.productsService.getAllCategories()  

     //no subscribe cause there will be no changes in categories.

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

async selectCategory(event: any) {
  try {
    // debugger
  
   const ele =  event.target as HTMLDivElement

   if (ele.id === 'all') {
    this.productsService.setSelectedCategory('all') 
   } else {
     this.productsService.setSelectedCategory(ele.id) 
   }
  } catch (err: any) {
    this.notify.error(err)
  }
}


}
