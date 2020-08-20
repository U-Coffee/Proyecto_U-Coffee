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
  varHistorial:any = [];

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
          this.varUser = this.correo;
          if ((this.varUser != null) || (this.varUser != "")) {
            this.titulo = "Mis pedidos";
            this.loadUser();
            //this.historial();

            const datosDB = {
              "user" : this.varUser
            };
            this.http.post('https://localhost/u-coffee/historial.php',JSON.stringify(datosDB)).subscribe(async res =>{
              this.varHistorial = res
              console.log(this.varHistorial);
              if(this.varHistorial.lenght == 0){
                document.getElementById("no-info").hidden = false;
                document.getElementById("titulo").hidden = false;
                document.getElementById("log-in").hidden = true;
                document.getElementById("historial").hidden = true;
              } else {
                document.getElementById("no-info").hidden = true;
                document.getElementById("titulo").hidden = false;
                document.getElementById("log-in").hidden = true;
                document.getElementById("historial").hidden = false;
              }
            });
            console.log(this.varUser);
            this.router.navigate(['/tabs/tab2', this.varUser]);
          }else{
            document.getElementById("no-info").hidden = true;
            document.getElementById("titulo").hidden = true;
            document.getElementById("log-in").hidden = false;
            document.getElementById("historial").hidden = true;
            this.titulo = "Ingreso";
          }
        } else {
          const alert = await this.alertCtrl.create({
            header: 'Alerta',
            subHeader: 'Error de ingreso',
            message: 'El campo de <strong>Documento</strong> y/o <strong>Contraseña</strong> es incorrecto',
            buttons: ['OK']
          });

          await alert.present();
        }
      });
    }
  }

  /*async historial(){
    const datosDB = {
      "user" : this.varUser
    };
    this.http.post('https://localhost/u-coffee/historial.php',JSON.stringify(datosDB)).subscribe(async res =>{
      this.varHistorial = res
      console.log(this.varHistorial);
      if(this.varHistorial.lenght == 0){
        document.getElementById("no-info").hidden = false;
        document.getElementById("titulo").hidden = false;
        document.getElementById("log-in").hidden = true;
        document.getElementById("historial").hidden = true;
      } else {
        document.getElementById("no-info").hidden = true;
        document.getElementById("titulo").hidden = true;
        document.getElementById("log-in").hidden = false;
        document.getElementById("historial").hidden = false;
      }
    });
  }*/

  enviar(){
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
