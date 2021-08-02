import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalGalleryComponent } from '../modal-gallery/modal-gallery.component';

@Component({
  selector: 'app-modal-logout',
  templateUrl: './modal-logout.component.html',
  styleUrls: ['./modal-logout.component.css']
})
export class ModalLogoutComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ModalLogoutComponent>) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.dialogRef.close("no");
  }

  logout() {
    this.dialogRef.close("yes")
  }

}
