import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sentRequests',
  pure: false
})
export class SentRequestsPipe implements PipeTransform {

  transform(value: any[], args:string[], userId): any[]{

    if(value.length !== 0){
      let result = [];
      value.forEach( (element) => {

        //if $key === sender_id && $value === userId
        if(element[4].$value === userId){
          result.push(element);
        }
      });
      return result;
    }
  }
}
