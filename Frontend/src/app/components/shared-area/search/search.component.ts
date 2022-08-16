import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from 'src/app/models/product.model';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {
  search: string = ''
  products: ProductModel[]

  constructor(private productsService: ProductsService, private notify: NotifyService, public router: Router) {
    //if navigating to different page then empty search box:
    router.events.subscribe(() => this.search = '')
    router.events.subscribe(() => this.productsService.setSearchText(''))
  }

  async ngOnInit() {

    try {
      //Calling productsSservice with getAllProducts is the same as getting all products from the store cause getAllProducts checks store anyways. But components should talk to service and service should talk to store and not component  directly to store.
      this.products = await this.productsService.getAllProducts()
    } catch (err: any) {
      this.notify.error(err)
    }
  }


  searchProduct(event: Event) {

    const inputElement = (event.target as HTMLInputElement).value;

    if (inputElement != '') {
      // clear the category
      this.productsService.setSelectedCategory('all')
    }
    this.productsService.setSearchText(inputElement)
  }

  clearSearchField() {
    this.search = '';
    this.productsService.setSearchText('')
  }

}
