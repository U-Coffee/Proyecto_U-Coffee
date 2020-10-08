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

  ngOnInit(): void {

    this.varName = this.actRouter.snapshot.paramMap.get('name')
    this.varLastname = this.actRouter.snapshot.paramMap.get('lastname')
    this.varDesc = this.actRouter.snapshot.paramMap.get('desc')
    this.varTotal = this.actRouter.snapshot.paramMap.get('total')

  }

}
