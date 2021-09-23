import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { ActivatedRoute, Router } from '@angular/router'; 

@Component({
  selector: 'app-membership-activation',
  templateUrl: './membership-activation.component.html',
  styleUrls: ['./membership-activation.component.css']
})
export class MembershipActivationComponent implements OnInit {
  key: string;
  note : string;
  altToken : string = "QuN2sDx65ELWWR9xCcxeYCjADNxHMBbYreDtdNZEwpFTwGHukRcrqhyNneaHgw9xn2aY6pD7Q464zy65ee5ze8twQLNFZzARfc8pqdMvEjDMLHPcGPt82zhbtNTWge9HsF6nMSDtarFhw4TeCaYZ9qT8P3vBgqeJmMKqceKBYRc3SXLYDX7K22bqDGJcVbvB353TcQ9LNJJDdKVGtMGtTddPBHXgakXyThb3ActMAcDFeJmaWUeQjtdLt5GqvYS3";
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) { }

  varHeaders: any = new HttpHeaders({
    'Content-Type': 'application/json',
    'Key': this.configService.varKey,
  });

  ngOnInit(): void { 
    this.key = this.activeRouter.queryParams['_value'].key;
    console.log(this.key); 
    this.httpPost();
  }
  loading : boolean = true;
  httpPost(){ 
    const body = {
      key : this.key,
      altToken : this.altToken,
    }
    this.http.post<any>(environment.api + "register/onConfirmCodebyLink", body, {
      headers: this.varHeaders,
    }).subscribe(
      data => {  
        console.log(data);   
        if(data['error']===false){
          this.router.navigate(['login']);
        }else{
          this.loading = false;
          this.note = data['note'];
        }
      },
      error => {
        console.log(error);
      }, 
    );
  }

}
