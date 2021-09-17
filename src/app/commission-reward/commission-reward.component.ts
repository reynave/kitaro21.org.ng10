import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-commission-reward',
  templateUrl: './commission-reward.component.html',
  styleUrls: ['./commission-reward.component.css']
})
export class CommissionRewardComponent implements OnInit {
  items: any = [];
  year : string;
  month : string;
  weekly : string;
  period : string;
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getHttp();
  }
  pairs:string;
  reward:any = [];
  getHttp() {
    this.modalService.dismissAll();
    this.http.get<any>(environment.api + "commission/reward", {
      headers: this.configService.headers()
    }).subscribe(
      data => {  
        this.reward = data['reward'];
        this.pairs = data['pairs'];
        this.period = data['period'];
        console.log(data);
        this.configService.relogin(data);
      },
      error => {
        console.log(error);
      },

    );
  }

}
