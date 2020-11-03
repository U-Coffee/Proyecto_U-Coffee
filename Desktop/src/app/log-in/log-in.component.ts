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

  logIn() {
    const datosDB = {
      "user": this.user,
      "contra": this.contra
    };

    this.http.post('http://localhost/u-coffee/ingreso_coffee.php', JSON.stringify(datosDB)).subscribe(async res => {
      console.log(res);

      if (res == '1') {
        localStorage.setItem('user', this.user);
        this.router.navigate(["/home"]);
      } else {
        this.alertMessage = "Usuario y/o Contraseña incorrecto(s)"
        document.getElementById('ok').style.display = 'block';
        setTimeout(() => document.getElementById('ok').style.display = 'none', 3000)
      }
    });
  }

  cerrar(id:any) {

  }

  ngOnInit() {

    document.getElementById('ok').style.display = 'none';

  }

}
