import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service'; 
import { ActivatedRoute, Router } from '@angular/router';
export class Model {
  constructor(
    public name: string,
    public bank: string,
    public date: string,  
    public bank_number: string
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
    const id = this.activeRouter.queryParams['_value'].id; 
    this.http.get<any>(environment.api + "payment/index?id="+ id, {
      headers: this.varHeaders,
    }).subscribe(
      data => {  
        console.log(data);   
        this.model['date']= data['now'];
        this.price = data['price']; 
        this.paymentDescription = data['description'];
      },
      error => {
        console.log(error);
      }, 
    );
  }

  onSubmit(){
    
  }
}
