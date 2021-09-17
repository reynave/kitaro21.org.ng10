import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

declare var $;

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  items : any = [];
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute, 
    private router: Router, 
    
  ) { }

  ngOnInit(): void { 
    this.getHttp();
  }


  getHttp() {
   
    this.http.get<any>(environment.api + "customer/index/", {
      headers: this.configService.headers()
    }).subscribe(
      data => {   
        $(document).ready(function () {
          $('#example').DataTable({
            ordering: false,
            lengthMenu: [ 20, 50, 100, 200, 500],
          });
        });
        this.items = data['items'];
        console.log(data);
        this.configService.relogin(data);
      },
      error => {
        console.log(error);
      },

    );
  }


}
