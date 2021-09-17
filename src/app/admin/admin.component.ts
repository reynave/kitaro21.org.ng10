import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service'; 
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private configService: ConfigService, 
    private activeRoute: ActivatedRoute, 
    private router: Router,
  ) { }

  ngOnInit(): void {
    //console.log(this.activeRoute.snapshot.queryParams);
    this.httpGet();
  }

  httpGet(){
    this.http.get<any>(environment.api + "login/admin/?key="+this.activeRoute.snapshot.queryParams['key'], {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
        if (data['error'] === 1) {
          alert("ERROR!");
        } else {
          this.configService.setToken(data['data']['token']);
          this.configService.setObj(data['data']['data']);

          this.router.navigate(['home']);
        }
      },
      error => {
        console.log(error);
      },

    );
  }

}
