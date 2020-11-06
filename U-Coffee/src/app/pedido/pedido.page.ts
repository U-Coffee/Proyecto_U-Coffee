import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {

  constructor(
    public actRouter: ActivatedRoute,
    public http: HttpClient,
    public alertCtrl: AlertController,
    public router: Router
  ) { }
  varUser: any = localStorage.getItem("user")
  varCod: any = "";
  varPre: any = "";
  arrayCod = [];
  arrayPre = [];
  newCod = [];
  datosPro: any;
  //datos = [];

  suma: any = 0;
  index: any;

  async alert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  inicio() {
    this.arrayCod = this.varCod.split(",");
    console.log(this.arrayCod);
    this.arrayPre = this.varPre.split(",");
    console.log(this.arrayPre);
    this.suma = this.arrayPre.reduce((a, b) => a - (-b), 0);
    console.log(this.suma);
  }

  async borrar(elemento) {
    this.index = this.arrayCod.indexOf(elemento);

    this.arrayCod.splice(this.index, 1);

    this.arrayPre.splice(this.index, 1);
    this.suma = this.arrayPre.reduce((a, b) => a - (-b), 0);

    this.alert('Alerta', 'Has borrado ' + elemento + ' de tu pedido')
  }

  async volver() {
    const alert = await this.alertCtrl.create({
      header: 'Alerta',
      message: '¿Quieres cancelar en pedido?',
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
            this.router.navigate(['/tabs/tab2']);

          }
        }
      ]
    });

    await alert.present();

  }

  async envPedido() {
    if ((this.suma == 0) && (this.newCod.length == 0)) {
      this.alert('Alerta', 'Has borrado todo tu pedido, vuelve a nuestro menú y antójate de algo!')
    } else {
      this.newCod = this.arrayCod;
      let desc = this.newCod.toString();
      const datosDB = {
        "ndoc": this.varUser,
        "desc": desc,
        "total": this.suma
      };

      this.http.post('https://u-coffee.000webhostapp.com/factura.php', JSON.stringify(datosDB)).subscribe(async res => {
        console.log(res);
        if (res == 1) {
          this.alert('¡Éxito!', 'Tu pedido ha sido registrado, revisa el estado de tu pedido en la pestaña "Recoge el pedido"')
          this.router.navigate(['/tabs/tab2']);
        } else {
          this.alert('Alert', 'Ha ocurrido un error, tu pedido no ha sido registrado. Inténtalo más tarde');
          this.router.navigate(['/tabs/tab2']);
        }
      });
    }
  }


  ngOnInit() {
    this.varCod = this.actRouter.snapshot.paramMap.get('codigo');
    console.log(this.varCod);
    this.varPre = this.actRouter.snapshot.paramMap.get('precio');
    console.log(this.varPre);
    this.inicio();
  }

}
