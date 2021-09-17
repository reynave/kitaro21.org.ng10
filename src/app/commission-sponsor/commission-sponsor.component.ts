import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var $;
@Component({
  selector: 'app-commission-sponsor',
  templateUrl: './commission-sponsor.component.html',
  styleUrls: ['./commission-sponsor.component.css']
})
export class CommissionSponsorComponent implements OnInit {
  items: any = [];
  year : string;
  month : string;
  weekly : string;
  
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getHttp();
  }

  getHttp() {
    this.modalService.dismissAll();
    this.http.get<any>(environment.api + "commission/sponsor", {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        $(document).ready(function () {
          $('#example').DataTable({
            ordering: false, 
            lengthMenu: [ 20, 50, 100, 200, 500],
          });
        });
        this.items = data['transaction'];
        this.year = data['year'];
        this.month = data['month'];
        this.weekly = data['weekly'];
        
        console.log(data);
        this.configService.relogin(data);
      },
      error => {
        console.log(error);
      },

    );
  }

}
