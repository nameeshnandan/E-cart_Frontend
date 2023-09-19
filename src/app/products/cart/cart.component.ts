import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';

import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  public payPalConfig?: IPayPalConfig;
  showSuccess:boolean=false;
  shoePaypalStatus:boolean=false;

  username:string='';
  email:string='';
  address:string='';
  houseNo:string='';
  landmark:string='';
  state:string='';
  phoneNo:string='';

  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  paymentstatus:boolean=false;
  offerclicked:boolean=false;
  discountclick:boolean=false;

  totalprice=0 //to hold price

  product:any={}

  cartcounts:string='';

  constructor(private api:ApiService, private checkFB:FormBuilder){}

ngOnInit(): void {

  this.initConfig();

  this.api.cartitemcount.subscribe((data:any)=>{
    console.log(data);
    this.cartcounts=data
  })

  this.api.getcart().subscribe((result:any)=>{
    this.api.cartCount()
    console.log(result);
    this.product=result

    this.getcartTotal() //call cart total function
    
  },
  (result:any)=>{
    console.log(result.error);
    
  })
}
deletecart(id:any){
  this.api.deleteCart(id).subscribe((result:any)=>{
    console.log(result);
    this.product=result;
    this.api.cartCount()
  },
  (result:any)=>{
    alert(result.error)
  }
  )
}

//get cart total
getcartTotal(){
  let total=0
  this.product.forEach((result:any)=>{
    total+=result.grandTotal
    this.totalprice=Math.ceil(total)
  })
}

//increment cart count
incrementCart(id:any){
  this.api.incrementCartCount(id).subscribe((result:any)=>{
    this.product=result
    this.getcartTotal()
  },
  (result:any)=>{
    alert(result.error)
  })
}
//increment cart count
decrementCart(id:any){
  this.api.decrementCartCount(id).subscribe((result:any)=>{
    this.product=result
    this.getcartTotal()
    this.api.cartCount()

  },
  (result:any)=>{
    alert(result.error)
  })
}

//form group creation
checkform=this.checkFB.group({
  //array creation
  name:['',[Validators.required,Validators.pattern('[a-zA-Z\\s]*')]],
  email:['',[Validators.required,Validators.pattern(this.emailPattern)]],
  address:['',[Validators.required,Validators.pattern('[a-zA-Z\\s]*')]],
  houseNo:['',[Validators.required,Validators.pattern('[0-9]*')]],
  landmark:['',[Validators.required,Validators.pattern('[a-zA-Z\\s]*')]],
  state:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
  phoneNo:['',[Validators.required,Validators.pattern('[0-9]*')]],
  
})

check(){
  if(this.checkform.valid){

    alert('check clicked ')
    this.username=this.checkform.value.name||''
    this.email=this.checkform.value.email||''
    this.address=this.checkform.value.address||''
    this.houseNo=this.checkform.value.houseNo||''
    this.landmark=this.checkform.value.landmark||''
    this.state=this.checkform.value.state||''
    this.phoneNo=this.checkform.value.phoneNo||''

    this.paymentstatus=true
  }
  else(
    alert('Invalid forms')
  )

}

offerClicked(){
  this.offerclicked=true
  this.discountclick=true
}

discount(value:any){
  this.totalprice=Math.ceil(this.totalprice*(100-value)/100)
  this.offerclicked=false
}

// paypal
private initConfig(): void {
  this.payPalConfig = {
  currency: 'EUR',
  clientId: 'sb',
  createOrderOnClient: (data) => <ICreateOrderRequest>{
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'EUR',
          value: '9.99',
          breakdown: {
            item_total: {
              currency_code: 'EUR',
              value: '9.99'
            }
          }
        },
        items: [
          {
            name: 'Enterprise Subscription',
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: 'EUR',
              value: '9.99',
            },
          }
        ]
      }
    ]
  },
  advanced: {
    commit: 'true'
  },
  style: {
    label: 'paypal',
    layout: 'vertical'
  },
  onApprove: (data, actions) => {
    console.log('onApprove - transaction was approved, but not authorized', data, actions);
    actions.order.get().then((details:any) => {
      console.log('onApprove - you can get full order details inside onApprove: ', details);
    });
  },
  onClientAuthorization: (data) => {
    console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
    this.showSuccess = true;
  },
  onCancel: (data, actions) => {
    console.log('OnCancel', data, actions);
  },
  onError: err => {
    console.log('OnError', err);
  },
  onClick: (data, actions) => {
    console.log('onClick', data, actions);
  },
};
}

paypalPay(){
  this.shoePaypalStatus=true;
}

modalClose(){
  this.checkform.reset()
  this.shoePaypalStatus=false
  this.showSuccess=false
  this.paymentstatus=false
  
}
}
