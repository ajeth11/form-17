import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCropperComponent, LoadedImage } from 'ngx-image-cropper';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ImageCropperComponent, MatIconModule, MatButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  data = inject(MAT_DIALOG_DATA);

  constructor(private sanitizer: DomSanitizer, public dialogRef: MatDialogRef<ProfileComponent>) { }

  ngOnInit(): void {
    this.imageChangedEvent = this.data;
  }

  fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: any) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
  }

  saveImg() {
    if (this.croppedImage) {
      console.log(this.croppedImage)
      this.dialogRef.close(this.croppedImage);
    }
  }
}
