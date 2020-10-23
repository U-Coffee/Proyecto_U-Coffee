import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ArqueoComponent } from './arqueo/arqueo.component';
import { HomeComponent } from './home/home.component';
import { OrdenOkComponent } from './orden-ok/orden-ok.component';
import { PedidoComponent } from './pedido/pedido.component';
import { ProductoComponent } from './producto/producto.component';
import { UpdateProComponent } from './update-pro/update-pro.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },{
    path : 'home',
    component: HomeComponent
  },{
    path : 'arqueo',
    component: ArqueoComponent
  },{
    path : 'pedido/:name/:lastname/:desc/:total/:id',
    component: PedidoComponent
  },{
    path : 'producto',
    component: ProductoComponent
  },{
    path : 'orden-ok',
    component: OrdenOkComponent
  },{
    path : 'updatePro/:id',
    component: UpdateProComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      preloadingStrategy: PreloadAllModules
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
