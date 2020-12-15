import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbAlertConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title: any;

  constructor(
    public modal: NgbModal,
    public router: Router,
    public http: HttpClient,
    public alertCtrl: NgbAlertConfig
  ) {
    alertCtrl.dismissible = true;
  }

  totalDay: any = "";
  varUser: any = "";
  info: any;
  user_user: string = "";
  user_name: string = "";
  adminUser: any = "";
  adminPass: any = "";
  alertMessage: string = "";

  userName: string = "";
  userUser: string = "";
  userPass: string = "";
  userConfPass: string = "";


  openNav(log_In) {
    this.varUser = localStorage.getItem("user");

    if ((this.varUser == "") || (this.varUser == null)) {
      console.log("Inicie sesión");
      this.modal.open(log_In);
    } else {
      document.getElementById("mySidebar").style.width = "350px";
      document.getElementById("main").style.marginLeft = "350px";
    }
  }

  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

  logOut() {

    localStorage.removeItem('user');
    this.router.navigate(["/logIn"]);

    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";


  }

  openModal(content) {
    this.totalDay = localStorage.getItem("dayTotal");
    this.modal.open(content)
  }

  clearArqueo() {
    localStorage.setItem('dayTotal', '0');
    this.router.navigate(["/home"]);
    this.modal.dismissAll();
  }


  getUsers() {
    const datosDB = {
      "table": "coffee_user",
      "order": "user"
    };
    this.http.post('https://u-coffee.000webhostapp.com/php/mostrar_pro.php', JSON.stringify(datosDB)).subscribe(res => {

      this.info = res;
      console.log(this.info);
    });
  }

  showAlertError(message) {
    this.alertMessage = message;
    document.getElementById('error').style.display = 'block';
    setTimeout(() => document.getElementById('error').style.display = 'none', 3000);
  }

  deleteUser() {
    if ((this.adminPass == "admin") && (this.adminUser == "admin")) {
      this.adminPass = "";
      this.adminUser = "";

      const datosDB = {
        "id": this.user_user,
        "table": "coffee_user",
        "columna": "user"
      }

      this.http.post('https://u-coffee.000webhostapp.com/php/delete_pro.php', JSON.stringify(datosDB)).subscribe(res => {
        console.log(res)
        if (res == 1) {
          // this.alertMessage = "Usuario eliminado correctamente";
          // document.getElementById('error').style.display = 'block';
          // setTimeout(() => document.getElementById('error').style.display = 'none', 3000);
          document.getElementById("infoUser").hidden = true;
          this.showAlertError("Usuario eliminado Correctamente");

        } else {
          // this.alertMessage = "Ha ocurrido un error, intente más tarde"
          // document.getElementById('error').style.display = 'block';
          // setTimeout(() => document.getElementById('error').style.display = 'none', 3000);
          this.showAlertError("Ha ocurrido un error, intente más tarde");

          this.adminPass = "";
          this.adminUser = "";
        }
      });
    } else {
      // this.alertMessage = "Usuario y/o Contraseña incorrecto";
      // document.getElementById('error').style.display = 'block';
      // setTimeout(() => document.getElementById('error').style.display = 'none', 3000);

      this.showAlertError("Usuario y/o Contraseña incorrecto");

      this.adminPass = "";
      this.adminUser = "";
    }
  }

  showForm() {
    document.getElementById("addUser").hidden = false;
    document.getElementById("infoUser").hidden = true;
  }

  addUser() {

    if (
      (this.userName == "") ||
      (this.userUser == "") ||
      (this.userPass == "") ||
      (this.userConfPass == "") ||
      (this.adminUser == "") ||
      (this.adminPass == "")
    ) {
      this.showAlertError("Debe llenar todos los campos para ");
    } else if (this.userPass != this.userConfPass) {
      this.showAlertError("Los campos de contraseñas no coinciden");
    } else {
      if ((this.adminPass == "admin") && (this.adminUser == "admin")) {

        const datosDB = {
          "name": this.userName,
          "user": this.userUser,
          "pass": this.userPass
        };
        this.http.post('https://u-coffee.000webhostapp.com/php/new_coffee-user.php', JSON.stringify(datosDB)).subscribe(res => {

          console.log(res)
          if (res == 1) {
            document.getElementById("addUser").hidden = true;
            this.showAlertError("Usuario registrado exitosamente");
            this.userName = ""
            this.userUser = ""
            this.userPass = ""
            this.userConfPass = ""
            this.adminUser = ""
            this.adminPass = ""

          } else {
            this.showAlertError("Ha ocurrido un error, inténtelo más tarde");

          }

        });
      } else {
        this.showAlertError("El usuario y/o contraseña administrativas son incorrectas");
      }
    }

  }


  cerrar() {
    document.getElementById('error').style.display = "none";
  }

  selectUser(user: string, name: string) {

    this.user_name = name;
    this.user_user = user;

    document.getElementById("infoUser").hidden = false;
    document.getElementById("addUser").hidden = true;

  }

  ngOnInit() {
  }

}
