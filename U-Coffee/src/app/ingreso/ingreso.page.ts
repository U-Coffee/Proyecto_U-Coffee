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

  async logIn() {
    if ((this.correo == "") || (this.contra == "")) {
      const alert = await this.alertCtrl.create({
        header: 'Alerta',
        subHeader: 'Campos vacios',
        message: 'Debe rellenar todos los campos',
        buttons: ['OK']
      });

      await alert.present();
    } else {
      const datosDB = { "correo": this.correo, "contra": this.contra };
      this.http.post('https://localhost/u-coffee/ingreso.php', JSON.stringify(datosDB)).subscribe(async res => {
        console.log(res);
        if (res == '1') {
          this.router.navigate(['/tabs/tab1']);
        } else {
          const alert = await this.alertCtrl.create({
            header: 'Alerta',
            subHeader: 'Error de ingreso',
            message: 'El campo de correo y/o contraseña es incorrecto',
            buttons: ['OK']
          });

          await alert.present();
        }
      });
    }
  }

  ngOnInit() {
  }

}
