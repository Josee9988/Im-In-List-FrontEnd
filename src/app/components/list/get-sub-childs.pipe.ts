import { Pipe, PipeTransform } from '@angular/core';
import { IListElements } from 'src/app/shared/models/IListElements.interface';

@Pipe({
  name: 'getSubChilds'
})
export class GetSubChildsPipe implements PipeTransform {

  transform(value: number, elementos: IListElements): any {
    console.log(elementos);
    console.log();
    console.log(value);




  }

}
