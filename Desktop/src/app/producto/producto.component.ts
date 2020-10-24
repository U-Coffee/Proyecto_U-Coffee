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

  adminUser: any = ""
  adminPass: any = ""

  getInfo() {
    const datosDB = {
      "table": "product"
    };
    this.http.post('http://localhost/u-coffee/mostrar_pro.php', JSON.stringify(datosDB)).subscribe(res => {

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

  cerrar(id: any){
    document.getElementById(id).style.display = 'none'
  }

  deletePro() {
    if((this.adminPass == "admin") && (this.adminUser == "admin")){
      document.getElementById('ok').style.display = 'block';
      setTimeout(() => document.getElementById('ok').style.display = 'none',3000);
      this.modalService.dismissAll();

      this.adminPass = "";
      this.adminUser = "";

      const datosDB = {
        "id" : this.idPro
      }

      this.http.post('http://localhost/u-coffee/delete_pro.php',JSON.stringify(datosDB)).subscribe(res =>{
        console.log(res)
        if(res == 1){
          document.getElementById('ok').style.display = 'block';
          setTimeout(() => document.getElementById('ok').style.display = 'none',3000);
          this.modalService.dismissAll();

          location.reload();
        }else{
          document.getElementById('error').style.display = 'block';
          setTimeout(() => document.getElementById('error').style.display = 'none',3000);

          this.adminPass = "";
          this.adminUser = "";
        }
      })

    } else {
      document.getElementById('error').style.display = 'block';
      setTimeout(() => document.getElementById('error').style.display = 'none',3000);

      this.adminPass = "";
      this.adminUser = "";

    }
  }

  ngOnInit() {
    this.getInfo();
    document.getElementById('ok').style.display = 'none';
  }

}