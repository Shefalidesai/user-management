import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { AddUserDialogComponent } from 'src/app/add-user-dialog/add-user-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];
  dataSource: User[] = [];  // Here the users will be stored
  pageSize = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)  sort!: MatSort;

  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngOnInit(): void {
    // Add some initial users to the dataSource
    this.dataSource = this.userService.getUsers();
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
        this.dataSource = this.userService.getUsers(); // Refresh the list of users
      }
    });
  }

  editUser(user: User): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '300px',
      data: user // Pass the current user data for editing
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.updateUser(result); // Update the user in the service
        this.dataSource = this.userService.getUsers(); // Refresh the user list from the service
      }
    });
  }
  

  deleteUser(user: User): void {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      this.userService.deleteUser(user.id);
      this.dataSource = this.userService.getUsers(); // Refresh the list of users
    }
  }
}
