import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Md5 } from "md5-typescript";

export class Password {
  constructor(
    public curPass: string,
    public pass: string,
    public newPass: string,
  ) { }

}

export class Model {
  constructor(
    public code: string,
    public phone: string,

    public heir_name: string,
    public heir_email: string,
    public heir_phone: string,
    public heir_relation: string,

  ) { }

}
@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  loading: boolean = true;
  model: any = new Model("", "", "", "", "", "");
  password: any = new Password("", "", "");

  items: any = [];
  readonly: boolean = true;
  notes: string;
  constructor(
    private http: HttpClient,
    private configService: ConfigService, private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getHttp();
  }

  getHttp() {
     this.loading = true;
    this.http.get<any>(environment.api + "profile/index/", {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
        this.items = data['items'];
        this.loading = false;
        this.model.code = data['items']['code'];
        this.model.phone = data['items']['phone'];

        this.model.heir_name = data['items']['heir_name'];
        this.model.heir_email = data['items']['heir_email'];
        this.model.heir_phone = data['items']['heir_phone'];
        this.model.heir_relation = data['items']['heir_relation'];


        this.notes = data['notes'];
        this.readonly = data['items']['verified'] == '0' ? false : true;


      },
      error => {
        console.log(error);
      },

    );
  }
  open(content) {
    this.modalService.open(content);
  }

  onUpdate() {
    console.log(this.model);
    this.loading = true;
    this.http.post<any>(environment.api + "profile/update/", this.model, {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
       
         this.getHttp();
       this.readonly = true;
      },
      error => {
        console.log(error);
      },

    );
  }

  onChangePassword() {
    const body = {
      curPass: Md5.init(this.password['curPass']),
      pass1: Md5.init(this.password['pass']),
      pass2: Md5.init(this.password['newPass']),
      old: this.items.password,
    }
    console.log(body);
    if (Md5.init(this.password['curPass']) == this.items.password) {
      if (Md5.init(this.password['pass']) !== Md5.init(this.password['newPass'])) {
        alert("New password doest match !");
      } else {
        this.http.post<any>(environment.api + "profile/onChangePassword/", body, {
          headers: this.configService.headers()
        }).subscribe(
          data => {
            this.getHttp();
            this.modalService.dismissAll();
            this.password = new Password("", "", "");
          },
          error => {
            console.log(error);
          },
        );
      }
    } else {
      alert("Current password doest match !");
    }
  }


}
