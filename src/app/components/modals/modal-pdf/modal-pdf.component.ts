import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-pdf',
  templateUrl: './modal-pdf.component.html',
  styleUrls: ['./modal-pdf.component.scss']
})
export class ModalPdfComponent implements OnInit {
  isFullScreen = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ModalPdfComponent>,
  ) { }

  ngOnInit(): void {
  }

  downloadPdf() {
    window.open(this.data.url);
  }

  openInNewTab(file) {
    window.open(file.changingThisBreaksApplicationSecurity)
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  toggleFullScreen() {
    let modal: HTMLDivElement = document.querySelector('.pdfModal');
    modal.style.maxWidth = "100vw"
    modal.style.maxHeight = "100vh"
    if (this.isFullScreen) {
      modal.style.maxWidth = "80vw";
      modal.style.width = "auto";
      modal.style.height = "auto";

    } else {
      modal.style.width = "100vw"
      modal.style.height = "100vh"
    }
    this.isFullScreen = !this.isFullScreen;

  }


}
