import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ModalChatComponent} from "../modal-chat/modal-chat.component";

@Component({
  selector: 'app-modal-commerical',
  templateUrl: './modal-commerical.component.html',
  styleUrls: ['./modal-commerical.component.scss']
})
export class ModalCommericalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<ModalCommericalComponent>
  ) { }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  chat(comId) {
    console.log('comId', comId)
    this.dialog.open(ModalChatComponent, {
            data: {
              commercialId: comId,
            },
            width: '40vw'
          });
  }

}
