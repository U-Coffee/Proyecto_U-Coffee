import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(
    public modal : NgbModal,
    public router : Router
  ){}

  totalDay : any = localStorage.getItem("dayTotal");
  varUser : any = localStorage.getItem("user");
  boolUser : boolean ;

  
  openNav() {
    document.getElementById("mySidebar").style.width = "350px";
    document.getElementById("main").style.marginLeft = "350px";
  }
  
  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

  getVarUser(){
    if((this.varUser != "") || (this.varUser != null)){
      this.boolUser == true;
    } else {
      this.boolUser == false;
    }
  }

  logOut(){
    
    localStorage.removeItem('user');
    this.router.navigate(["/logIn"]);
    
  }

  openModal(content){ 
    this.modal.open(content)
  }

  clearArqueo(){
    localStorage.setItem('dayTotal','0');
    location.reload();
  }

  ngOnInit(){
    this.getVarUser();
  }

}
