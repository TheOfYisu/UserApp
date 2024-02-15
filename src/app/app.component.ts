import { Component } from '@angular/core';
import { UserInterface } from './core/interfaces/user';
import Swal from 'sweetalert2';
import { UsersService } from './core/services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private usersService: UsersService) {
    this.getUsers();
  }

  title = 'UserApp';
  user: UserInterface = {} as UserInterface;
  create: boolean = true;

  users: UserInterface[] = [];
  copyUsers: UserInterface[] = [];

  getUsers() {
    this.usersService.list_user$.subscribe((users) => {
      this.users = users;
    });
  }

  createUser(user: UserInterface): void {
    user.id = this.users.length + 1;
    this.create = true;
    this.usersService.createUser(user);
    this.alertConfirm('creado');
  }

  deleteUser(user: UserInterface) {
    this.usersService.deleteUser(user);
    this.alertConfirm('eliminado');
  }

  getUser(user: UserInterface) {
    this.user = user;
    this.create = false;
  }

  upgradeUser(user: UserInterface) {
    this.create = true;
    this.usersService.upgradeUser(user);
  }

  alertConfirm(status: string) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'El usuario ha sido ' + status + ' correctamente.',
      showConfirmButton: false,
      timer: 1500,
      toast: true,
    });
  }

  searchContact(term: string) {
    if (term === '') {
      this.getUsers();
    } else {
      this.users = this.users.filter((user) => {
        return user.name.toLowerCase().includes(term.toLowerCase());
      });
    }
  }

  newUser(create: boolean) {
    this.create = create;
  }
}
