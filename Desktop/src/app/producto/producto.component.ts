import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap'


@Component({
  selector: 'ngbd-modal-confirm-autofocus',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Profile deletion</h4>
    <button type="button" class="close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>Are you sure you want to delete <span class="text-primary">"John Doe"</span> profile?</strong></p>
    <p>All information associated to this user profile will be permanently deleted.
    <span class="text-danger">This operation can not be undone.</span>
    </p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
    <button type="button" ngbAutofocus class="btn btn-danger" (click)="modal.close('Ok click')">Ok</button>
  </div>
  `,
  styleUrls: ['./producto.component.css']
})
export class NgbdModalConfirmAutofocus {
  constructor(public modal: NgbActiveModal) {}
}

const MODALS: {[name: string]: any} = {
  autofocus: NgbdModalConfirmAutofocus
};

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  constructor(
    public http : HttpClient,
    public router : Router,
    private modalService : NgbModal
  ) { }

  info: any;
  
  getInfo(){
    const datosDB = {
    "table": "product"
  };
    this.http.post('http://localhost/u-coffee/mostrar_pro.php', JSON.stringify(datosDB)).subscribe(res => {

      this.info = res;
      console.log(this.info);
    });
  }

  updatePro(id: any){
    this.router.navigate(['/updatePro',id])
  }

  

  deletePro(id:any){
    this.modalService.open(MODALS['autofocus'])
  }

  ngOnInit() {
    this.getInfo()
  }

}
