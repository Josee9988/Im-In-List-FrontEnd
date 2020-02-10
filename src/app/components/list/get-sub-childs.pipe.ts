import { Pipe, PipeTransform } from '@angular/core';
import { IListElements } from 'src/app/shared/models/IListElements.interface';

@Pipe({
  name: 'getSubChilds'
})
export class GetSubChildsPipe implements PipeTransform {

  transform(value: Array<number>, elementos: IListElements) {
    const arrayFiltered = [];
    value.forEach(val => {
      arrayFiltered.push(elementos.filter(elemento => elemento.order === Number(val)));
    });
    return arrayFiltered;


  }

}
