import { RoleEnum } from './../../../models/role.enum';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog'
import { CartsService } from 'src/app/services/carts.service';
import { NotifyService } from 'src/app/services/notify.service';
import store from 'src/app/redux/store';
import { CartItemModel } from 'src/app/models/cart-item.model';
import { ProductDialogComponent } from '../../products-area/product-dialog/product-dialog.component';
//!make a colorfuel around the box after user buys something 
//! maybe populate the quantity beforehand as bonus 
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  constructor() { }

  cartItem: CartItemModel

  @Input()
  product: ProductModel

  // @Input() role: string;

  @Input()
  role: RoleEnum

  userRole = RoleEnum.User
  adminRole = RoleEnum.Admin

  productsImageUrl = environment.productsImageUrl

  ngOnInit(): void {
    // console.log('this.product',this.product)
    console.log('cartItem', this.cartItem)
    // store.getState().cartsState.cartItems
    console.log(" store.getState().cartsState.currentcart",  store.getState().cartsState.currentCart);
    console.log(" store.getState().cartsState.cartitems",  store.getState().cartsState.cartItems);
  }

  // ---------------------------------------------this is for admin only: ----------------------------------------------
  @Output()
  public edit = new EventEmitter<ProductModel>();

  public editProduct(product: ProductModel) {
      this.edit.emit(product);
  }

//user:
  @Output()
  public add = new EventEmitter<ProductModel>();

  public addProduct(product: ProductModel) {
      this.add.emit(product);
  }





  // ---------------------------------------------this is for user only: ----------------------------------------------
  //!i need the product id i need cartid if exists i need total and quantity so far I am getting into the result the quantity
  // async openDialog() {
  //   let dialogRef = this.dialog.open(ProductDialogComponent)


  //   //An action to do when closing dialog (like updating the cart!)
  //   //!are we allowed to put try catch and async in a observable???
  //   dialogRef.afterClosed().subscribe(async (quantity) => {

  //     if (!quantity) return
  //     try {

  //       console.log('this.product', this.product)
  //       console.log('this.product.id which is productID going to be ', this.product._id)
  //       // console.log('cartid from store', store.getState().cartsState.cartId)

  //       //!problem if i dont add total then total will disapear

  //       // const itemToBeAddedToCart = new CartItemModel({quantity: result, productId: this.product._id, cartId:  store.getState().cartsState.cartId })
  //       //  console.log(result * this.product.price) 
  //       const total = quantity * this.product.price


  //       //! is this ok to do cause i needed all these details but jus tthe qunatity fromt he dialog 
  //       //object oriented thinking: 
  //       const itemToBeAddedToCart = new CartItemModel(quantity, this.product._id, store.getState().cartsState.currentCart?._id, total)
  //       const addedCartItem = await this.cartsService.addItem(itemToBeAddedToCart, store.getState().authState.user._id)
  //       this.notify.success('Item has been added to cart')

  //       const cart = await this.cartsService.getCartByUser(store.getState().authState.user._id)
  //       //this updates the store fter you add with the new updated item 
  //       await this.cartsService.getAllItemsByCart(cart?._id)
  //       // and have the dialog box close after ! 
  //     } catch (err: any) {
  //       this.notify.error(err)
  //     }







  //     // console.log(`Dialog result: ${result}`)
  //     // //!put here הוספה to cart!!

  //     // if (result === 'true') {
  //     //   console.log('yes yes correct!! log out if true or do wsomething ! only when you close the dialog  ')
  //     // }  
  //   })
  // }
}
