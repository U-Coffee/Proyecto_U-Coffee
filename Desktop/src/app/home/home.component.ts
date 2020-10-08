import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor (
    private http : HttpClient
  )
  {}

  varData: any = ""

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
    
  }

  title = 'y';

  ngOnInit() {
    this.logInfo()
  }

}
