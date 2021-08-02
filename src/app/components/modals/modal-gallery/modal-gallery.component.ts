import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-gallery',
  templateUrl: './modal-gallery.component.html',
  styleUrls: ['./modal-gallery.component.css']
})
export class ModalGalleryComponent implements OnInit {

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

  @ViewChild('image') image: any;
  @ViewChild('modal') modal: any;
  @ViewChild('imageModal') imageModal: any;
  @ViewChild('close') close: any;

  isFullScreen = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ModalGalleryComponent>
  ) { }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.dialogRef.close();
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

  toggleFullScreen() {
    let modal: HTMLDivElement = document.querySelector('.galleryModal');
    modal.style.maxWidth = "100vw"
    modal.style.maxHeight = "100vh"
    if (this.isFullScreen) {
      modal.style.maxWidth = "80vw";
      modal.style.height = "auto";
      modal.style.width = "auto";

    } else {
      modal.style.width = "100vw"
      modal.style.height = "100vh"
    }
    this.isFullScreen = !this.isFullScreen;

  }

}
