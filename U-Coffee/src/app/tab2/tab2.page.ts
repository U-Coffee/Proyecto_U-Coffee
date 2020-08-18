import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  table = "product";
  info: any;
  envPro = [];
  varUser = "";
  envPre = [];
  // suma: any = 0;

  constructor(
    public http: HttpClient,
    public alertCtrl: AlertController,
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

  add(codigo, precio) {

    this.envPre.push(precio);
    //this.suma=this.envPre.reduce((a,b) => a - (-b) , 0)
    console.log(this.envPre);
    this.envPro.push(codigo);

    console.log(this.envPro);
    //console.log(this.suma);

  }

  async enviar() {
    if (this.envPro.length == 0) {
      const alert = await this.alertCtrl.create({
        header: 'Alerta',
        subHeader: 'No has pedido nada!',
        message: 'Porfavor selecciona alguno de nuestros productos para continuar',
        buttons: ['OK']
      });

      await alert.present();
    } else {
      let listCod = this.envPro.toString();
      let listPre = this.envPre.toString();
      this.router.navigate(['/pedido', listCod, listPre, this.varUser]);

    }
  }

  ngOnInit() {
    this.varUser = this.actRouter.snapshot.paramMap.get("user");
    this.loadInfo();
  }

}
