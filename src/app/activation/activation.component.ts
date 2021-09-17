import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent implements OnInit {
  agree :boolean = false;
  token : string;
  koteEtik : string  = environment.api+'data/kode-etik-pt-visionea-teknologi-perkasa.html';
  termNote : string;
  urlSafe: SafeResourceUrl;

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute, 
    private router: Router, 
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.koteEtik);

    this.getHttp();
  }

 
  getHttp() {
    this.token = this.activatedRoute.snapshot.paramMap.get('token');
    this.http.get<any>(environment.api + "form/ethicCode?t="+ this.token, {
      headers: this.configService.headers()
    }).subscribe(
      data => {    
        this.termNote = data['termNote'];
      },
      error => {
        console.log(error);
      },
    );
  }

  open(content) {  
    this.modalService.open(content, { size: 'xl' });
  }

  onAgree(){
    this.agree = true;
    this.modalService.dismissAll();
  }

  onActivate(){
    this.token = this.activatedRoute.snapshot.paramMap.get('token');
    const body = {
      token : this.token,
    }
    console.log(body)
    this.http.post<any>(environment.api + "form/onActivate", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => {    
        console.log(data);
        this.configService.removeToken();
        window.location.href = '/'; 
      },
      error => {
        console.log(error);
      },
    );
  }
}
