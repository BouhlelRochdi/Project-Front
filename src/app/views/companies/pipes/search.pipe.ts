import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(array: any[], searchText: string): any[] {
    if(searchText != null)
    {
      const text = searchText.toLowerCase();
      return array.filter(item => {
        return item?.name.toLowerCase().includes(text) || item?.description.toLowerCase().includes(text) ||
        item?.email.toLowerCase().includes(text) || item?.role.toLowerCase().includes(text)
      })
    }
    else{
      return array;
    }
  }

}
