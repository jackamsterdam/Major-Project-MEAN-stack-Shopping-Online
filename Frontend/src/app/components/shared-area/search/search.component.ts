import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from 'src/app/models/product.model';
import store from 'src/app/redux/store';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
search: string =''
products: ProductModel[]
  constructor(private productsService: ProductsService, private notify: NotifyService, private router: Router) {
    //if navigating to different page then empty search box:
     router.events.subscribe(() => this.search = '')
     router.events.subscribe(() =>  this.productsService.setSearchText(''))
    //!  router.events.subscribe(() => this.productsService.emptySearchText())  //!EMPTY serch text from store also ????/  above line works delete this! 
   }
// you can delete things thawt are highlighted here!! 
  async ngOnInit() {
    //btw calling productsSservice with getAllProducts is the same as getting all products from the store cause getAllProducts goes to store anyways
    this.products = store.getState().productsState.products
    //!so reg i technically got all the products already  but im getting them again casue maybe he didnt start on first page. right?
    try {
      //  דווקא כן יש צורך לא מראה לי משום מה למרות שאני כן מקבל את כל המוצרים למטה - אין צטורך!! אני מציג את החיפוש רק בעמוד של הפרודקס וכבר יש לי את כל המוצרים !! 
    this.products = await this.productsService.getAllProducts() 
    } catch (err: any) {
      this.notify.error(err)
    }
    console.log(" this.products",  this.products);
  }


  searchProduct(event: Event) {
    console.log("event", event);
    const keyBoardEvent = (event as KeyboardEvent);

    const inputElement = (event.target as HTMLInputElement).value;
    // if (keyBoardEvent.key === 'Backspace' || keyBoardEvent.key === 'Delete') return

    // if(this.router.url === '/shopping' ) {
    
    if (inputElement != '') {
    // clear the category
    this.productsService.setSelectedCategory('all') 
    }


    
  // }
  //!Do i really need this????
  // if(this.router.url === '/order') {
    //update the searched text
  // }    
  //update the searched text

    this.productsService.setSearchText(inputElement) 


//     if (inputElement === '') {
//       this.products = store.getState().productsState.products
//       console.log('empty', this.products)
//   } else {
//     const filteredResult = store.getState().productsState.products.filter(p => p.name.toLowerCase().startsWith(inputElement.toLowerCase()))
//     this.products = filteredResult
//     console.log('after filter', this.products)
// }
    
  }


    
  clearSearchField(){
     this.search = '';
     this.productsService.setSearchText('') 
   }

}
