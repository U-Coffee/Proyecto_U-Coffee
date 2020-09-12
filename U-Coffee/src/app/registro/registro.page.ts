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

  async alert(header: string, subHeader: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async logForm() {
    if ((this.ndoc == "")
      || (this.nombre == "")
      || (this.apellido == "")
      || (this.correo == "")
      || (this.contra == "")
      || (this.confContra == "")) {
      this.alert('Alerta', 'Campos vacios', 'Debe rellenar todos los campos')
    } else if (this.contra != this.confContra) {
      this.alert('Alerta', 'Contraseña', 'Los campos de las contraseña no coinciden');
    } else {
      const datosDB_ = {
        "correo": this.correo
      };
      this.http.post('https://localhost/u-coffee/validar.php', JSON.stringify(datosDB_)).subscribe(async res => {
        console.log(res);
        if (res == 1) {
          this.alert('Alerta', 'Ya existe', 'El Correo ' + this.correo + ' ya se encuentra registrado')
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
              this.alert('Hecho', '', '¡Registro Exitoso!')
              this.router.navigate(['/taba/tab1']);
            } else {
              this.alert('Alerta', 'Error', 'Los datos NO han sido registrados');
            }
          });
        }
      })
    }
  }

  ngOnInit() {
  }

}
