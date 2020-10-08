import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  constructor(
    public alertCtrl: AlertController,
    public router: Router
  ) { }

  varUser: any = localStorage.getItem("user")

  // funcion para ocultar o mostrar info 

  hiddenInfo(noInfo: boolean, noPedido: boolean) {
    document.getElementById("no-login").hidden = noInfo
    document.getElementById("no-pedido").hidden = noPedido
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
      this.hiddenInfo(false, true)
    } else {
      this.hiddenInfo(true, false)
    }
  }

  ngOnInit() {
    this.showNoInfo()
  }

}
