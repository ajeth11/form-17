import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Validators, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { CommonService } from '../../common/common.service';
import { MatIconModule } from '@angular/material/icon';
import { ProfileComponent } from './profile/profile.component';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';



@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatSnackBarModule, MatDialogModule, MatButtonModule, MatInputModule, MatFormFieldModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
  detailForm!: FormGroup;
  private dialog = inject(MatDialog);
  public data = inject(MAT_DIALOG_DATA);
  private _snackBar = inject(MatSnackBar);

  get img() {
    return this.detailForm.get('profile')?.value;
  }

  constructor(private fb: FormBuilder, private commonService: CommonService, public dialogRef: MatDialogRef<FormComponent>) {
    this.detailForm = this.fb.group({
      first: ['', [Validators.required]],
      last: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required]],
      profile: ['', [Validators.required]],
      id: [''],
    })
  }

  ngOnInit(): void {
    if (this.data.mode != 'Add') {
      this.detailForm.patchValue(this.data.data);
    }
  }

  openDialog(event: Event) {
    const dialogRef = this.dialog.open(ProfileComponent, {
      width: '50vw',
      height: '70vh',
      data: event
    });
    dialogRef.afterClosed().subscribe(result => {
      this.detailForm.get('profile')?.setValue(result);
    });
  }

  saveItem() {
    if (this.detailForm.valid) {
      const data = this.detailForm.getRawValue();
      if (this.data.mode == 'Add') {
        const list = this.commonService.getStoreDataDetails();
        let lastId = 0;
        if (list.length != 0) {
          lastId = list[list.length - 1].id;
        }
        data.id = lastId + 1;
        list.push(data);
        this.commonService.saveStoreDataDetails(list);
        this._snackBar.open('Create Successful!', 'Close');
      } else {
        this.commonService.updateStoreDataDetails(data.id, data);
        this._snackBar.open('Update Successful!', 'Close');
      }
      this.dialogRef.close();
    } else {
      this._snackBar.open('Fill All Fields', 'Close');
    }
  }

}
