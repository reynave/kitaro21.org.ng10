import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { ActivatedRoute } from '@angular/router'; 

declare var $;

@Component({
  selector: 'app-leftside',
  templateUrl: './leftside.component.html',
  styleUrls: ['./leftside.component.css']
})
export class LeftsideComponent implements OnInit {
  verified:string = '0';
  active : string;
  title : string = environment.title;
  subtitle : string = environment.subtitle;
  coffeetalk : string = environment.coffeetalk;
  orderCode : string;
  eaStatus:boolean=false;
  constructor( 
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  ngOnInit(): void { 
    this.active = this.activatedRoute.snapshot.data.active; 
    this.getHttp(); 
  }

  onPayment(){
    window.open( environment.coffeetalk+ 'paymentConfirm?orderCode='+this.orderCode, 'newwindow');
  }
  validID : boolean = false;
  getHttp() { 
    this.http.get<any>(environment.api + "profile/leftSide/", {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        console.log(data);
        this.validID = data['validID'];
        this.eaStatus = data['eaStatus'];
        this.verified = data['verified'];
        this.orderCode = data['orderCode']; 
        $(document).ready(function () {
      
          var body = $('body');
    
          // Sidebar toggle to sidebar-folded
          $('.sidebar-toggler').on('click', function (e) {
            $(this).toggleClass('active');
            $(this).toggleClass('not-active');
            if (window.matchMedia('(min-width: 992px)').matches) {
              e.preventDefault();
              body.toggleClass('sidebar-folded');
            } else if (window.matchMedia('(max-width: 991px)').matches) {
              e.preventDefault();
              body.toggleClass('sidebar-open');
            }
          });
     
          // close sidebar when click outside on mobile/table    
          $(document).on('click touchstart', function (e) {
            e.stopPropagation();
    
            // closing of sidebar menu when clicking outside of it
            if (!$(e.target).closest('.sidebar-toggler').length) {
              var sidebar = $(e.target).closest('.sidebar').length;
              var sidebarBody = $(e.target).closest('.sidebar-body').length;
              if (!sidebar && !sidebarBody) {
                if ($('body').hasClass('sidebar-open')) {
                  $('body').removeClass('sidebar-open');
                }
              }
            }
          }); 
    
        });
      },
      error => {
        console.log(error);
      },

    );
  }
  

}
