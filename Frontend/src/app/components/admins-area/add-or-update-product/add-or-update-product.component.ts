import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

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

  @Input('isAddActionInput') set isAddActionInput(isAdd: boolean) {
    // if (isAdd) {
    //    this.isAddAction = isAdd;  
    // }
   
  }



  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {

    this.productsService.isAddAction.subscribe((isOpen => {
      this.isAddAction = isOpen;
   }));
    //here
  }

  addProduct() {
    this.isAddAction = true; 
    this.product = null;
    this.productsService.isAddAction.emit(true);
  }
}
