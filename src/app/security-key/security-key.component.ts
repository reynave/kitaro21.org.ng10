import { Component, OnInit } from '@angular/core';
import { Md5 } from "md5-typescript";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';


@Component({
  selector: 'app-security-key',
  templateUrl: './security-key.component.html',
  styleUrls: ['./security-key.component.css']
})
export class SecurityKeyComponent implements OnInit {
  model: any = {
    key: "",
    pass: "",
  }
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }


  open(content) {
    this.modalService.open(content);
  }


  password: string;
  key: any = {
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",

  }
  onKey(n) {
    const i = n + 1;
    if (this.key['input' + n] != "") {
      document.getElementById("key" + i).focus();
    }

  }
  loading:boolean = false;
  onSubmit() {
   
    if (!this.password) {
      alert("Please input password!");

    } 
    else if(!this.key.input1 || !this.key.input2 || !this.key.input3 || !this.key.input4 || !this.key.input5 ||  !this.key.input6){
      alert("Please input valid Key!");

    }
    else { 
      this.loading = true;
      const hashKey = Md5.init(this.key.input1) + Md5.init(this.key.input2) + Md5.init(this.key.input3) + Md5.init(this.key.input4) + Md5.init(this.key.input5) + Md5.init(this.key.input6);
      this.model = {
        key: Md5.init(hashKey),
        pass: Md5.init(this.password),
      }

      this.http.post<any>(environment.api + "key/onCreated", this.model, {
        headers: this.configService.headers()
      }).subscribe(
        data => {
          this.loading = false;
          if (data['error'] == true) {
            alert("Wrong Password !");
          } else {
            this.key = {
              input1: "",
              input2: "",
              input3: "",
              input4: "",
              input5: "",
              input6: "",

            }
            alert("New KEY created!");
            this.modalService.dismissAll();
          }
          this.password = "";
          console.log(data);
        },
        error => {
          console.log(error);
        },

      );

    }
  }
}
