import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ModalAllMediaComponent} from "../modal-all-media/modal-all-media.component";

@Component({
  selector: 'app-modal-engie',
  templateUrl: './modal-engie.component.html',
  styleUrls: ['./modal-engie.component.css']
})
export class ModalEngieComponent implements OnInit {

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
    private dialogRef: MatDialogRef<ModalEngieComponent>,
  ) { }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.dialogRef.close();
  }


  openInNewTab(file) {
    window.open(file.changingThisBreaksApplicationSecurity)
  }

  openImageModal(url: any) {
    this.modal.nativeElement.style.display = 'block';
    this.imageModal.nativeElement.src = url;
    this.imageModal.nativeElement.style['object-fit'] = 'contain';
    this.imageModal.nativeElement.style.height = 'auto';
  }

  closeImageModal() {
    this.modal.nativeElement.style.display = 'none';
  }

}
