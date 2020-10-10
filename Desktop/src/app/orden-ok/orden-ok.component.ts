import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orden-ok',
  templateUrl: './orden-ok.component.html',
  styleUrls: ['./orden-ok.component.css']
})
export class OrdenOkComponent implements OnInit {

  constructor(
    public http: HttpClient,
    public router: Router
  ) { }

  varData: any = ""
  arrayDesc = []

  hideDiv(noInfo:boolean,content:boolean){
    document.getElementById("no-info").hidden = noInfo;
    document.getElementById("content").hidden = content
  }

  logInfo(){
    const datosDB = {
      "table": "factura",
      "pedido": "1"
    }
    this.http.post('http://localhost/u-coffee/cafeteria.php',JSON.stringify(datosDB)).subscribe(data =>{
      console.log(data)
      this.varData = data

      if(this.varData == 0){
        this.hideDiv(false,true);
      } else {
        this.hideDiv(true,false);
      }


    })
  }

  giveOrder(idFactura: any,total:number){
    const datosDB = {
      "pedido" : idFactura,
      "dato" : "2"
    };

    this.http.post('http://localhost/u-coffee/update_factura.php',JSON.stringify(datosDB))
    .subscribe(data =>{
      if(data == 1){
        
        console.log(data)
        this.router.navigate(["/home"]);

        let varTotal : any = localStorage.getItem("dayTotal");
        let addTotal : any = total - (-varTotal);
        localStorage.setItem('dayTotal',addTotal);

        
      } else {
        console.log('Ha ocurrido un error, no se pudo establecer conección con la dase de datos');
      }
      
    });
  }

  ngOnInit() {
    this.logInfo()
  }

}
