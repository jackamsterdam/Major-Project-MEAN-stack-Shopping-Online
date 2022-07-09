import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartItemModel } from 'src/app/models/cart-item.model';
import { CartsService } from 'src/app/services/carts.service';
import { NotifyService } from 'src/app/services/notify.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidenav-details',
  templateUrl: './sidenav-details.component.html',
  styleUrls: ['./sidenav-details.component.scss']
})
export class SidenavDetailsComponent implements OnInit {


  @Input()
  fromShopPage: boolean
  
  @Input()
  item: CartItemModel
  
  productsImageUrl = environment.productsImageUrl
  
  constructor(public dialog: MatDialog, private cartsService: CartsService, private notify: NotifyService) { }
  
  //!I cant do this!!!  total = this.item.quantity * this.item.product.price   for individual items but i can ישירות in the html
  ngOnInit(): void {
  }

  @Output() 
  deleteItem = new EventEmitter<string[]>()

  deleteThisItem(_id: string, cartId: string) {

    this.deleteItem.emit([_id, cartId])
  }

}
