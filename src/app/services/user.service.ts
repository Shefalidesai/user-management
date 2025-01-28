import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private storageKey = 'users';

  constructor() {
    if (!localStorage.getItem(this.storageKey)) {
      const initialUsers: User[] = [];
      localStorage.setItem(this.storageKey, JSON.stringify(initialUsers));
    }
  }

  getUsers(): User[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  addUser(user: User): void {
    const users = this.getUsers();
    user.id = Date.now();
    users.push(user);
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  updateUser(updatedUser: User): void {
    const users = this.getUsers();
    const index = users.findIndex((user) => user.id === updatedUser.id);
    if (index !== -1) {
      users[index] = updatedUser;
      localStorage.setItem(this.storageKey, JSON.stringify(users));
    }
  }

  deleteUser(userId: number): void {
    const users = this.getUsers().filter((user) => user.id !== userId);
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }
}
