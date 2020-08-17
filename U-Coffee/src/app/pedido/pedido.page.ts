import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {

  constructor(
    public actRouter : ActivatedRoute,
    public http : HttpClient,
    public alertCtrl : AlertController
  ) { }
    varCod: any = "";
    varPre: any ="";
    varTotal : any = "";
    arrayCod = [];
    arrayPre = [];
    datosPro: any;
    datos = [];
    suma:any = 0;
    index: any;

    inicio(){
      this.arrayCod = this.varCod.split(",");
      console.log(this.arrayCod);
      this.arrayPre = this.varPre.split(",");
      console.log(this.arrayPre);
      this.suma=this.arrayPre.reduce((a,b) => a - (-b) , 0);
      console.log(this.suma);
    }

    async borrar(elemento){
      this.index = this.arrayCod.indexOf(elemento);

      this.arrayCod.splice(this.index,1);
      this.arrayPre.splice(this.index,1);
      this.suma=this.arrayPre.reduce((a,b) => a - (-b) , 0);

      const alert = await this.alertCtrl.create({
        header: 'Alerta',
        message: 'Has borrado '+elemento+' de tu pedido',
        buttons: ['OK']
      });

      await alert.present();
    }

    /*async pedirDatos(){
      this.arrayCod.forEach(element => {
        const datosDB = {
          "codigo" : element
        }
        this.http.post('http://localhost/u-coffee/buscar_pro.php',JSON.stringify(datosDB)).subscribe(async res =>{
          this.datosPro = res;
          this.datos.concat(this.datosPro)
          console.log(this.datos);
        });
      });
    }*/


  ngOnInit() {
    this.varCod = this.actRouter.snapshot.paramMap.get('codigo');
    console.log(this.varCod);
    this.varPre = this.actRouter.snapshot.paramMap.get('precio');
    console.log(this.varPre);
    this.varTotal = this.actRouter.snapshot.paramMap.get('total');
    console.log(this.varTotal);
    this.inicio();
    //this.pedirDatos();
  }

}
