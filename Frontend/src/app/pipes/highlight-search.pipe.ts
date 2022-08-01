import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightSearch',
})
export class HighlightSearchPipe implements PipeTransform {
  transform(value: any, args: any): any {
    if (!args) {
      return value;
    }
    const regex = new RegExp(args, 'gi');
    const match = value.match(regex);

    if (!match) {
      return value;
    }
    return value.replace(regex, `<span class='highlight'>${match[0]}</span>`);
  }
}