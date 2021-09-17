import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-family-tree',
  templateUrl: './family-tree.component.html',
  styleUrls: ['./family-tree.component.css']
})
export class FamilyTreeComponent implements OnInit {
  @ViewChild('tree') tree : any;
  loading : boolean = true;
  nodes : any = [];
  options = {
    nodeHeight: 43,
  };
  header : string = "family";
  search : string;
  expandAll : boolean = false;
  loadPages : boolean = true;
   

  constructor(
    private http: HttpClient,
    private configService: ConfigService, 
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getHttp();
  }

  getHttp() {
    this.http.get<any>(environment.api + "tree/family", {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        this.loading = false;
        this.loadPages = false;
        if(data['error']== true){
          this.router.navigate(['warning/tree']);
        }
        console.log(data); 
        this.nodes =  data['items'];
      },
      error => {
        console.log(error);
      },

    );
  }

  user : any = [];
  smallLoading : boolean =false;
  onEvent(e){
    this.smallLoading = true;
    console.log(e.node.data); 
    this.loading = true; 
    // this.http.get<any>(environment.api + "tree/detail/"+e.node.data.id, {
    //   headers: this.configService.headers()
    // }).subscribe(
    //   data => { 
    //     this.smallLoading = false; 
    //     this.user = data;
    //     console.log(data);  
    //   },
    //   error => {
    //     console.log(error);
    //   },

    // );

  }
}
