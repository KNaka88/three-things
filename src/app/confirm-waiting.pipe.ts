import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from './user.service';

@Pipe({
  name: 'confirmWaiting',
  pure: false,
})
export class ConfirmWaitingPipe implements PipeTransform {

  transform(value: any[], args:string[], userId): any[]{
    console.log("beginning");
    console.log(value);
    if(value.length !== 0){
      let result = [];
      value.forEach( (element) => {
        //if $key === friendId && $value === userId
        if(element[1].$value === userId && element[3].$value === false){
          result.push(element);
        }
      });
      console.log("result");
      console.log(result);
      return result;
    }
    console.log("nothing");
    console.log(value);
    return value;
  }
}
