import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  openNav() {
    document.getElementById("mySidebar").style.width = "350px";
    document.getElementById("main").style.marginLeft = "350px";
    console.log("menu abierto")
  }
  
  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

}
