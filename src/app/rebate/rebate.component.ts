import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
declare var $;

@Component({
  selector: 'app-rebate',
  templateUrl: './rebate.component.html',
  styleUrls: ['./rebate.component.css']
})
export class RebateComponent implements OnInit {
  items: any = [];
  loading: boolean = false;
  period: string;
  constructor(
    private router: Router,
    private http: HttpClient,
    private configService: ConfigService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.getHttp();
    this.period = this.activatedRoute.snapshot.paramMap.get('date');
  }

  getHttp() {
    this.http.get<any>(environment.api + "profit/index/", {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
        this.items = data['items'];
        $(document).ready(function () {
          $('#dataTables').DataTable({
            ordering: false,
            lengthMenu: [  50, 100, 200, 500],
          });
        });
      },
      error => {
        console.log(error);
      },
    );
  }

  detail  : any = []; 
  batch : string = "";
  open(content,batch){
    this.batch = batch;
    this.modalService.open(content,{size:'lg'});
    this.http.get<any>(environment.api + "profit/detailSharing/"+batch, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
        this.detail = data['items']; 
      },
      error => {
        console.log(error);
      },
    );
  }



}
