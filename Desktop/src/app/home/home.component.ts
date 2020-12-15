import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor (
    private http : HttpClient,
    private router : Router
  )
  {}

  varData: any = ""
  arrayDesc = []

  hideDiv(noInfo:boolean,content:boolean){
    document.getElementById("no-info").hidden = noInfo;
    document.getElementById("content").hidden = content;
  }

  logInfo(){
    const datosDB = {
      "table": "factura",
      "pedido": "0"
    }
    this.http.post('https://u-coffee.000webhostapp.com/php/cafeteria.php',JSON.stringify(datosDB)).subscribe(data =>{
      console.log(data)
      this.varData = data

      if(this.varData == 0){
        this.hideDiv(false,true);
      } else {
        this.hideDiv(true,false);
      }

    })
  }

  sendInfo(name: string, lastname: string, description: string, total:number,id: number){
    this.router.navigate(['/pedido',name,lastname,description,total,id]);
  }

  ngOnInit() {
    this.logInfo()
  }

}
