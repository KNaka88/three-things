import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from './user.service';

@Pipe({
  name: 'confirmWaiting',
  pure: false,
})
export class ConfirmWaitingPipe implements PipeTransform {

  transform(value: any[], args:string[], userId): any[]{
    if(value.length !== 0){
      let result = [];
      value.forEach( (element) => {
        //if $key === friendId && $value === userId
        if(element[1].$value === userId && element[3].$value === false){
          result.push(element);
        }
      });
      return result;
    }
    return value;
  }
}
