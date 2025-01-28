import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

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
    @Inject(MAT_DIALOG_DATA) public data: any, // Inject data if passed to the dialog
    private userService: UserService
  ) {
    this.userForm = this.fb.group({
      name: [data ? data.name : '', [Validators.required]],
      email: [data ? data.email : '', [Validators.required, Validators.email]],
      role: [data ? data.role : '', [Validators.required]]
    });
  }

  // Close the dialog without saving
  onNoClick(): void {
    this.dialogRef.close();
  }

  // Submit form and add user
  onSubmit(): void {
    if (this.userForm.valid) {
      const user = this.userForm.value;
      if (this.data) {
        // If editing, update user
        this.userService.updateUser(user);
      } else {
        // If adding, save new user
        this.userService.addUser(user);
      }
      this.dialogRef.close(true); // Close the dialog and return true
    }
  }
}
