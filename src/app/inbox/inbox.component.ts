import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; 
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

declare var $;

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  loading:boolean=false;
  items : any = [];
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private modalService: NgbModal, 
    public sanitizer:DomSanitizer
  ) { }
 

  ngOnInit(): void { 
    this.getHttp();
  }

  getHttp() { 
    this.modalService.dismissAll();
    this.http.get<any>(environment.api + "inbox/index/", {
      headers: this.configService.headers()
    }).subscribe(
      data => {   
        this.loading = false;
        this.items = data['items'];
        console.log(data);
        $(document).ready(function () {
          $('#example').DataTable({
            ordering: false,
            lengthChange: false,
            lengthMenu: [ 50],
          });
        });
        this.configService.relogin(data);
      },
      error => {
        console.log(error);
      }, 
    );
  }
 

  obj : any=[];
  url: SafeResourceUrl = "";
  iframe:string;
  open(content,obj) { 
    $("#inbox"+obj.id).html("Read"); 
    this.obj = obj;
    this.modalService.open(content, { size: 'xl' });
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(environment.api + "inbox/read/"+obj.id+"/?t="+this.configService.token() );    
  }

}
