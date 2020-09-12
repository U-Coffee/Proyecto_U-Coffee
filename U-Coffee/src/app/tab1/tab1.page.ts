import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(
    public actRouter: ActivatedRoute,
    public http: HttpClient,
    public router: Router,
    public alertCtrl: AlertController
  ) { }
  varUser: any = "";
  datos: any;
  titulo: any = "Ingreso";
  varHistorial: any = [];

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

  hidden(bool1: boolean, bool2: boolean, bool3: boolean, bool4: boolean) {
    document.getElementById("no-info").hidden = bool1;
    document.getElementById("titulo").hidden = bool2;
    document.getElementById("log-in").hidden = bool3;
    document.getElementById("historial").hidden = bool4;
  }

  async logIn() {
    if ((this.correo == "") || (this.contra == "")) {
      this.alert('Alerta', 'Campos vacios', 'Debe rellenar todos los campos');
    } else {
      const datosDB = { "correo": this.correo, "contra": this.contra };
      this.http.post('https://localhost/u-coffee/ingreso.php', JSON.stringify(datosDB)).subscribe(async res => {
        console.log(res);
        if (res == '1') {
          this.varUser = this.correo;
          if ((this.varUser != null) || (this.varUser != "")) {
            this.titulo = "Mis pedidos";
            this.loadUser();
            //this.historial();

            const datosDB = {
              "user": this.varUser
            };
            this.http.post('https://localhost/u-coffee/historial.php', JSON.stringify(datosDB)).subscribe(async res => {
              this.varHistorial = res
              console.log(this.varHistorial);
              if (this.varHistorial.lenght == 0) {
                this.hidden(false, false, true, true);
              } else {
                this.hidden(true, false, true, false);
              }
            });
            console.log(this.varUser);
            this.router.navigate(['/tabs/tab2', this.varUser]);
          } else {
            this.hidden(true, true, false, true);
            this.titulo = "Ingreso";
          }
        } else {
          this.alert('Alerta', 'Error de ingreso', 'El campo de <strong>Documento</strong> y/o <strong>Contraseña</strong> es incorrecto');
        }
      });
    }
  }

  enviar() {
    this.router.navigate(['/tabs/tab2', this.varUser]);
  }

  async loadUser() {
    const datosDB = {
      "mail": this.varUser
    };
    this.http.post('http://localhost/u-coffee/user.php', JSON.stringify(datosDB)).subscribe(async res => {
      this.datos = res;
      console.log(this.datos);
    });
  }
  ngOnInit() {

  }

}
