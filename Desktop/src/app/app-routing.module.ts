import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { OrdenOkComponent } from './orden-ok/orden-ok.component';
import { PedidoComponent } from './pedido/pedido.component';
import { ProductoComponent } from './producto/producto.component';
import { UpdateProComponent } from './update-pro/update-pro.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'logIn'
  },{
    path: 'logIn',
    component: LogInComponent
  },{
    path : 'home',
    component: HomeComponent
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
  },{
    path : 'users',
    component: UsersComponent
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
