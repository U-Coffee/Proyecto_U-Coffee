import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  table = "product";
  info: any;
  envPro = [];
  varUser ="";

  constructor(
    public http: HttpClient,
    public aletCtrl: AlertController,
    public router: Router,
    public actRouter: ActivatedRoute
  ) { }

  async loadInfo() {
    const datosDB = {
      "table": this.table
    };
    this.http.post('http://localhost/u-coffee/mostrar_pro.php', JSON.stringify(datosDB)).subscribe(async res => {
      this.info = res;
      console.log(this.info);
    });
  }

  add(codigo){

    this.envPro.push(codigo);

    console.log(this.envPro);
  }

  async enviar(){

  }

  ngOnInit() {
    this.loadInfo();
  }

}
