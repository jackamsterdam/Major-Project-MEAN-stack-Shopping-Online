import { CartsService } from 'src/app/services/carts.service';
import { Component } from '@angular/core';
const pdfMake = require('pdfmake/build/pdfmake.js');
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Alignment } from 'pdfmake/interfaces'; //this line has to be here
import { OrderModel } from 'src/app/models/order.model';
import store from 'src/app/redux/store';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-pdf-receipt',
  templateUrl: './pdf-receipt.component.html',
  styleUrls: ['./pdf-receipt.component.scss']
})
export class PdfReceiptComponent {

  constructor(private cartsService: CartsService) { }

  async generatePDF() {
    let theLastOrder: OrderModel = store.getState().ordersState.theLastOrder

    const user = store.getState().authState.user;
    // Getting last orders cart items: 
    const cartItems = await this.cartsService.getAllItemsByCart(theLastOrder?.cartId)
    const totalAmount = this.cartsService.getTotalCartAmount();

    if (!theLastOrder) return;
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
                bold: true
              },
              { text: user.username },
              { text: user.street },
              { text: user.city }
            ],
            [
              {
                text: `Order Date: ${new Date(theLastOrder.createdAt).toLocaleDateString()}`,
                alignment: 'right'
              },
              {
                text: `Shipping Date: ${new Date(theLastOrder.shipDate).toLocaleDateString()}`,
                alignment: 'right'
              },
              {
                text: `Credit Card: ${theLastOrder.creditCard.toString().slice(-4).padStart(theLastOrder.creditCard.toString().length, '*')}`,
                alignment: 'right'
              },
              {
                text: 'Bill No :' + theLastOrder._id,
                alignment: 'right'
              }
            ]
          ]
        },
        {
          text: 'Shipping Details',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              {
                text: user.firstName + ' ' + user.lastName,
                bold: true
              },
              { text: theLastOrder.shipStreet },
              { text: theLastOrder.shipCity },
            ],
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
              [{ text: 'Product', bold: true, fillColor: 'beige' }, { text: 'Price', bold: true, fillColor: 'beige' }, { text: 'Quantity', bold: true, fillColor: 'beige' }, { text: 'Amount', bold: true, fillColor: 'beige' }],
              ...cartItems.map(c => ([c.product.name, '$' + c.product.price, c.quantity, '$' + (c.product.price * c.quantity).toFixed(2)])),
              [{ text: 'Total Amount', bold: true, fillColor: 'pink' }, { text: '', fillColor: 'pink' }, { text: '', fillColor: 'pink' }, { text: '$' + totalAmount.toFixed(2), bold: true, fillColor: 'pink' }]
            ]
          }
        },
        {
          text: 'Additional Details',
          style: 'sectionHeader'
        },
        {
          margin: [0, 0, 0, 15],
          ul: [
            { text: 'Linkedin', color: 'blue', link: 'https://www.linkedin.com/in/jack-amsterdam/' },

            { text: 'Github', color: 'blue', link: 'https://github.com/jackamsterdam' },

            { text: 'WakaTime', color: 'blue', link: 'https://wakatime.com/@jackamsterdam' },

            { text: 'NPM', color: 'blue', link: 'https://www.npmjs.com/~jackamsterdam' },

            { text: 'Docker Hub', color: 'blue', link: 'https://hub.docker.com/u/jackamsterdam' }
          ],
        },
        {
          columns: [
            [{ qr: `https://www.linkedin.com/in/jack-amsterdam/`, fit: '100' }],
            [{ qr: `https://github.com/jackamsterdam`, alignment: 'right', fit: '98' }],
          ]
        },
        {
          text: 'Terms and Conditions',
          style: 'sectionHeader'
        },
        {
          ul: [
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
          margin: [0, 15, 0, 15]
        }
      }
    };

    pdfMake.createPdf(docDefinition).download();
  }
}
