import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserInterface } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private list_user = new BehaviorSubject<UserInterface[]>([]);
  list_user$ = this.list_user.asObservable();

  constructor() {
    this.list_user.next([
      {
        id: 1,
        name: 'Daniel Mejia',
        profession: 'Web Developer',
        phone: 1234567890,
        email: 'daniel.mejia@gmail.com',
        photo:
          'https://th.bing.com/th/id/OIP.3hckg2BT4mldMAuuo6TUrQHaHa?rs=1&pid=ImgDetMain',
      },
      {
        id: 2,
        name: 'Nate Gentile',
        profession: 'YouTuber',
        phone: 1234567890,
        email: 'nate.gentile@hmail.com',
        photo:
          'https://th.bing.com/th/id/OIP.uNNgz296X-A0gXryzIIzBAAAAA?rs=1&pid=ImgDetMain',
      },
      {
        id: 3,
        name: 'Ivan Doe',
        profession: 'Web Developer',
        phone: 1234567890,
        email: 'ivan.doe@hmail.com',
        photo:
          'https://th.bing.com/th/id/OIP.iHy6FdJDG_RdtHWXG9yM7wHaHa?rs=1&pid=ImgDetMain',
      },
      {
        id: 4,
        name: 'Hector Mundo',
        profession: 'Web Designer',
        phone: 1234567890,
        email: 'hector.mundo@hmail.com',
        photo:
          'https://th.bing.com/th/id/OIP.4XgO9RbVOlZkJ9_a90Db9AHaHa?rs=1&pid=ImgDetMain',
      },
      {
        id: 5,
        name: 'John Doe',
        profession: 'Web Developer',
        phone: 1234567890,
        email: 'johndoe@hmail.com',
        photo:
          'https://th.bing.com/th/id/OIP.rIsI3TvodysyTi_2VOGK3gHaHa?rs=1&pid=ImgDetMain',
      },
    ]);
  }

  createUser(users: UserInterface): void {
    this.list_user.next([...this.list_user.getValue(), users]);
  }

  deleteUser(user: UserInterface) {
    this.list_user.next(
      this.list_user.getValue().filter((h) => h.id !== user.id)
    );
  }

  upgradeUser(user: UserInterface) {
    this.list_user.next(
      this.list_user.getValue().map((h) => (h.id === user.id ? user : h))
    );
  }
}
