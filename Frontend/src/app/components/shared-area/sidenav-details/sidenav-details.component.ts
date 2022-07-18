import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { Unsubscribe } from 'redux';
import { filter } from 'rxjs';
import { CartItemModel } from 'src/app/models/cart-item.model';
import store from 'src/app/redux/store';
import { CartsService } from 'src/app/services/carts.service';
import { NotifyService } from 'src/app/services/notify.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidenav-details',
  templateUrl: './sidenav-details.component.html',
  styleUrls: ['./sidenav-details.component.scss']
})
export class SidenavDetailsComponent implements OnInit, OnDestroy {

  unsubscribe: Unsubscribe
 
  public search: string = null;

  // public OnSearched(searchTerm: string) {
  //   this.Search = store.getState().productsState.searchText;
  // }
 





  @Input()
  fromShopPage: boolean
  
  @Input()
  item: CartItemModel
  
  productsImageUrl = environment.productsImageUrl
  
  constructor(public dialog: MatDialog, private cartsService: CartsService, private notify: NotifyService, public router: Router) {
    // router.events.subscribe((val) => console.log(val))
   }





  //!I cant do this!!!  total = this.item.quantity * this.item.product.price   for individual items but i can ישירות in the html
  ngOnInit(): void {
    this.unsubscribe = store.subscribe(() => {
      this.search = store.getState().productsState.searchText
    })

   

    // this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
    //   //Do something with the NavigationEnd event object.
    // });
 
  
  }

  @Output() 
  deleteItem = new EventEmitter<string[]>()

  deleteThisItem(_id: string, cartId: string) {

    this.deleteItem.emit([_id, cartId])
  }





  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }





}
