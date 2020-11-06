import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  envPre = [];
  varUser = localStorage.getItem("user");
  searchText = '';

  constructor(
    public http: HttpClient,
    public alertCtrl: AlertController,
    public router: Router
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

  //Cargar la informacion de los productos
  async loadInfo() {
    const datosDB = {
      "table": this.table
    };
    this.http.post('https://u-coffee.000webhostapp.com/mostrar_pro.php', JSON.stringify(datosDB)).subscribe(async res => {
      this.info = res;
      console.log(this.info);
    });
  }

  //generar un array con los productos seleccionados
  add(codigo: any, precio: any) {

    this.envPre.push(precio);
    console.log(this.envPre);
    this.envPro.push(codigo);

    console.log(this.envPro);
  }

  //Validar que el array del pedido no está vacio
  infoValidation() {
    if (this.envPro.length == 0) {
      this.alert('Alerta', 'No has pedido nada!', 'Porfavor selecciona alguno de nuestros productos para continuar')
    } else {
      let listCod = this.envPro.toString();
      let listPre = this.envPre.toString();
      this.router.navigate(['/pedido', listCod, listPre]);
      this.envPre.splice(0, this.envPre.length);
      this.envPro.splice(0, this.envPro.length);

    }
  }

  //funcion que valida que se ha iniciado sesion para poder realizar el pedido 
  async enviar() {
    this.varUser = localStorage.getItem("user");
    if (this.varUser == null || this.varUser == "") {
      this.alert("Inicia Sesión", "", "Debes iniciar sesión para porder ralizar un pedido")
    } else {
      this.infoValidation()
    }

  }

  //Funcion para cerrar sesion
  async logOut() {

    const alert = await this.alertCtrl.create({
      header: 'Alerta',
      message: '¿Deseas cerrar la sesión actual?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Si',
          handler: () => {
            localStorage.clear(); //se limpia el localStorage 
            location.reload()

          }
        }
      ]
    });

    await alert.present();
  }

  buscar(event){
    //console.log(event)
    this.searchText = event.detail.value

  }

  ngOnInit() {
    this.loadInfo();
  }

}
