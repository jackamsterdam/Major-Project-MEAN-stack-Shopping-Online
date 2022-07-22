import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';

@Component({
  selector: 'app-add-or-update-product',
  templateUrl: './add-or-update-product.component.html',
  styleUrls: ['./add-or-update-product.component.scss']
})
export class AddOrUpdateProductComponent implements OnInit {
  // public isButtonVisible = true;
    product: ProductModel;
  // public isPanelOpned = false;
  isAddAction = true;
  editWasClicked = false
  // hideEditPanel = true

  // displayEditAgain: string

  @Input('productToBeEdited') set productToBeEdited(product: ProductModel) {
    if (product) {
      // this.hideEditPanel = false
      this.product = product;
      //  this.isPanelOpned = true;
       this.isAddAction = false;   //now im using this to hide or show add.

       this.editWasClicked = true
      //  this.displayEditAgain = 'hideEditPanel'
    }
  }



  constructor() { }

  ngOnInit(): void {
  }

  // addProduct() {
  //   // this.isPanelOpned = true;
  //   this.isAddAction = true;
  // }

  // closePanel() {
  //   this.isPanelOpned = false
  // }

  // reOpenAdd() {
  //   debugger
  //   this.isAddAction === true
  // }
}
