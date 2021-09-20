import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

declare var $;

@Component({
  selector: 'app-referal',
  templateUrl: './referal.component.html',
  styleUrls: ['./referal.component.css']
})
export class ReferalComponent implements OnInit {
  items : any = [];
  referral : string;
  asCopy : boolean = false;
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

  verified:boolean=false;
  getHttp() {
   
    this.http.get<any>(environment.api + "customer/index/", {
      headers: this.configService.headers()
    }).subscribe(
      data => {   
        this.verified = data['verified'];
        console.log(data);
        $(document).ready(function () {
          $('#example').DataTable({ 
            order: [[ 2, "asc" ]],
            lengthMenu: [ 20, 50, 100, 200, 500],
          });
        });
        if( !data['verified'] ){
          this.router.navigate(['notfound']);
        }
        this.referral =  environment.coffeetalk+"membership?ref="+data['referral'];
        this.items = data['items']; 
        this.configService.relogin(data);
      },
      error => {
        console.log(error);
      },

    );
  }

  copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.asCopy = true;
  }

}
