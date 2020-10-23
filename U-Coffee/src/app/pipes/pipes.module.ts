import { NgModule } from '@angular/core';
import { SearchbarPipe } from './searchbar.pipe';
import { ReplaceTextPipe } from './replace-text.pipe';



@NgModule({
  declarations: [SearchbarPipe, ReplaceTextPipe],
  exports: [SearchbarPipe, ReplaceTextPipe]
})
export class PipesModule { }
