import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit{
  constructor(private viewActivatedRoute:ActivatedRoute, private api:ApiService){}
  //ActivatedRoute is to get path parameter from route

  productId:any;
  product:any={}

    ngOnInit(): void {
      this.viewActivatedRoute.params.subscribe((data:any)=>{
        console.log(data);
        console.log(data.id);
        this.productId=data.id
        //view particular product details
        this.api.viewProduct(this.productId).subscribe((result:any)=>{
          console.log(result);
          this.product=result
        })
        
      })
    }
    addToWishlist(){
      const {id,title,price,image}=this.product   //destructuring
      this.api.addtowishlist(id,title,price,image).subscribe((result:any)=>{
        alert(result)
      },
      (result:any)=>{
        alert(result.error);
      })
    }

    //add to cart
    addToCart(product:any){
      console.log(product);
        Object.assign(product,{quantity:1})
      this.api.addtocart(product).subscribe((result:any)=>{
        this.api.cartCount()
        alert(result)
      },
      (result:any)=>{
        alert(result.error)
      })
    }
}
