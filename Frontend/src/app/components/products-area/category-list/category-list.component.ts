import { Unsubscribe } from 'redux';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';
import { ProductModel } from 'src/app/models/product.model';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';
import store from 'src/app/redux/store';
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

      this.unsubscribe = store.subscribe(() => {
        this.searchText = store.getState().productsState.searchText;

        if (this.searchText !== '') {
          // select "All" category
          this.tabGroup.selectedIndex = 0
        }
      })

    } catch (err: any) {
      this.notify.error(err)
      
    }
  
  }

  async selectCategoryByIndex(index: number) {
    try {
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

  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }
}
