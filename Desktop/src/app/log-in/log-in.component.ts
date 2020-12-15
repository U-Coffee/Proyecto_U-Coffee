import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  user = "";
  contra = "";

  alertMessage = "";

  constructor(
    public http: HttpClient,
    public router: Router,
    public alertConf: NgbAlertConfig
  ) {
    alertConf.dismissible = true;
  }

  showAlert(message: string) {
    this.alertMessage = message;
    document.getElementById('ok').style.display = 'block';
    setTimeout(() => document.getElementById('ok').style.display = 'none', 3000)
  }

  validarUser(){
    const datosDB = {
      "user": this.user,
      "contra": this.contra
    };

    this.http.post('https://u-coffee.000webhostapp.com/php/ingreso_coffee.php', JSON.stringify(datosDB)).subscribe(async res => {
      console.log(res);

      if (res == '1') {
        localStorage.setItem('user', this.user);
        this.router.navigate(["/home"]);
      } else {
        this.showAlert("Usuario y/o Contraseña incorrecto(s)");
      }
    });
  }

  logIn() {
    if ((this.user == "") || (this.contra == "")) {
      this.showAlert("Debe llenar los campos para ingresar al sistema");
    } else {
      this.validarUser()
    }

  }

  cerrar(id: any) {
    document.getElementById(id).style.display = 'none';
  }

  ngOnInit() {

    document.getElementById('ok').style.display = 'none';

  }

}
