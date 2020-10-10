import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  constructor(
    public actRouter: ActivatedRoute,
    public http : HttpClient,
    public router : Router
  ) { }

  varName: any = ""
  varLastname: any = ""
  varDesc: any = ""
  varTotal: any = ""
  arrayDesc = [];
  varId = ''

  //funcion para confirmar el pedido
  orderOk(idFactura){
    
    const datosDB = {
      "pedido" : idFactura,
      "dato": "1"
    };

    this.http.post('http://localhost/u-coffee/update_factura.php',JSON.stringify(datosDB))
    .subscribe(data =>{
      if(data == 1){
        
        console.log(data)
        this.router.navigate(["/home"]);

        
      } else {
        console.log('Ha ocurrido un error, no se pudo establecer conección con la dase de datos');
      }
      
    });

  }


  ngOnInit() {

    this.varName = this.actRouter.snapshot.paramMap.get('name')
    console.log(this.varName)
    this.varLastname = this.actRouter.snapshot.paramMap.get('lastname')
    console.log(this.varLastname)
    this.varDesc = this.actRouter.snapshot.paramMap.get('desc')
    this.varTotal = this.actRouter.snapshot.paramMap.get('total')
    console.log(this.varTotal)
    this.varId = this.actRouter.snapshot.paramMap.get('id');
    console.log(this.varId)

    this.arrayDesc = this.varDesc.split(',')

  }

}
