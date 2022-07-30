import { CartsService } from 'src/app/services/carts.service';
import { Component, OnInit } from '@angular/core';

// import pdfMake from "pdfmake/build/pdfmake";  
// import pdfFonts from "pdfmake/build/vfs_fonts";  
// pdfMake.vfs = pdfFonts.pdfMake.vfs;
const pdfMake = require('pdfmake/build/pdfmake.js');
// import * as pdfMake from "pdfmake/build/pdfmake"
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Alignment } from 'pdfmake/interfaces';
import { CartItemModel } from 'src/app/models/cart-item.model';
import { OrderModel } from 'src/app/models/order.model';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;


// class Product{
//   name: string;
//   price: number;
//   qty: number;
// }
// class Invoice{
//   customerName: string;
//   address: string;
//   contactNo: number;
//   email: string;
  
//   products: Product[] = [];
//   additionalDetails: string;

//   constructor(){
//     // Initially one empty product row we will show 
//     this.products.push(new Product());
//   }
// }

@Component({
  selector: 'app-pdf-receipt',
  templateUrl: './pdf-receipt.component.html',
  styleUrls: ['./pdf-receipt.component.scss']
})
export class PdfReceiptComponent implements OnInit {
 // runningNumber: any = 1 //!- to have an order count  you need type any or error!
  // cartItems: CartItemModel[] 
  // user: UserModel
 // totalAmount: number = 0;
  //orders: OrderModel[]
  //sortedOrders: OrderModel[];
  constructor(private cartsService: CartsService) {}

  async ngOnInit() {
    // this.user = store.getState().authState.user
    // const cart = await this.cartsService.getCartByUser(this.user._id)
    // this.cartItems =  await this.cartsService.getAllItemsByCart(cart?._id)

    // // this.cartItems = store.getState().cartsState.cartItems
    // // console.log("this.cartItems", this.cartItems);
   
    // this.totalAmount = this.cartsService.getTotalCartAmount();
    // console.log(" this.totalAmount",  this.totalAmount);
    // this.orders = store.getState().ordersState.orders
    // console.log("this.orders", this.orders);

    //!how to sort with 2 parameters user and recent order?
      // let theLastUserOrder: OrderModel;
      // let orderDate: number;
      // let theLastDate: number;
      // this.orders.forEach((order) => {
      //   if (order.userId === this.user._id) {
      //     // check if this is the last order
      //     if (!theLastUserOrder) {
      //       debugger
      //       theLastUserOrder = order;
      //       orderDate = new Date( order.createdAt).getMilliseconds();
      //       theLastDate = new Date( theLastUserOrder.createdAt).getMilliseconds()
      //     } else if( orderDate > theLastDate){
      //       theLastUserOrder = order;
      //     }
      //   }
      // })
      // console.log(theLastUserOrder._id + '' +theLastUserOrder.createdAt)
      // debugger
      //  this.sortedOrders =  currentUserOrders.sort((a, b) => {
      //   debugger
      //   return a.createdAt - b.createdAt;
      // })
  }

  // generatePDF() {  

    // generatePDF(action = 'open') {
    //   let docDefinition = {
    //     content: [
    //       {
    //         text: 'ELECTRONIC SHOP',
    //         fontSize: 16,
    //         alignment: 'center',
    //         color: '#047886'
    //       },
    //       {
    //         text: 'INVOICE',
    //         fontSize: 20,
    //         bold: true,
    //         alignment: 'center',
    //         decoration: 'underline',
    //         color: 'skyblue'
    //       },
    //       {
    //         text: 'Customer Details',
    //         style: 'sectionHeader'
    //       },]





    // let docDefinition = {  
    //   header: 'C#Corner PDF Header',  
    //   content: [  
    //     // Previous configuration  
    //     {  
    //         // text: 'Customer Details',  
    //         // style: 'sectionHeader',
    //         // ul: [  
    //         //   'Order can be return in max 10 days.',  
    //         //   'Warrenty of the product will be subject to the manufacturer terms and conditions.',  
    //         //   'This is system generated invoice.',  
              
    //         // ] ,
    //         content: [
    //           {
    //             ul: [  
    //               this.cartItems.map(item => item.product.name),
    //               'Order can be return in max 10 days.',  
    //               'Warrenty of the product will be subject to the manufacturer terms and conditions.',  
    //               'This is system generated invoice.',  
                  
    //             ] ,
    //             bold: true,
    //             fontSize: 1000,
    //             alignment: 'center' as Alignment,
    //             margin: [0, 0, 0, 20]
    //           },
            
            
            
    //         ]
    //     } ]


  //       {  
  //         table: {  
  //             headerRows: 1,  
  //             widths: ['*', 'auto', 'auto', 'auto'],  
  //             body: [  
  //                 ['Product', 'Price', 'Quantity', 'Amount'],  
  //                 ...this.invoice.cart.map(p => ([p.name, p.price, p.qty, (p.price * p.qty).toFixed(2)])),  
  //                 [{ text: 'Total Amount', colSpan: 3 }, {}, {}, this.invoice.products.reduce((sum, p) => sum + (p.qty * p.price), 0).toFixed(2)]  
  //             ]  
  //         }  
  //     }
      
  //   ],  

  // }
   
//   pdfMake.createPdf(docDefinition).open();  
// }  
// invoice = new Invoice(); 
  
// generatePDF(action = 'open') {
async generatePDF() {
let theLastOrder: OrderModel = store.getState().ordersState.theLastOrder

    const user = store.getState().authState.user;
    // const cart = await this.cartsService.getCartByUser(user._id)
    const cartItems =  await this.cartsService.getAllItemsByCart(theLastOrder?.cartId)

debugger
    // this.cartItems = store.getState().cartsState.cartItems
    // console.log("this.cartItems", this.cartItems);
   
    const totalAmount = this.cartsService.getTotalCartAmount();

if (!theLastOrder) return;
  // this.runningNumber++;
  let docDefinition = {
    content: [
      {
        text: "Jack Amsterdam's Virtual Supermarket",
        fontSize: 16,
        alignment: 'center',
        color: '#047886'
      },
      {
        text: 'INVOICE',
        fontSize: 20,
        bold: true,
        alignment: 'center',
        decoration: 'underline',
        color: 'skyblue'
      },
      {
        text: 'Customer Details',
        style: 'sectionHeader'
      },
      {
        columns: [
          [
            {
              text: user.firstName + ' ' + user.lastName,
              // text: this.invoice.customerName,
              bold:true
            },
            { text: user.username},
            { text: user.street },
            { text: user.city}
          ],
          [
            {
              text: `Date: ${new Date().toLocaleDateString()}`,
              alignment: 'right'
            },
            {
              text: `Order Date: ${new Date(theLastOrder.createdAt).toLocaleDateString()}`,
              alignment: 'right'
            },
            { 
              // text: `Bill No : ${((Math.random() *1000).toFixed(0))}`,
              //!Will this actually work if number is linke global and it will go up each time??
              text: 'Bill No :' + theLastOrder._id,
              alignment: 'right'
            }
          ]
        ]
      },
      {
        text: 'Order Details',
        style: 'sectionHeader'
      },
      {
        table: {
          headerRows: 1,
          widths: ['*', 'auto', 'auto', 'auto'],
          body: [
            [{ text: 'Product', bold: true, fillColor: 'beige'}, { text: 'Price', bold: true, fillColor: 'beige'}, { text: 'Quantity', bold: true, fillColor: 'beige'}, { text: 'Amount', bold: true, fillColor: 'beige'}],
            ...cartItems.map(c => ([c.product.name, '$' + c.product.price,c.quantity, '$' + (c.product.price*c.quantity).toFixed(2)])),
            // [{text: 'Total Amount', colSpan: 3}, {}, {}, this.cartItems.reduce((sum, p)=> sum + (p.quantity * p.quantity), 0).toFixed(2)]
            [{ text: 'Total Amount', bold: true, fillColor: 'pink' },{text: '', fillColor: 'pink'},{text: '', fillColor: 'pink'}, {text: '$' + totalAmount, bold: true, fillColor: 'pink'}],  //!how to show this??
            // [this.totalAmount,this.totalAmount,this.totalAmount,this.totalAmount ],  //!how to show this??
          ]
        }
      },
      {
        text: 'Additional Details',
        style: 'sectionHeader'
      },
      // {
      //     text: this.invoice.additionalDetails,
      //     margin: [0, 0 ,0, 15]          
      // },
      {
        margin: [0, 0 ,0, 15] ,
        ul: [
          { text: 'Linkedin', color: 'blue', link: 'https://www.linkedin.com/in/jack-amsterdam/' },

          { text: 'Github', color: 'blue', link: 'https://github.com/jackamsterdam' },

          { text: 'WakaTime', color: 'blue', link: 'https://wakatime.com/@jackamsterdam' },

          { text: 'NPM', color: 'blue', link: 'https://www.npmjs.com/~jackamsterdam' },

          { text: 'Docker Hub', color: 'blue', link: 'https://hub.docker.com/u/jackamsterdam' },


          // 'www.linkedin.com/in/jack-amsterdam/',

          // 'https://github.com/jackamsterdam',

          // 'https://wakatime.com/@jackamsterdam',

          // 'https://www.npmjs.com/~jackamsterdam',
          
          // 'https://hub.docker.com/u/jackamsterdam',



          ],
        
      },
      // {
      //   text: '',
      //   style: 'sectionHeader'
      // },
      {
        columns: [
          [{ qr: `https://www.linkedin.com/in/jack-amsterdam/`, fit: '100' }],
          [{ qr: `https://github.com/jackamsterdam`,  alignment: 'right', fit: '98' }],
          // [{ text: 'Signature', alignment: 'right', italics: true}],
        ]
      },
      {
        text: 'Terms and Conditions',
        style: 'sectionHeader'
      },
      {
          ul: [
            // 'Order can be return in max 10 days.',
            'All orders are final.',
            "Warranty of any product will be subject to the manufacturer's terms and conditions.",
            'This is a system generated invoice.',
          ],
      }
    
    ],
    styles: {
      sectionHeader: {
        bold: true,
        decoration: 'underline',
        fontSize: 14,
        margin: [0, 15,0, 15]          
      }
    }
  };

  // if(action==='download'){
  //   pdfMake.createPdf(docDefinition).download();
  // }else if(action === 'print'){
  //   pdfMake.createPdf(docDefinition).print();      
  // }else{
    pdfMake.createPdf(docDefinition).open();      //!change to download 
  // }

}

// addProduct(){
//   this.invoice.products.push(new Product());
// }



}
