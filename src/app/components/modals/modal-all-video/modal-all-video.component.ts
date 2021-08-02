import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-all-video',
  templateUrl: './modal-all-video.component.html',
  styleUrls: ['./modal-all-video.component.css']
})
export class ModalAllVideoComponent implements OnInit {

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  loading = false

  @ViewChild('image') image: any;
  @ViewChild('modal') modal: any;
  @ViewChild('imageModal') imageModal: any;
  @ViewChild('close') close: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ModalAllVideoComponent>,
  ) { }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  openImageModal(url: any){
    this.modal.nativeElement.style.display = "block";
    this.imageModal.nativeElement.src = url;
  }

  closeImageModal(){
    this.modal.nativeElement.style.display = "none";
  }

  openInNewTab(file) {
    window.open(file.changingThisBreaksApplicationSecurity)
  }

}
