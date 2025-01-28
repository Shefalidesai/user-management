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
    const index = users.findIndex(user => user.email === updatedUser.email); // Identify the user by email
    if (index !== -1) {
      users[index] = updatedUser; // Replace the old user data with the updated user
      localStorage.setItem(this.storageKey, JSON.stringify(users)); // Update the data in localStorage
    }
  }
  

  deleteUser(userId: number): void {
    const users = this.getUsers().filter((user) => user.id !== userId);
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }
}
