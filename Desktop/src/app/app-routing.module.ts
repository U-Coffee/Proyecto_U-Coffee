import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArqueoComponent } from './arqueo/arqueo.component';
import { HomeComponent } from './home/home.component';
import { PedidoComponent } from './pedido/pedido.component';
import { ProductoComponent } from './producto/producto.component';

const routes: Routes = [
  {path : '', component: HomeComponent},
  {path : 'arqueo', component: ArqueoComponent},
  {path : 'pedido/:name/:lastname/:desc/:total', component: PedidoComponent},
  {path : 'producto', component: ProductoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
