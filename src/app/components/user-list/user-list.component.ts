import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { AddUserDialogComponent } from 'src/app/add-user-dialog/add-user-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements AfterViewInit {

  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource(); // Using MatTableDataSource to manage sorting and pagination
  searchTerm = ''; // Search term for filtering

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngAfterViewInit(): void {
    // Get users and set dataSource
    this.dataSource.data = this.userService.getUsers();
    this.dataSource.paginator = this.paginator;  // Attach paginator
    this.dataSource.sort = this.sort;  // Attach sorting

    // Apply initial search if necessary
    this.applySearch();
  }

  // Open the dialog for adding or editing a user
  openDialog(user?: User): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '80%',
      maxWidth: '600px',
      data: user // Pass user data if editing an existing user
    });

    // After the dialog is closed, refresh the user list if any changes were made
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data = this.userService.getUsers(); // Refresh the list of users
      }
    });
  }

  // Method to apply search filter
  applySearch(): void {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase(); // Trimming and converting search term to lowercase
  }

  // Edit user details
  editUser(user: User): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '300px',
      data: user // Pass the current user data for editing
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.updateUser(result); // Update the user in the service
        this.dataSource.data = this.userService.getUsers(); // Refresh the user list from the service
      }
    });
  }
  

  // Delete user
  deleteUser(user: User): void {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      this.userService.deleteUser(user.id); // Delete the user by email
      this.dataSource.data = this.userService.getUsers(); // Refresh the list of users
    }
  }
}
