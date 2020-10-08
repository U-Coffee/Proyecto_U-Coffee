import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  varHistorial: any;

  constructor(
    public alertCtrl: AlertController,
    public router: Router,
    public http: HttpClient
  ) { }

  varUser: any = localStorage.getItem("user")

  // funcion para ocultar o mostrar info 

  hiddenInfo(noInfo: boolean, noPedido: boolean, noConfirm: boolean) {
    document.getElementById("no-login").hidden = noInfo
    document.getElementById("no-pedido").hidden = noPedido
    document.getElementById("no-confirm").hidden = noConfirm
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

  //Funcion para ir a la pagina de inicio de sesion
  logIn() {
    this.router.navigate(['/tabs/tab1'])
  }

  //funcionpara mostrar o no info si se ha iniciado sesion
  showNoInfo() {
    this.varUser = localStorage.getItem("user")

    if ((this.varUser == "") || (this.varUser == null)) {
      this.hiddenInfo(false, true, true)
    } else {

      const datosDB = {
        "user": this.varUser, //carga la info del usuario que eseta guardada en el localStorage
        "enviado": "0"
      };
      this.http.post('https://localhost/u-coffee/historial.php', //valida que tenga pedidos realizados 
        JSON.stringify(datosDB)).subscribe(async res => {
          this.varHistorial = res
          console.log(this.varHistorial);
          if (this.varHistorial == 0) { //valida que tengo almenos un pedido realizado
            this.hiddenInfo(false, false, true); //muestra un mensaje que no ha realizado pedidos
          } else {
            this.hiddenInfo(true, true, false); // muestra los pedidos realizados
          }
        });

    }
  }



  ngOnInit() {
    this.showNoInfo()
  }

}
