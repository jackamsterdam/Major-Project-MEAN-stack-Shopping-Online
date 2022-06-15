import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  // async getAllCategories():Promise<CategoryModel[]> {
  //   const categories = await firstValueFrom(this.http.get<CategoryModel[]>(environment.categoriesUrl))
  //   return categories
  // }

  // async getProductsByCategory(categoryId: string):Promise<ProductModel[]> {
  //  const products = await firstValueFrom(this.http.get<ProductModel[]>(environment.productsByCategoryUrl + categoryId))
  //  return products 
  // }

  // async addproduct(product: ProductModel):Promise<ProductModel> {
  //   const addedProduct = await firstValueFrom(this.http.post<ProductModel>(environment.productsUrl, product))
  //   return addedProduct
  // }

  // async deleteProduct(_id: string):Promise<void> {
  //   await firstValueFrom(this.http.delete(environment.productsUrl + _id))
  // }
}
