import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-pro',
  templateUrl: './update-pro.component.html',
  styleUrls: ['./update-pro.component.css']
})
export class UpdateProComponent implements OnInit {

  constructor(
    public http: HttpClient,
    public actRouter: ActivatedRoute,
    public router: Router
  ) { }

  idPro: any = "";
  infoPro: any;

  proNombre = "";
  proValor = "";
  proImg = "";

  update(columna: any, dato: any) {
    const datosDB = {
      "columna": columna,
      "dato": dato,
      "id": this.idPro
    };
    this.http.post('https://u-coffee.000webhostapp.com/update_pro.php',JSON.stringify(datosDB)).subscribe(res =>{
      console.log(res)

      this.router.navigate(['/producto'])
    })
  }

  getInfoPro() {
    const datosDB = {
      "codigo": this.idPro
    }

    this.http.post('https://u-coffee.000webhostapp.com/buscar_pro.php', JSON.stringify(datosDB)).subscribe(res => {
      console.log(res);
      this.infoPro = res;
    });
  }

  updateName() {
    if(this.proNombre != ""){
      this.update("nombre",this.proNombre);
    }else{
      console.log("campo vacio")
    }
  }

  updatePrice() {
    if(this.proValor != ""){
      this.update("valor",this.proValor);
    }else{
      console.log("campo vacio")
    }
  }

  updateImg() {
    if(this.proImg != ""){
      this.update("img",this.proImg);
    }else{
      console.log("campo vacio")
    }
  }

  ngOnInit() {

    this.idPro = this.actRouter.snapshot.paramMap.get('id');
    console.log(this.idPro);
    this.getInfoPro()
  }

}
