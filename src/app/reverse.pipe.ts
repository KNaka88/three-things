import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse',
  pure: false,
})
export class ReversePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let output = value;
    if(value === ""){
      return value;
    }else if(value){
      return value.slice().reverse();
    }
  }
}
