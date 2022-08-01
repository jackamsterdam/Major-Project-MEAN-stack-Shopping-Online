import { ProductsService } from 'src/app/services/products.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Unsubscribe } from 'redux';
import { ProductModel } from 'src/app/models/product.model';
import store from 'src/app/redux/store';
import { NotifyService } from 'src/app/services/notify.service';
import { RoleEnum } from 'src/app/models/role.enum';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: ProductModel[]
  unsubscribe: Unsubscribe
  role: RoleEnum

  constructor(private productsService: ProductsService, private notify: NotifyService) { }

  async ngOnInit() {

    try {
      //Becauase it is a shared component
      this.role = store.getState().authState.user.role

      this.products = await this.productsService.getAllProducts()  //Since we usually get all the products in login this will go to service and service will get products stright from redux's store

      this.unsubscribe = store.subscribe(() => {
        const selectedCategoryId = store.getState().categoriesState.selectedCategory

        // Filter products by selected category
        if (selectedCategoryId != 'all') {
          this.products = store.getState().productsState.products.filter(p => p.categoryId === selectedCategoryId);
        } else {
          this.products = store.getState().productsState.products.filter(p => p.name.toLowerCase().startsWith(store.getState().productsState.searchText.toLowerCase()));
        }
      })
    } catch (err: any) {
      this.notify.error(err)
    }
  }

  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }

  // ---------------------------------------------this is for admin only: ----------------------------------------------

  @Output()
  public editProductEmit = new EventEmitter<ProductModel>();

  public editProduct(product: ProductModel) {
    this.editProductEmit.emit(product);
  }

  // ---------------------------------------------this is for user only: ----------------------------------------------

  @Output()
  public addProductEmit = new EventEmitter<ProductModel>();

  public addProduct(product: ProductModel) {
    this.addProductEmit.emit(product);
  }

}
