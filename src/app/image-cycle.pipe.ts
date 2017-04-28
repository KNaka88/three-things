import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageCycle',
  pure: true,
})
export class ImageCyclePipe implements PipeTransform {

  transform(number: any, args?: any): any {
    let inputNumber = parseInt(number);

    if(inputNumber >= 7){
      let numberCycle = Math.floor(inputNumber/7);
      inputNumber = inputNumber - (7 * numberCycle);
      console.log(inputNumber);
    }
    return String(inputNumber);
  }
}
