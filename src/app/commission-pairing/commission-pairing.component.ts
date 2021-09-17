import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
declare var $;
@Component({
  selector: 'app-commission-pairing',
  templateUrl: './commission-pairing.component.html',
  styleUrls: ['./commission-pairing.component.css']
})
export class CommissionPairingComponent implements OnInit {
  pairing: any = [];
  vps: any = [];
  idDetail : string;
  leftBv: string;
  rightBv: string;
  leftBvTotal: string;
  rightBvTotal: string;
  accumulation : any=[];
  pairingDetail: any = [];
  pairCode: string;
  modalLoading : boolean = true;
  pairingDate:string;
  pairingToday:string;
 
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private modalService: NgbModal,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getHttp();
    console.log(this.activeRoute.snapshot.queryParams);
  }

  getHttp() { 
    this.modalService.dismissAll();
    this.http.get<any>(environment.api + "commission/pairing", {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        $(document).ready(function () {
          $('#example').DataTable({
            ordering: false,
            lengthMenu: [20, 50, 100, 200, 500],
          });
        });
        this.pairing = data['pairing'];
        this.pairingToday = data['pairingToday'];
        this.leftBv = data['leftBv'];
        this.rightBv = data['rightBv'];
        this.leftBvTotal = data['leftBvTotal'];
        this.rightBvTotal = data['rightBvTotal'];
 
        this.vps = data['vps'];
   
        console.log(data);
        this.configService.relogin(data);
      },
      error => {
        console.log(error);
      },

    );
  }
 
  open(content, obj,action) { 
    this.modalLoading = true;
    this.pairingDate = obj['pairingDate'];
    console.log(obj);
    this.modalService.open(content, { size: 'xl' });

    this.http.get<any>(environment.api + "commission/"+action+"/"+obj.pairingDate, {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        this.modalLoading = false;
        this.accumulation = data['accumulation'];
        this.pairingDetail = data['pairingDetail'];  
        this.idDetail = this.activeRoute.snapshot.queryParams.idDetail;
        console.log(data);
        this.configService.relogin(data);
      },
      error => {
        console.log(error);
      },

    );

  }

  getDetail(obj,history){  
    this.modalService.dismissAll();
    this.open(history, obj, 'pairingHistory');
   // this.modalService.open(history, { size: 'xl' });
   
  }

}
