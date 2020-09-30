import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
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
  envPre = [];
  varUser = localStorage.getItem("user");

  constructor(
    public http: HttpClient,
    public alertCtrl: AlertController,
    public router: Router,
    public actRouter: ActivatedRoute,
    public navCtrl: NavController
  ) { }

  //Funcion de las alertas
  async alert(header: string, subHeader: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async loadInfo() {
    const datosDB = {
      "table": this.table
    };
    this.http.post('http://localhost/u-coffee/mostrar_pro.php', JSON.stringify(datosDB)).subscribe(async res => {
      this.info = res;
      console.log(this.info);
    });
  }

  add(codigo: any, precio: any) {

    this.envPre.push(precio);
    console.log(this.envPre);
    this.envPro.push(codigo);

    console.log(this.envPro);
  }

  infoValidation(){
    if (this.envPro.length == 0) {
      this.alert('Alerta','No has pedido nada!','Porfavor selecciona alguno de nuestros productos para continuar')
    } else {
      let listCod = this.envPro.toString();
      let listPre = this.envPre.toString();
      this.router.navigate(['/pedido', listCod, listPre]);
      this.envPre.splice(0,this.envPre.length);
      this.envPro.splice(0,this.envPro.length);

    }
  }

  async enviar() {
    this.varUser = localStorage.getItem("user");
    if(this.varUser == null || this.varUser ==""){
      this.alert("Inicia Sesión","","Debes iniciar sesión para porder ralizar un pedido")
    } else {
      this.infoValidation()
    }
    
  }

  ngOnInit() {
    this.loadInfo();
  }

}
