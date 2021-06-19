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
        return item?.name?.toLowerCase().includes(text) ||
        item?.eventType?.toLowerCase().includes(text) ||
        item?.location?.toLowerCase().includes(text) || 
        item?.availableTicketNumber?.toString().includes(text) ||
        item?.price?.toLowerCase().includes(text)
      })
    }
    else{
      return array;
    }
  }

}
