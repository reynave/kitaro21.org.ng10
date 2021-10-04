import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ea-pdf',
  templateUrl: './ea-pdf.component.html',
  styleUrls: ['./ea-pdf.component.css']
})
export class EaPDFComponent implements OnInit {
  item: any = [];
  closed: any = []; 
  error : boolean = false;
  parent : any  = [];
  uploadUser : string = environment.api;
  level : string;
  constructor(

    private http: HttpClient,
    private configService: ConfigService,
    private activeRouter : ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getHttp();

  }

  print(){
    window.print();
  }

  getHttp() {
    this.http.get<any>(environment.api + "ea/view/"+this.activeRouter.snapshot.params['id'], {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        if(data['error'] == false){
          this.parent = data['parent'];
          this.item = data['item'];
          this.level = data['level'];
        }else{
          this.error = true;
        } 
        console.log(data); 
      },
      error => { 
        console.log(error);
      },

    );
  }

}
