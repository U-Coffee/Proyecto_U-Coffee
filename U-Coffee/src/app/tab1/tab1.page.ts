import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  constructor(
    public actRouter: ActivatedRoute,
    public http: HttpClient,
    public router: Router,
    public alertCtrl: AlertController
  ) { }
  varUser:any ="";
  datos: any ;

  async loadUser() {
    const datosDB = {
      "mail": this.varUser
    };
    this.http.post('http://localhost/u-coffee/user.php', JSON.stringify(datosDB)).subscribe( async res => {
      this.datos = res;
      console.log(this.datos);
    });
  }
  ngOnInit() {
    this.varUser = this.actRouter.snapshot.paramMap.get('user');
    this.loadUser();
  }

}
