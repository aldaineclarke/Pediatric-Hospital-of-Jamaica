import { Pipe, PipeTransform } from '@angular/core';
import { Doctor } from '../Interfaces/doctor';

@Pipe({
  name: 'filterDepartment'
})
export class FilterDepartmentPipe implements PipeTransform {

  transform(value: Doctor[], arg:string): Doctor[] {

    return value.filter((elem)=>{
      return elem.department.toLowerCase() == arg.toLowerCase();
    })
  }


}
