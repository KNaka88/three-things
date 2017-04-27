import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys',
  pure: false
})
export class KeysPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let keys = [];

    //extract key from object
    for (let key in value) {
      keys.push(key);
    }
    return keys;
  }
}
