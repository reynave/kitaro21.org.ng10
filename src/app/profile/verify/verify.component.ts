import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Md5 } from "md5-typescript";



export class Upload {
  constructor(
    public uploadId: string,
  ) { }
}

export class Model {
  constructor(
    public idNumber: number,
    public tax: number,
    public code: string,
    public phone: number,

    public bank: string,
    public bank_name: string,
    public bank_number: number,

  ) { }

}
@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  loading: boolean = true;
  model: any = new Model(null, null, "62", null, "", "", null);
 
  upload: any = new Upload("");
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
    this.http.get<any>(environment.api + "profile/index/", {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data); 
        this.items = data['items'];
        this.notes = data['notes'];
        this.readonly = data['items']['verified'] == '0' ? false : true;

        this.model.idNumber = data['items']['ktp'];
        this.model.tax = data['items']['npwp'];
        this.model.code = data['items']['code'];
        this.model.phone = data['items']['phone'];
        this.readonly = data['readonly'];
        this.model.bank = data['items']['bank'];
        this.model.bank_name = data['items']['bank_account'];
        this.model.bank_number = data['items']['bank_number'];

        this.upload['uploadId'] = data['upload']['uploadId'];
      },
      error => {
        console.log(error);
      },

    );
  }
  open(content) {
    this.modalService.open(content);
  }
  onSubmitVerify() {
    if (!this.upload['uploadId']) {
      alert("Upload Valid ID Card or Driving License is requred!");
    }
    else if (!this.model.bank_number || !this.model.phone) {
      alert("Please fill the form!");
    } else {


      const body = {
        model: this.model,
      }
      console.log(body);
      this.http.post<any>(environment.api + "profile/onSubmitVerify/", body, {
        headers: this.configService.headers()
      }).subscribe(
        data => {
          console.log(data);
          this.loading = false;
          window.location.reload();
        },
        error => {
          console.log(error);
        },

      );
    }
  }



  fileId: any;
  onFileSelected(event) {
    this.fileId = event.target.files[0];
  }

  onUploadId() {
    const fd = new FormData();
    if (!this.fileId) {
      alert("File tidak ditemukan!");
      return false;
    }
    
    this.loading = true;
    fd.append('uploadFile', this.fileId, this.fileId.name);
    fd.append('token', this.configService.token());
    fd.append('name', 'fileId');
    this.fileId = null;
    this.http.post<any>(environment.api + 'upload/uploadId', fd).subscribe(
      data => {
        this.getHttp();
        console.log(data); 
        this.upload['uploadId'] = data['upload_data']
      },
      error => {
        this.getHttp();
        console.log(error);
    
      }
    );
  }

}
