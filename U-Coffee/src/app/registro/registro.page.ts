import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router'
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor(
    public http: HttpClient,
    public alertCtrl: AlertController,
    public router: Router
  ) { }

  ndoc = "";
  nombre = "";
  apellido = "";
  correo = "";
  contra = "";
  confContra = "";

  async logForm() {
    if ((this.ndoc == "") || (this.nombre == "") || (this.apellido == "") || (this.correo == "") || (this.contra == "") || (this.confContra == "")) {
      const alert = await this.alertCtrl.create({
        header: 'Alerta',
        subHeader: 'Campos vacios',
        message: 'Debe rellenar todos los campos',
        buttons: ['OK']
      });

      await alert.present();
    } else if (this.contra != this.confContra) {
      const alert = await this.alertCtrl.create({
        header: 'Alerta',
        subHeader: 'Contraseña',
        message: 'Los campos de las contraseña no coinciden',
        buttons: ['OK']
      });

      await alert.present();
    } else {
      const datosDB_ = {
        "correo": this.correo
      };
      this.http.post('https://localhost/u-coffee/validar.php', JSON.stringify(datosDB_)).subscribe(async res => {
        console.log(res);
        if (res == 1) {
          const alert = await this.alertCtrl.create({
            header: 'Alerta',
            subHeader: 'Ya existe',
            message: 'El Correo ' + this.correo + ' ya se encuentra registrado',
            buttons: ['OK']
          });

          await alert.present();
        } else {
          const datosDB = {
            "ndoc": this.ndoc,
            "nombre": this.nombre,
            "apellido": this.apellido,
            "correo": this.correo,
            "contra": this.contra
          };
          this.http.post('https://localhost/u-coffee/registro.php', JSON.stringify(datosDB)).subscribe(async res => {
            console.log(res);
            if (res == 1) {
              const alert = await this.alertCtrl.create({
                header: 'Hecho',
                message: '¡Registro Exitoso!',
                buttons: ['OK']
              });
              await alert.present();
              this.router.navigate(['/ingreso']);
            } else {
              const alert = await this.alertCtrl.create({
                header: 'Alerta',
                subHeader: 'Error',
                message: 'Los datos NO han sido registrados',
                buttons: ['OK']
              });
              await alert.present();
            }
          });
        }
      })
    }
  }

  ngOnInit() {
  }

}
