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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pin: any = [];
  wallet: any = [];
  loading:boolean = true;
  user : any = [];
  detail : any = [];
  sponsor : any = [];
  reward :  any = [];
  commission : any = [];
  verified : string;
  model: any = new Model("", "", new Date(),"" );
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private modalService: NgbModal, 
  ) { }
 
  ngOnInit(): void { 
    this.getHttp(); 
  } 
  getHttp() {
    this.modalService.dismissAll();
    this.http.get<any>(environment.api + "dashboard/index", {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        this.pin = data['pin'];
        this.wallet = data['wallet'];
        this.user = data['user'];
        this.detail = data['detail'];
        this.sponsor =data['sponsor'];
        this.reward = data['reward'];
        this.commission = data['commission'];
        this.verified = data['verified'];
        this.configService.relogin(data);

        console.log(data);
      },
      error => {
        console.log(error);
      },

    );
  }
 
  open(content) {
    this.modalService.open(content);
  }
  topupObj : any;
  onUploadSubmit(){
    this.loading = true;
    const body = {
      data: this.model,
      topup : this.topupObj
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


}
