import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { Router } from '@angular/router';
import { Md5 } from "md5-typescript";
 
@Component({
  selector: 'app-activate-code',
  templateUrl: './activate-code.component.html',
  styleUrls: ['./activate-code.component.css']
})
export class ActivateCodeComponent implements OnInit { 
  note: any; 
  email : string;
  coffeetalk : string = environment.coffeetalk;
  constructor( 
    private http: HttpClient,
    private configService: ConfigService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.configService.token()) {
      this.router.navigate(['home']);
    } 
  }

  onGo() {  
    const body = {
      email: this.email, 
    }
    console.log(body);
    this.http.post<any>(environment.api + "login/onGo/", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);  
        if(data['error'] == true){
          this.note = data['note'];
        }else{
          window.location.href = environment.coffeetalk+"user/#/membership?id="+data['id']+"&error=false";
        }
      },
      error => {
        console.log(error);
      }, 
    );
  }
 

  back(){
    window.history.back();
  }

}
