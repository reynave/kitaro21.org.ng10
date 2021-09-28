import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

declare var $;
@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {
  items: any = [];
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private modalService: NgbModal,
    private activeRouter: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    this.getHttp();
  }

  getHttp() {
    this.modalService.dismissAll();
    this.http.get<any>(environment.api + "transaction/salesReport/", {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        this.items = data['items'];
        console.log(data);
        $(document).ready(function () {
          $('#dataTables').DataTable({
            ordering: false,
            lengthMenu: [50, 100, 200, 500],
          });
        });


        this.configService.relogin(data);
      },
      error => {
        console.log(error);
      },

    );
  }

 
  open(content) {
    this.modalService.open(content, { size: 'xl' });
  }

}
