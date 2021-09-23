import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service'; 
import { ActivatedRoute, Router } from '@angular/router';
export class Model {
  constructor(
    public bank: string,
    public bank_account: string,
    public bank_number: string, 
    public date_payment: string,  
  ) { }
}
@Component({
  selector: 'app-payment-confirm',
  templateUrl: './payment-confirm.component.html',
  styleUrls: ['./payment-confirm.component.css']
})
export class PaymentConfirmComponent implements OnInit {
 model: any = new Model("", "", "","" );
 paymentDescription : string;
 price:string;
 orderCode : string;
 payment : boolean = false;
  constructor(
    private http: HttpClient,
    private configService: ConfigService, 
    private router: Router,
    private activeRouter :ActivatedRoute
  ) { }

  varHeaders : any = new HttpHeaders({
    'Content-Type': 'application/json',
    'Key': this.configService.varKey, 
  });


  ngOnInit(): void {
    this.httpGet();
  }

  httpGet(){
    console.log(this.activeRouter);
    this.orderCode = this.activeRouter.snapshot.queryParams['orderCode']; 
    this.http.get<any>(environment.api + "payment/index?orderCode="+ this.orderCode, {
      headers: this.varHeaders,
    }).subscribe(
      data => {  
        console.log(data);   
        this.payment = data['payment'];
        this.model['date_payment']= data['now'];
        this.price = data['price']; 
        this.paymentDescription = data['description'];
      },
      error => {
        console.log(error);
      }, 
    );
  }
  note : string;
  onSubmit(){
    const body = {
      model : this.model,
      orderCode :  this.orderCode
    }
    this.http.post<any>(environment.api + "payment/onSubmit", body, {
      headers: this.varHeaders,
    }).subscribe(
      data => {  
        console.log(data);    
        if(data['error']==false){
          this.payment = true;
        
        }
        this.httpGet();
        this.note = data['note'];
      },
      error => {
        console.log(error);
      }, 
    );
  }

   
}
