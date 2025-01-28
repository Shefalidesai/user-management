import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model'; // Assuming you have a User model

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent {
  userForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddUserDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: User | null, // Inject data if passed to the dialog
    private userService: UserService
  ) {
    this.userForm = this.fb.group({
      name: [this.data ? this.data.name : '', [Validators.required]],
      email: [this.data ? this.data.email : '', [Validators.required, Validators.email]],
      role: [this.data ? this.data.role : '', [Validators.required]]
    });
  }

  // Close the dialog without saving
  onNoClick(): void {
    this.dialogRef.close(); // Simply close the dialog without any action
  }

  // Submit form and either update or add the user
  onSubmit(): void {
    if (this.userForm.valid) {
      const user = this.userForm.value;
      if (this.data) {
        console.log(this.data, user);
        // If editing, update user
        this.userService.updateUser(user);
      } else {
        // If adding, save new user
        this.userService.addUser(user);
      }
      this.dialogRef.close(user); // Close the dialog and return the updated user
    }
  }
  
}
