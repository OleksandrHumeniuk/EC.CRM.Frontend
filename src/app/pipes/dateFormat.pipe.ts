import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(value: Date | undefined): string {

    if (!value) return '';

    const date = new Date(value);

    const day = this.padZero(date.getDate());
    const month = this.padZero(date.getMonth() + 1);
    const year = date.getFullYear().toString();

    return `${day}.${month}.${year}`;
  }

  private padZero(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }
}
