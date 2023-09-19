import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './pipes/filter.pipe'
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { NgxPayPalModule } from 'ngx-paypal';


@NgModule({
  declarations: [
    ProductsComponent,
    AllProductsComponent,
    ViewProductComponent,
    CartComponent,
    WishlistComponent,
    AllProductsComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPayPalModule
  ]
})
export class ProductsModule { }
