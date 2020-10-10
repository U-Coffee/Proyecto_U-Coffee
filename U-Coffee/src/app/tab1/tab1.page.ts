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
  varUser = localStorage.getItem("user")
  datos: any;
  titulo: any = "Ingreso";
  varHistorial: any = [];
  ndoc = "";
  contra = "";

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

  //Funcion par amostrar o esconder informacion
  hidden(noInfo: boolean, titulo: boolean, logIn: boolean, historial: boolean, logOut: boolean) {
    document.getElementById("no-info").hidden = noInfo;
    document.getElementById("titulo").hidden = titulo;
    document.getElementById("log-in").hidden = logIn;
    document.getElementById("historial").hidden = historial;
    document.getElementById("log-out").hidden = logOut;
  }

  //funcion que muestra el historial de pedidos
  showHystorial() {
    this.varUser = localStorage.getItem("user")
    this.titulo = "Mis pedidos"; //cambia el titulo de la pagina
    this.loadUser();  //llama a la funcion para cargar el nombre y apellido del usuario

    const datosDB = {
      "user": this.varUser, //carga la info del usuario que eseta guardada en el localStorage
      "enviado": "2"
    };
    this.http.post('https://localhost/u-coffee/historial.php', //valida que tenga pedidos realizados 
      JSON.stringify(datosDB)).subscribe(async res => {
        this.varHistorial = res
        console.log(this.varHistorial);
        if (this.varHistorial == 0) { //valida que tengo almenos un pedido realizado
          this.hidden(false, false, true, true, false); //muestra un mensaje que no ha realizado pedidos
        } else {
          this.hidden(true, false, true, false, false); // muestra los pedidos realizados
        }
      });
  }

  //funcion de la validacion del log in
  logInValidation() {
    const datosDB = { //se crea un objeto par enviar al PHP
      "correo": this.ndoc, // numero de documento
      "contra": this.contra // contraseña
    };
    this.http.post('https://localhost/u-coffee/ingreso.php', //valida la infomacion con la base de datos
      JSON.stringify(datosDB)).subscribe(async res => {
        console.log(res);
        if (res == '1') { //valida que la informacion ingresada coincida con la de la base de datos
          localStorage.setItem("user", this.ndoc) // se guarda la info del usuarioo en el localStorage
          if ((this.varUser != null) || (this.varUser != "")) { // valida que la informacion del usuario no este vacia
            this.showHystorial() // llama la funcion para mostrar el historial 
            console.log(this.varUser);
            location.reload();
            //this.router.navigate(['/tabs/tab2', this.varUser]); // envia la infoamcion del usuario a la pestaña del menu
          } else { // si varUser esta vacio muestra la pagina de ingreso
            this.hidden(true, true, false, true, true);
            this.titulo = "Ingreso";
          }
        } else { // si la informacion ingresada no coincide muestra un alerta 
          this.alert(
            'Alerta',
            'Error de ingreso',
            'El campo de <strong>Documento</strong> y/o <strong>Contraseña</strong> es incorrecto');
        }
      });
  }

  //Funcion de ingreso 
  async logIn() {
    if ((this.ndoc == "") || (this.contra == "")) { //Valida si los campos estan vacios 
      this.alert('Alerta', 'Campos vacios', 'Debe rellenar todos los campos');
    } else {
      this.logInValidation() //llama la funcion para validar la informacion ingresada
    }
  }
  //Funcion que envia la info del user a la pestaña del menu 
  enviar() {
    this.router.navigate(['/tabs/tab2']);
  }

  //Funcion que valida su hay informacion del usuario guardada
  varUserInfo() {
    if (this.varUser == null || this.varUser == "") {
      this.titulo = "Ingreso";
      this.hidden(true, false, false, true, true);
    } else {
      this.showHystorial()
    }
  }

  //Funcion que carga la informacion del usuario
  loadUser() {
    const datosDB = {
      "mail": this.varUser
    };
    this.http.post('http://localhost/u-coffee/user.php', JSON.stringify(datosDB)).subscribe(async res => {
      this.datos = res;
      console.log(this.datos);
    });
  }

  //funcion para realizar pedido desde el historial
  async add(description, total) {

    const alert_ = await this.alertCtrl.create({ //alert para informar sobre el pedido que se está realizando

      header: 'Confirmación de pedido',
      message: 'Vas a realizar el siguiente pedido:<br><br>' + description + '<br><br><b>Total: $' + total,
      buttons: [
        {
          //se cancela el pedido
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          //se realiza el pedido
          text: 'Pedir',
          handler: () => {

            const datosDB = {
              "ndoc": this.varUser, //datos de lusuario tomados del localStorage
              "desc": description, //descripcion del pedido
              "total": total //total del pedido
            };

            this.http.post(
              'http://localhost/u-coffee/factura.php', //se envian los datos al PHP
              JSON.stringify(datosDB)).subscribe(async res => {
                console.log(res);
                if (res == 1) {
                  //Registro del pedido exitoso
                  this.alert('¡Éxito!', '', 'Tu pedido ha sido registrado, espera la notificación y recógelo')
                  this.router.navigate(['/tabs/tab2']);
                } else {
                  //Registro del pedido sin exito
                  this.alert('Alerta', '', 'Ha ocurrido un error, tu pedido no ha sido registrado. Inténtalo más tarde')
                }
              });

          }
        }
      ]
    })

    await alert_.present();
  }

  //Funcion para cerrar sesion
  async logOut() {

    if ((this.varUser != '') || (this.varUser != null)) {
      const alert = await this.alertCtrl.create({
        header: 'Alerta',
        message: '¿Deseas cerrar la sesión actual?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Si',
            handler: () => {
              localStorage.clear(); //se limpia el localStorage 
              location.reload();
            }
          }
        ]
      });

      await alert.present();
    }
  }

  ngOnInit() {
    this.varUserInfo()
  }

}
