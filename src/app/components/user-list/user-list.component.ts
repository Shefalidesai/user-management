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

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.addUser(result);
        this.dataSource = this.userService.getUsers(); // Refresh the list of users
      }
    });
  }

  editUser(user: User): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '300px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.updateUser(result);
        this.dataSource = this.userService.getUsers(); // Refresh the list of users
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
