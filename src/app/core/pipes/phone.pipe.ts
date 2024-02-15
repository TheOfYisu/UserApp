import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneformat',
})
export class PhoneFormartPipe implements PipeTransform {
  transform(phone: number, countryCode: string): string {
    const value = phone.toString();
    if (!value || value.length === 0) {
      return value;
    }

    switch (countryCode) {
      case 'CO':
        return `+57 (${value.substring(0, 3)}) ${value.substring(
          3,
          6
        )} ${value.substring(6, 10)}`;
      default:
        return value;
    }
  }
}
