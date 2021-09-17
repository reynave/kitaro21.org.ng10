import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service'; 
import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-readonly',
  templateUrl: './readonly.component.html',
  styleUrls: ['./readonly.component.css']
})
export class ReadonlyComponent implements OnInit {
  items : any = [];
  loading : boolean = true;
  ebook  : string;
  url: SafeResourceUrl = "";
  iframe:string;
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private router: Router, 
    private activatedRoute: ActivatedRoute,  
    public sanitizer:DomSanitizer
  ) { }

  ngOnInit(): void {  
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(environment.api + "ebookreading/readonlye/?t="+this.configService.token());     
  }
 

  logout(){
    this.http.get<any>(environment.api + "profile/logout", {
      headers: this.configService.headers()
    }).subscribe(
      data => {  
          this.configService.removeToken();
          this.router.navigate(['relogin']);
      },
      error => {
        console.log(error); 
      },

    );
  }
}
