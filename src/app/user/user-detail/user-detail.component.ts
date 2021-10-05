import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

declare var $;
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  items : any = [];
  referral : string;


  cardNumber  : string;
  loading:boolean = true;
  user : any = [];
  detail : any = [];
  sponsor : any = [];
  reward :  any = [];
  commission : any = [];
  verified : string;
  v2_user_product  :any = [];
  product : string;

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute, 
    private router: Router, 
    
  ) { }

  ngOnInit(): void { 
    this.getHttp();
    console.log( this.activatedRoute.snapshot.params['id']);
  }


  getHttp() {
  
    this.http.get<any>(environment.api + "customer/detail/"+this.activatedRoute.snapshot.params['id'], {
      headers: this.configService.headers()
    }).subscribe(
      data => {   
        var card;
        $(document).ready(function () {
          $('#example').DataTable({ 
            order: [[ 2, "asc" ]],
            lengthMenu: [ 20, 50, 100, 200, 500],
          });
        }); 
 
        this.user = data['user'];
        card = data['user']['cardNumber'];
        this.cardNumber = card[0] + card[1] + card[2] + card[3] + " " + card[4] + card[5] + card[6] + card[7] + " " + card[8] + card[9] + card[10] + card[11] + " " + card[12] + card[13] + card[14] + card[15]; 
        this.detail = data['detail'];
        this.sponsor =data['sponsor'];
        this.reward = data['reward'];
        this.commission = data['commission'];
        this.verified = data['verified'];
        this.product = data['product'];
        this.configService.relogin(data);
        this.v2_user_product = data['v2_user_product'];
        console.log(data);
        this.configService.relogin(data);
      },
      error => {
        console.log(error);
      },

    );
  }

  back(){
    window.history.back();
  }

  copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }
}
