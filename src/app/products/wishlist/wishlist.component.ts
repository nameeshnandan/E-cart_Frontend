import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{
  product:any=[]
  constructor(private api:ApiService){}
ngOnInit(): void {
  this.api.getwishlist().subscribe((result:any)=>{
    console.log(result);
    this.product=result
  },
  (result:any)=>{
    console.log(result.error);
    
  })


}
//delete wishlist product
deleteWishlist(id:any){
  this.api.deleteWishlists(id).subscribe((result:any)=>{
    console.log(result);
    this.product=result;
  })
}

addtocart(product:any){
  //add quentity to the cart
  Object.assign(product,{quantity:1})

  //api call to add quantity
  this.api.addtocart(product).subscribe((result:any)=>{
    this.api.cartCount()
    this.deleteWishlist(product.id)
    alert(result)
  },
  (result:any)=>{
    alert(result.error);
  })
}
}
