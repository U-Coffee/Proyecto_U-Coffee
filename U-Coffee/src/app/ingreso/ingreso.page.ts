import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
})
export class IngresoPage implements OnInit {

  constructor(
    public http: HttpClient,
    public alertCtrl: AlertController,
    public router: Router
  ) { }

  correo = "";
  contra = "";

  async alert(header: string, subHeader: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async logIn() {
    if ((this.correo == "") || (this.contra == "")) {
      this.alert('Alerta','Campos vacios','Debe rellenar todos los campos');
    } else {
      const datosDB = { "correo": this.correo, "contra": this.contra };
      this.http.post('https://localhost/u-coffee/ingreso.php', JSON.stringify(datosDB)).subscribe(async res => {
        console.log(res);
        if (res == '1') {
          this.router.navigate(['/tabs/tab1', this.correo]);
        } else {
          this.alert('Alerta','Error de ingreso','El campo de correo y/o contraseña es incorrecto')
        }
      });
    }
  }

  ngOnInit() {
  }

}
