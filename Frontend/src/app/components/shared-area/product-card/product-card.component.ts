import { ProductsService } from 'src/app/services/products.service';
import { RoleEnum } from './../../../models/role.enum';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input()
  product: ProductModel

  @Input()
  role: RoleEnum

  userRole = RoleEnum.User
  adminRole = RoleEnum.Admin

  productsImageUrl = environment.productsImageUrl

  constructor(private productsService: ProductsService) { }

  // ---------------------------------------------this is for admin only: ----------------------------------------------
  @Output()
  public edit = new EventEmitter<ProductModel>();

  public editProduct(product: ProductModel) {
    this.productsService.isAddAction.emit(false);
      this.edit.emit(product);
  }

  // ---------------------------------------------this is for user only: ----------------------------------------------

  @Output()
  public add = new EventEmitter<ProductModel>();

  public addProduct(product: ProductModel) {
      this.add.emit(product);
  }

}

