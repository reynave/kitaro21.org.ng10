import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SignaturePad } from 'ngx-signaturepad/signature-pad';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Md5 } from "md5-typescript";

export class Model {
  constructor(
    public name: string, 
    public email: string, 
    public password : string,
    public pass2 : string,
    public qty : number,
    public productId : string, 
    public code : string,
    public phone : string,
    public birthdate : string,
    
  ) { }
}

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css']
})
export class MembershipComponent implements OnInit {
  productName : string;
  model : any = new Model("","","","",1,"","62","","1970-01-01") ;
  loading : boolean = false;
  sign : boolean = true;
  ref : string;
  error : boolean = true; 
  referall : any= [];
  refCode : string;
  asFinish : number = 0;
  noteEmail : string;
  check :boolean = false;
  node : string;
  code : string;
  product : any = [];
  total : number = 0;
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private modalService: NgbModal, 
    private router: Router,
    private activeRouter :ActivatedRoute
  ) { }

  varHeaders : any = new HttpHeaders({
    'Content-Type': 'application/json',
    'Key': this.configService.varKey, 
  });


  ngOnInit(): void {
    if (this.configService.token()) {
      this.router.navigate(['home']);
    }else{
     
      if( this.activeRouter.queryParams['_value'].ref ){
        this.ref = this.activeRouter.queryParams['_value'].ref;
        this.httpGet();
        this.asFinish = 0;
      }else if(this.activeRouter.queryParams['_value'].id ){
        this.asFinish = 1;
      }else{
        console.log("Please Add Referall Code");
        this.asFinish = 4;
      }
      
      
    }
   
  }

  httpGet(){ 
    this.http.get<any>(environment.api + "register/index?ref="+ this.ref, {
      headers: this.varHeaders,
    }).subscribe(
      data => {  
        console.log(data);  
        this.product = data['product'];
        this.error = data['error'];
        this.referall = data;
      },
      error => {
        console.log(error);
      }, 
    );
  }


  onCheckEmail(){
    this.noteEmail = "";
    this.check = true;
    const body = {
      email: this.model.email,  
    }  
    this.http.post<any>(environment.api + "register/onCheckEmail", body, {
      headers: this.varHeaders,
    }).subscribe(
      data => { 
        this.noteEmail = data['note'];
        console.log(data);  
      },
      error => {
        console.log(error);
      }, 
    );
  }

  onSubmit(){
    this.node = "";
    this.loading = true;
    const body = {
      model     : this.model, 
      referall  : this.referall,
      password : Md5.init(this.model.password),
    //  signature : this.signaturePad.toDataURL()
    }  
    console.log(body);
    this.model.password = "RESET";
    this.http.post<any>(environment.api + "register/onSubmit", body, {
      headers: this.varHeaders,
    }).subscribe(
      data => { 
        if(data['error']==false) {
          this.asFinish = 1;
          this.router.navigate(['membership'], { queryParams: {id: data['id'], error: data['error']}})
        }else{
          this.node = data['note'];
        }
        console.log(data);  
      },
      error => {
        console.log(error);
      }, 
    );

  }

  onRefCode(){ 
    this.http.get<any>(environment.api + "register/index?ref="+ this.refCode, {
      headers: this.varHeaders,
    }).subscribe(
      data => {  
        console.log(data);
        if(data['error'] == false){
          this.router.navigate(['membership'], { queryParams: {ref: this.refCode} });
          this.ref =  this.refCode;
          this.httpGet();
          this.asFinish = 0;
        }else{
          this.node = "Reference Link not found!";
        }
        
      },
      error => {
        console.log(error);
      }, 
    );
   
  } 

  onConfirmCode(){
    this.node = "";
    this.loading = true;
    const body = {  
      code : this.code, 
      id : this.activeRouter.queryParams['_value'].id,
    }    
    this.http.post<any>(environment.api + "register/onConfirmCode", body, {
      headers: this.varHeaders,
    }).subscribe(
      data => { 
        if(data['error']==false) {
          this.router.navigate(['login']);
       
        } 
        this.node = data['note'];
        console.log(data);  
      },
      error => {
        console.log(error);
      }, 
    );
  }
}
