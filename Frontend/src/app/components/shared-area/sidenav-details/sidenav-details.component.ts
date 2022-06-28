import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItemModel } from 'src/app/models/cart-item.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidenav-details',
  templateUrl: './sidenav-details.component.html',
  styleUrls: ['./sidenav-details.component.scss']
})
export class SidenavDetailsComponent implements OnInit {

  
  @Input()
  item: CartItemModel
  
  productsImageUrl = environment.productsImageUrl
  
  constructor() { }
  
  //!I cant do this!!!  total = this.item.quantity * this.item.product.price   for individual items but i can ישירות in the html
  ngOnInit(): void {
  }

  @Output() 
  deleteItem = new EventEmitter<string[]>()

  deleteThisItem(_id: string, cartId: string) {

    this.deleteItem.emit([_id, cartId])
  }

}
