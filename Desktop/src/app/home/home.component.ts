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

  logInfo(){
    const datosDB = {
      "table": "factura"
    }
    this.http.post('http://localhost/u-coffee/cafeteria.php',JSON.stringify(datosDB)).subscribe(data =>{
      console.log(data)
      this.varData = data
    })
  }

  sendInfo(name: string, lastname: string, description: string, total:number){
    this.router.navigate(['/pedido',name,lastname,description,total]);
  }

  ngOnInit() {
    this.logInfo()
  }

}
