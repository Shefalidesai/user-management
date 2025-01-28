import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersKey = 'users';

  constructor() { }

  // Get users from local storage
  getUsers(): User[] {
    return JSON.parse(localStorage.getItem(this.usersKey) || '[]');
  }

  // Add a new user to local storage
  addUser(user: User): void {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  // Update user details
  updateUser(updatedUser: User): void {
    const users = this.getUsers();
    const index = users.findIndex(user => user.email === updatedUser.email); // Use unique identifier like email to find user
    if (index !== -1) {
      users[index] = updatedUser; // Replace the existing user with the updated one
      localStorage.setItem(this.usersKey, JSON.stringify(users)); // Save the updated list back to localStorage
    }
  }

  // Delete a user
  deleteUser(email: string): void {
    const users = this.getUsers(); // Get users from local storage
    const index = users.findIndex(user => user.email === email); // Find the user by email
    if (index !== -1) {
      users.splice(index, 1); // Remove the user from the array
      localStorage.setItem(this.usersKey, JSON.stringify(users)); // Update local storage
    }
  }
  
}
