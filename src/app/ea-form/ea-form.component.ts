import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SignaturePad } from 'ngx-signaturepad/signature-pad';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    public formTypeId: string, 
    public registerDate: string, 
    
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
  loading: boolean = true;
  parent: any = [];
  date = new Date();

  model: any = new Model("", "", "", "", "62", "", "", "", "", "", "KITARO Global Fund (Multiple Entries)", 1000, "","");
  status: number = 1;
  item: any = [];
  id: string;
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private modalService: NgbModal,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getHttp();
    console.log( );
    console.log(this.activeRoute.snapshot.params['id']);
  }
  getHttp() {
    this.modalService.dismissAll();
    this.http.get<any>(environment.api + "ea/draft/" + this.activeRoute.snapshot.params['id'], {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        if (data['error'] == true) {
          this.back();
        } else {


          this.model = new Model(
            data['items']['name'],
            data['items']['altName'],
            data['items']['email'],
            data['items']['phone'],
            data['items']['countryCode'],
            data['items']['gender'],
            data['items']['serverName'],
            data['items']['mt4Number'],
            data['items']['hfid'],
            data['items']['accessCode'],
            data['items']['eaName'],
            data['items']['amount'],
            data['items']['formTypeId'],
            data['items']['registerDate'],
          );
          this.status = data['status'];
          this.id = data['id'];
          this.item = data['item']
          this.parent = data['parent'];
        }
        this.configService.relogin(data);
        this.loading = false;
        console.log(data);
      },
      error => {
        console.log(error);
      },

    );
  }

  onChanges(name, value) {
    const body = {
      name: name,
      value: value,
      id: this.activeRoute.snapshot.params['id'],
    }
    console.log(body);
    this.http.post<any>(environment.api + "ea/onChanges", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      },
    );
  }

  open(content) {
    this.modalService.open(content, { size: 'xl' });
  }

  onSubmit() {
    this.loading = true;
    const body = {
      model: this.model,
      signature: this.signaturePad.toDataURL(),
      id: this.activeRoute.snapshot.params['id'],
    }
    console.log(body);
    this.http.post<any>(environment.api + "ea/eaSubmit", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        this.loading = false;
        this.back();
        console.log(data);

      },
      error => {
        this.loading = false;
        this.back();
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

  back() {
    window.history.back();
  }

}
