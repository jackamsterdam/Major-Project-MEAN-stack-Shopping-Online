import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';

@Component({
  selector: 'app-add-or-update-product',
  templateUrl: './add-or-update-product.component.html',
  styleUrls: ['./add-or-update-product.component.scss']
})
export class AddOrUpdateProductComponent implements OnInit {

  @Input('productToBeEdited') set productToBeEdited(product: ProductModel) {
    if (product) {
      this.product = product;
       this.isPanelOpned = true;
       this.isAddAction = false;
    }
  }

  product: ProductModel;
  public isPanelOpned = false;
  public isAddAction = true;

  constructor() { }

  ngOnInit(): void {
  }

  addProduct() {
    this.isPanelOpned = true;
    this.isAddAction = true;
  }

  closePanel() {
    this.isPanelOpned = false
  }
}
