import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service'; 
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

declare var $;

@Component({
  selector: 'app-ea-form-list',
  templateUrl: './ea-form-list.component.html',
  styleUrls: ['./ea-form-list.component.css']
})
export class EaFormListComponent implements OnInit {
  items : any = [];
  loading : boolean = false;
  newForm : boolean = false;
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private modalService: NgbModal, 
    private router:Router,
  ) { }

  ngOnInit(): void { 
    this.getHttp(); 
  } 

  getHttp() { 
    this.http.get<any>(environment.api + "ea/index", {
      headers: this.configService.headers()
    }).subscribe(
      data => {  
        this.items = data['items'];
        this.newForm = data['newForm'];
        $(document).ready(function () {
          $('#dataTables').DataTable({
            ordering: false,
            lengthMenu: [  50, 100, 200, 500],
          });
        });
        console.log(data);
      },
      error => {
        console.log(error);
      },

    );
  }


  onDraft(){
    this.loading = true;
    const body = {
      status : true
    }
    this.http.post<any>(environment.api + "ea/onDraft",body, {
      headers: this.configService.headers()
    }).subscribe(
      data => {  
        this.loading = false;
        this.router.navigate(['eaForm/draft',data['id']]);
      },
      error => {
        console.log(error);
      },

    );
  }
 
}
