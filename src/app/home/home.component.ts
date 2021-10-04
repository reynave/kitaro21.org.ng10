import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export class Model {
  constructor(
    public name: string,
    public bank: string,
    public date: Date,
    public bank_number: string
  ) { }
}

export class Card {
  constructor(
    public productId: string,
    public qty: number, 
  ) { }
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  total : number = 1;
  price : number= 0;
  card : any = new Card("",1);
  loading: boolean = true;
  user: any = [];
  detail: any = [];
  sponsor: any = [];
  reward: any = [];
  commission: any = [];
  verified: string;
  v2_user_product: any = [];
  product: string;
  model: any = new Model("", "", new Date(), "");
  cardNumber: string;
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.getHttp();
  }
  bankTransfer : string;
  productName : string;
  selectProduct : any = [];
  getHttp() {
    var card;
    this.modalService.dismissAll();
    this.http.get<any>(environment.api + "dashboard/index", {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        card = data['user']['cardNumber'];
        this.cardNumber = card[0] + card[1] + card[2] + card[3] + " " + card[4] + card[5] + card[6] + card[7] + " " + card[8] + card[9] + card[10] + card[11] + " " + card[12] + card[13] + card[14] + card[15]; 
        this.selectProduct = data['selectProduct'];
        this.user = data['user'];
        this.detail = data['detail'];
        this.bankTransfer = data['bankTransfer'];
        this.sponsor = data['sponsor'];
        this.reward = data['reward'];
        this.commission = data['commission'];
        this.verified = data['verified'];
        this.product = data['product'];
        this.configService.relogin(data);
        this.v2_user_product = data['v2_user_product'];
        console.log(data);
      },
      error => {
        console.log(error);
      },

    );
  }

  openXl(content) {
    this.modalService.open(content, { size:"lg"});
  }
  open(content) {
    this.modalService.open(content);
  }

  topupObj: any;
  onRenewal() {
    this.loading = true;
    const body = {
      data: this.model,
      topup: this.topupObj
    }
    console.log(body);
    this.http.post<any>(environment.api + "dashboard/renewal", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
        this.getHttp();
      },
      error => {
        console.log(error);
      },
    );
  }
  
  cartTotal :string;
  orderCode : string;
  onUploadPayment() {
    this.loading = true;
    const body = {
      model : {
        bank : this.model.bank,
        bank_account : this.model.name,
        bank_number : this.model.bank_number,
        date_payment : this.model.date, 
      },
      orderCode :  this.orderCode
    }
    console.log(body);
    this.http.post<any>(environment.api + "payment/onSubmit", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
        this.getHttp();
      },
      error => {
        console.log(error);
      },
    );
  }
 
  onSubmit(content,obj) {
    this.orderCode = obj.orderCode;
    this.cartTotal = obj.amount;
    this.open(content); 
  }








  onChangesPrice(){
    this.total = this.card.qty * this.price;
  }

  onCart(){
    this.loading = true;
    const body = {
      model: this.card, 
    }
    console.log(body);
    this.http.post<any>(environment.api + "dashboard/onCart", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
        this.getHttp();
      },
      error => {
        console.log(error);
      },
    );
  }
 
  onRemove(obj){
    this.http.post<any>(environment.api + "dashboard/onRemove", obj, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
        this.getHttp();
      },
      error => {
        console.log(error);
      },
    );
  } 

 
}
