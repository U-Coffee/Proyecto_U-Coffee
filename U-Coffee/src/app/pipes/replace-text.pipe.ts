import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceText'
})
export class ReplaceTextPipe implements PipeTransform {

  transform(value: any): any {
    if(!value){
      return ""
    }

    return value.replace(',',' | ')

  }

}
