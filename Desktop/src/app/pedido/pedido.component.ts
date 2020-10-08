import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  constructor(
    public actRouter: ActivatedRoute
  ) { }

  varName: any = ""
  varLastname: any = ""
  varDesc: any = ""
  varTotal: any = ""

  ngOnInit() {

    this.varName = this.actRouter.snapshot.paramMap.get('name')
    console.log(this.varName)
    this.varLastname = this.actRouter.snapshot.paramMap.get('lastname')
    console.log(this.varLastname)
    this.varDesc = this.actRouter.snapshot.paramMap.get('desc')
    console.log(this.varDesc)
    this.varTotal = this.actRouter.snapshot.paramMap.get('total')
    console.log(this.varTotal)

  }

}
