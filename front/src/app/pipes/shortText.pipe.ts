import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'shortText'
})
export class ShortTextPipe implements PipeTransform{
  transform(str: string): any {
    return str.slice(0, 20) + '...'
  }
}
