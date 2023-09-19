import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(productName: any[], searchKey:string, propName: string ):any[] {
    const result:any[]=[]
    if (!productName ||propName=="" || searchKey=="") {
      return productName
      
    }
    productName.forEach((item:any)=>{
      if(item[propName].trim().toLowerCase().includes(searchKey.trim().toLowerCase())){
        result.push(item)
      }
    })
    return result;
  }

}
