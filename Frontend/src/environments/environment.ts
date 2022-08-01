// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // auth: 
  emailAndSSNUniqueUrl: 'http://localhost:3001/api/auth/ssn-email-unique/',
  registerUrl: 'http://localhost:3001/api/auth/register/',
  loginUrl: 'http://localhost:3001/api/auth/login/',

  // categories: 
  categoriesUrl: 'http://localhost:3001/api/categories/',

  // products: 
  productsUrl: 'http://localhost:3001/api/products/',
  productsImageUrl: 'http://localhost:3001/shopping/images/',
  productsCountUrl: 'http://localhost:3001/api/products-count/',
 
  //carts
  cartByUserUrl: 'http://localhost:3001/api/cart-by-user/',  //to display when user's cart was createdAt 

  // cart items 
  cartItemsUrl: 'http://localhost:3001/api/items/',
  cartItemsByCartUrl: 'http://localhost:3001/api/items-by-cart/',  //to display all items in user's current cart

  //  orders: 
  ordersUrl: 'http://localhost:3001/api/orders/',
  ordersCountUrl:'http://localhost:3001/api/orders-count/',

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
