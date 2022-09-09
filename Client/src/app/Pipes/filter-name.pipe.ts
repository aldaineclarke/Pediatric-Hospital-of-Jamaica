import { Pipe, PipeTransform } from '@angular/core';
import { Doctor } from '../Interfaces/doctor';

@Pipe({
  name: 'filterName'
})
export class FilterNamePipe implements PipeTransform {

  transform(value:Doctor[], name:string):Doctor[]{
    console.log(name)
      if(!name) return value;
      name = name.toLowerCase();
      return value.filter((doctor)=>{
        return doctor.fname.toLowerCase().includes(name) || doctor.lname.toLowerCase().includes(name) || doctor.department.toLowerCase().includes(name)
      })
  }

}
