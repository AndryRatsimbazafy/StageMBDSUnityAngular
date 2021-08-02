import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-rediff-conference',
  templateUrl: './modal-rediff-conference.component.html',
  styleUrls: ['./modal-rediff-conference.component.css']
})
export class ModalRediffConferenceComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<ModalRediffConferenceComponent>
  ) { }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.dialogRef.close();
  }

}
