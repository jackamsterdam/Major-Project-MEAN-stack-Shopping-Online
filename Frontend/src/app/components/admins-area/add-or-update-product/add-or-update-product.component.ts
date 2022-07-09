import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';

@Component({
  selector: 'app-add-or-update-product',
  templateUrl: './add-or-update-product.component.html',
  styleUrls: ['./add-or-update-product.component.scss']
})
export class AddOrUpdateProductComponent implements OnInit {
  @Input()
  productToBeEdited: ProductModel

  public isButtonVisible = true;


  constructor() { }

  ngOnInit(): void {
  }

}
