import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Output() emitSearchContact: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() emitNewUser: EventEmitter<boolean> = new EventEmitter<boolean>();

  searchContact(event: Event): void {
    if (event) {
      const inputValue = (event.target as HTMLInputElement).value;
      this.emitSearchContact.emit(inputValue);
    }
  }

  newUser(): void {
    this.emitNewUser.emit(true);
  }
}
