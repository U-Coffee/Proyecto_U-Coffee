import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ArqueoComponent } from './arqueo/arqueo.component';
import { HomeComponent } from './home/home.component';
import { PedidoComponent } from './pedido/pedido.component';
import { ProductoComponent } from './producto/producto.component';

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
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      preloadingStrategy: PreloadAllModules
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
