import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Unsubscribe } from 'redux';
import { CartItemModel } from 'src/app/models/cart-item.model';
import store from 'src/app/redux/store';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidenav-details',
  templateUrl: './sidenav-details.component.html',
  styleUrls: ['./sidenav-details.component.scss']
})
export class SidenavDetailsComponent implements OnInit, OnDestroy {

  unsubscribe: Unsubscribe
  public search: string = null;

  @Input()
  fromShopPage: boolean

  @Input()
  item: CartItemModel

  @Output()
  deleteItem = new EventEmitter<string[]>()

  productsImageUrl = environment.productsImageUrl

  constructor(public dialog: MatDialog, public router: Router) { }

  ngOnInit(): void {
    this.unsubscribe = store.subscribe(() => {
      this.search = store.getState().productsState.searchText
    })
  }

  deleteThisItem(_id: string, cartId: string) {
    this.deleteItem.emit([_id, cartId])
  }

  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }

}






























    // this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
    //   //Do something with the NavigationEnd event object.
    // });

