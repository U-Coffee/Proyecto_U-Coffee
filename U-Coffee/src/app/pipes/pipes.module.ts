import { NgModule } from '@angular/core';
import { SearchbarPipe } from './searchbar.pipe';



@NgModule({
  declarations: [SearchbarPipe],
  exports: [SearchbarPipe]
})
export class PipesModule { }
