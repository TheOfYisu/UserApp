import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserInterface } from '../../core/interfaces/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  @Input() user: UserInterface = {} as UserInterface;

  @Output() emitDeleteUser: EventEmitter<UserInterface> =
    new EventEmitter<UserInterface>();

  @Output() emitEditUser: EventEmitter<UserInterface> =
    new EventEmitter<UserInterface>();

  deleteUser(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Desea eliminar este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, estoy seguro!',
      position: 'top-end',
      toast: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.emitDeleteUser.emit(this.user);
      }
    });
  }

  editUser(): void {
    this.emitEditUser.emit(this.user);
  }
}
