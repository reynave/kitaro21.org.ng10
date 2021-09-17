import { Component, EventEmitter, Input, Output } from '@angular/core'; 
import { Md5 } from "md5-typescript";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-key-modal',
  templateUrl: './key-modal.component.html',
  styleUrls: ['./key-modal.component.css']
})
export class KeyModalComponent{
  key: any = {
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
  }
  loading: boolean = false;
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

   
  onKey(n) { 
    const i = n + 1;
    if (this.key['input' + n] != "") {
      document.getElementById("key" + i).focus();
    } 
  }
  onSubmit() {
    if (!this.key.input1 || !this.key.input2 || !this.key.input3 || !this.key.input4 || !this.key.input5 || !this.key.input6) {
      alert("Please input valid Key!"); 
    }
    else {
      this.loading = true;
      const hashKey = Md5.init(this.key.input1) + Md5.init(this.key.input2) + Md5.init(this.key.input3) + Md5.init(this.key.input4) + Md5.init(this.key.input5) + Md5.init(this.key.input6);
      const body = {
        key: Md5.init(hashKey),
      } 
      this.http.post<any>(environment.api + "key/onSubmit", body, {
        headers: this.configService.headers()
      }).subscribe(
        data => {
          this.loading = false;
          if (data['status'] == false) {
            alert("Wrong Key !");
          } else {
            this.key = {
              input1: "",
              input2: "",
              input3: "",
              input4: "",
              input5: "",
              input6: "", 
            } 
          } 
          console.log(data);
        },
        error => {
          console.log(error);
        },

      );

    }

  }
}
