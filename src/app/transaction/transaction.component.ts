import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  items: any = [];
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private modalService: NgbModal,
    private activeRouter: ActivatedRoute, 
  ) { 

  }

  ngOnInit(): void {
    console.log(this.activeRouter.snapshot.queryParams.transCode);
    this.getHttp(this.activeRouter.snapshot.queryParams.transCode);
  }

  getHttp(transCode) {
    this.modalService.dismissAll();
    this.http.get<any>(environment.api + "transaction/general/?code=" + transCode, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        this.items = data['transaction'];
        console.log(data);
        this.configService.relogin(data);
      },
      error => {
        console.log(error);
      },

    );
  }

}
