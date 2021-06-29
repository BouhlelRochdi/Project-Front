import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(array: any[], searchText: String): unknown {
    if(searchText != null){
      const textField = searchText.toLowerCase();
      return array.filter( item => {
        return item?.name?.toLowerCase().includes(textField) || 
        item?.description?.toLowerCase().includes(textField)
      })
    }else {
      return array;
    }
  }

}
