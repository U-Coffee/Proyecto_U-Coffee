import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  constructor(
    public http: HttpClient,
    public router: Router,
    public modalService: NgbModal,
    public alertConf: NgbAlertConfig
  ) {
    alertConf.dismissible = true
  }

  info: any = "";
  idPro: any = "";
  nombrePro: any = "";
  valorPro: any = "";
  imgPro: any = "";

  adminUser: any = "";
  adminPass: any = "";

  alertMessage: string = "";

  newName: any = "";
  newPrice: any = "";
  newImg: any = "";


  getInfo() {
    const datosDB = {
      "table": "product"
    };
    this.http.post('https://u-coffee.000webhostapp.com/mostrar_pro.php', JSON.stringify(datosDB)).subscribe(res => {

      this.info = res;
      console.log(this.info);
    });
  }

  updatePro(id: any) {
    this.router.navigate(['/updatePro', id])
  }

  openModal(id: any, nombre: any, valor: any, img: any, content) {
    this.modalService.open(content);
    this.idPro = id;
    this.nombrePro = nombre;
    this.valorPro = valor;
    this.imgPro = img;

    document.getElementById('error').style.display = 'none';
  }

  cerrar(id: any) {
    document.getElementById(id).style.display = 'none'
  }

  deletePro() {
    if ((this.adminPass == "admin") && (this.adminUser == "admin")) {
      // document.getElementById('ok').style.display = 'block';
      // setTimeout(() => document.getElementById('ok').style.display = 'none',3000);
      // this.modalService.dismissAll();

      this.adminPass = "";
      this.adminUser = "";

      const datosDB = {
        "id": this.idPro
      }

      this.http.post('https://u-coffee.000webhostapp.com/delete_pro.php', JSON.stringify(datosDB)).subscribe(res => {
        console.log(res)
        if (res == 1) {
          this.alertMessage = "Producto eliminado correctamente"
          document.getElementById('ok').style.display = 'block';
          setTimeout(() => document.getElementById('ok').style.display = 'none', 3000);
          this.modalService.dismissAll();

          location.reload();
        } else {
          this.alertMessage = "Ha ocurrido un error, intente más tarde"
          document.getElementById('error').style.display = 'block';
          setTimeout(() => document.getElementById('error').style.display = 'none', 3000);

          this.adminPass = "";
          this.adminUser = "";
        }
      })

    } else {
      this.alertMessage = "Usuario y/o Contraseña incorrecto";
      document.getElementById('error').style.display = 'block';
      setTimeout(() => document.getElementById('error').style.display = 'none', 3000);

      this.adminPass = "";
      this.adminUser = "";

    }
  }

  addPro(content: any) {
    this.modalService.open(content);
    document.getElementById('error').style.display = 'none';
  }

  newProduct() {
    if (
      (this.newName != "") &&
      (this.newPrice != "") &&
      (this.newImg != "")
    ) {
      const datosDB = {
        "nombre": this.newName,
        "valor": this.newPrice,
        "img": this.newImg
      };

      this.http.post('https://u-coffee.000webhostapp.com/new_pro.php', JSON.stringify(datosDB)).subscribe(res => {
        if (res == 1) {
          location.reload();
          this.alertMessage = "Producto agregado correctamente"
          document.getElementById('ok').style.display = 'block';
          setTimeout(() => document.getElementById('ok').style.display = 'none', 3000);
          this.modalService.dismissAll();

          this.newName = "";
          this.newPrice = "";
          this.newImg = "";

          
        } else {
          this.alertMessage = "Ha ocurrido un error, intente más tarde";
          document.getElementById('error').style.display = 'block';
          setTimeout(() => document.getElementById('error').style.display = 'none', 3000);

          this.newName = "";
          this.newPrice = "";
          this.newImg = "";
        }
      });
    } else {
      this.alertMessage = "Hay algún campo vacio, todos deben ser llenados";
      document.getElementById('error').style.display = 'block';
      setTimeout(() => document.getElementById('error').style.display = 'none', 3000);
    }
  }

  ngOnInit() {
    this.getInfo();
    document.getElementById('ok').style.display = 'none';
  }

}