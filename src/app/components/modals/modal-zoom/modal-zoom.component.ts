import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalRediffConferenceComponent } from '../modal-rediff-conference/modal-rediff-conference.component';

@Component({
  selector: 'app-modal-zoom',
  templateUrl: './modal-zoom.component.html',
  styleUrls: ['./modal-zoom.component.css']
})
export class ModalZoomComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<ModalZoomComponent>
  ) { }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.dialogRef.close();
  }

}
