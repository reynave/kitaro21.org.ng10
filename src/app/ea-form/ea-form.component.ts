import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SignaturePad } from 'ngx-signaturepad/signature-pad';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

export class Model {
  constructor(
    public name: string,
    public altName: string,
    public email: string,
    public phone: string,
    public countryCode: string,
    public gender: string,

    public serverName: string,
    public mt4Number: string,
    public hfid: string,
    public accessCode: string,
    public eaName: string,
    public amount: number,  
  ) { }
}

@Component({
  selector: 'app-ea-form',
  templateUrl: './ea-form.component.html',
  styleUrls: ['./ea-form.component.css']
})
export class EaFormComponent implements OnInit { 
  @ViewChild('signatureCanvas', { static: true }) signaturePad: SignaturePad;
  signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 2,
    'canvasWidth': 400,
    'canvasHeight': 300,
    'backgroundColor': "rgb(255,255,255)"
  };
  //http://definitelytyped.org/docs/signature_pad--signature_pad/classes/signaturepad.html#signaturepadoptions
  loading:boolean = true; 
  parent : any = [];
  model: any = new Model("", "", "","","62","","","","","","",1000 );
  status : number = 1;
  item : any = [];
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
    this.http.get<any>(environment.api + "form/ea", {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        this.status = data['item']['status'];
        this.item = data['item']
        this.parent = data['parent'];
        this.configService.relogin(data); 
        this.loading= false;
        console.log(data);
      },
      error => {
        console.log(error);
      },

    );
  }
 
  open(content) {
    this.modalService.open(content,{size:'xl'});
  }
 
  onSubmit(){
    this.loading = true;
    const body = {
      model: this.model, 
      signature : this.signaturePad.toDataURL()
    } 
    console.log(body);
    this.http.post<any>(environment.api + "form/eaSubmit", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        this.getHttp();
        console.log(data); 

      },
      error => {
        console.log(error);
      }, 
    );
  }

  sign: boolean = false;
  agreement: boolean = false;
  
  drawClear() {
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
    this.sign = false;
  }
  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    console.log(this.signaturePad.toDataURL());
    this.sign = true;
  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }


}
