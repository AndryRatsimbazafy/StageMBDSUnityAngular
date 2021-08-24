import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { UnityComponent } from '../unity/unity.component';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { ModalPdfComponent } from '../modals/modal-pdf/modal-pdf.component';
import { StandService } from '../../services/stand.service';
import { ModalGalleryComponent } from '../modals/modal-gallery/modal-gallery.component';
import { ModalLogoutComponent } from '../modals/modal-logout/modal-logout.component';
import { ModalHelpComponent } from '../modals/modal-help/modal-help.component';
import { HttpClient } from '@angular/common/http';
import { ModalChatComponent } from '../modals/modal-chat/modal-chat.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ModalHallComponent } from '../modals/modal-hall/modal-hall.component';
import { DataService } from 'src/app/services/data.service';
import { ModalAllMediaComponent } from '../modals/modal-all-media/modal-all-media.component';
import { ModalAllVideoComponent } from '../modals/modal-all-video/modal-all-video.component';
import { ModalChoixSceneComponent } from '../modals/modal-choix-scene/modal-choix-scene.component';
import { ModalEmailComponent } from '../modals/modal-email/modal-email.component';
import { ModalCommericalComponent } from '../modals/modal-commerical/modal-commerical.component';
import { ModalChoixConferenceComponent } from "../modals/modal-choix-conference/modal-choix-conference.component";
import { ChatService } from "../../services/chat.service";
import { ModalEngieComponent } from "../modals/modal-engie/modal-engie.component";
import { ModalHallEngieComponent } from '../modals/modal-hall-engie/modal-hall-engie.component';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UnityService } from 'src/app/services/unity.service';

declare let particlesJS: any;

@Component({
  selector: 'app-salon',
  templateUrl: './salon.component.html',
  styleUrls: ['./salon.component.css'],
})
export class SalonComponent implements OnInit, AfterViewInit {

  id: any;
  type: any;
  url: any;
  standIdSelected: any = "None";

  @ViewChild('modal') modal: any;
  @ViewChild('close') close: any;

  @ViewChild('modalGallerie') modalGallerie: any;
  @ViewChild('closeGallerie') closeGallerie: any;

  src: any;
  sources: any;

  listCommercial: any[];

  @ViewChild('unity', { static: true })
  unity: UnityComponent = new UnityComponent(this.standService, this.elRef, this.dataService);
  needLogoutConfirm = false;

  assets = [];
  assetsLoaded = false;

  inConference$: Observable<boolean>;

  public progress = 0;

  constructor(
    private _sanitizer: DomSanitizer,
    public dialog: MatDialog,
    public standService: StandService,
    public elRef: ElementRef,
    public httpClient: HttpClient,
    private auth: AuthService,
    public router: Router,
    private dataService: DataService,
    private chat: ChatService,
    private unityService: UnityService,
  ) {

  }

  ngOnInit() {
    this.unityService.progress$.subscribe((progress: number) => this.progress = progress);
    this.inConference$ = this.dataService.inConference;
    this.dataService.exposantAssets.subscribe(assets => {
      if (assets && !this.assetsLoaded) {
        this.assets = assets;
        this.getValuesFromUnity();
        this.assetsLoaded = true;
      }
    })

    this.getValuesFromUnitySceneHall();
    this.getValuesFromUnityStandId();
    this.getValuesFromUnitySceneCoaching();
    this.getValuesFromUnityConference();

    particlesJS.load('particles-js', 'assets/particles.json', function () {
      console.log('callback - particles.js config loaded');
    });

    this.dataService.playBackgroundAudio.subscribe(e => {
      const audioElement: any = document.getElementById('audioFeo')
      if (e) {
        audioElement.play()
      } else {
        audioElement.pause()
      }
    })
  }

  ngAfterViewInit() {
    (document.querySelector('#audioFeo') as HTMLAudioElement).volume = 0.75;
  }

  getValuesFromUnityStandId(): void {
    (window as any).sendToJavascriptStandId = (
      id: any
    ) => {
      if (id.includes('-')) id = id.replaceAll('-', '')
      this.standIdSelected = id;
      console.log('this.standIdSelected', this.standIdSelected);
      if (id && id != 'None') {
        console.log("Body Send", { "StandId": id, "User ID": localStorage.getItem("salon-user-id") })
        this.standService.sendUserDataApiServer(id, localStorage.getItem("salon-user-id"));
      }
    }
  }

  getValuesFromUnitySceneCoaching(): void {
    (window as any).sendToJavascriptDataFromCoaching = (
      standId: string,
      type: string,
      data: any
    ) => {
      if (type == 'CommercialMan') {
        this.dialog.open(ModalChatComponent, {
          data: {
            commercialId: data,
          },
          width: '40vw'
        }).afterClosed().subscribe(() => data = null);
      }
    }
  }

  getValuesFromUnityExit(): void {
    (window as any).sendToJavascriptSceneExit = () => {
      this.dialog.open(ModalChoixSceneComponent);
    }
  }

  getValuesFromUnityConference(): void {
    (window as any).sendToJavascriptSceneConference = () => {
      const modal = this.dialog.open(ModalChoixConferenceComponent);
      modal.afterClosed().subscribe(() => {
        // this.dataService.inConference.next(false);
      });
    }
  }

  getValuesFromUnitySceneHall(): void {
    (window as any).sendToJavascriptDataFromHall = (
      standId: string,
      type: string,
      data: any
    ) => {
      if (type != "EcranHall") {

        if (standId.includes('-')) standId = (standId as any).replaceAll('-', "")
        this.id = standId;
        console.log('data', data);

        let dataSplited = data.split('-[splitAll]-');
        let dataArray: string[] = [];
        dataSplited.forEach((item) => {
          dataArray.push(item);
        });

        let listGallerie = dataArray[1].split("-[splitGallery]-");
        let gallerieArray: string[] = [];
        listGallerie.forEach((item) => {
          gallerieArray.push(item);
        });
        let listFlyers = dataArray[2].split("-[splitFlyerUrl]-");
        let flyerArray: any[] = [];
        listFlyers.forEach((item) => {
          flyerArray.push(this._sanitizer.bypassSecurityTrustResourceUrl(item));
        });
        if (type == "Marque") {
          this.dialog.open(ModalHallComponent, {
            data: {
              standId: dataArray[0],
              listGalleries: gallerieArray,
              listFlyers: flyerArray,
              unityComponent: this.unity
            }
          }).afterClosed().subscribe(() => data = null);;
        }

        if (type == "ComMarque") {
          this.dialog.open(ModalHallComponent, {
            data: {
              standId: dataArray[0],
              listGalleries: gallerieArray,
              listFlyers: flyerArray,
              unityComponent: this.unity
            }
          }).afterClosed().subscribe(() => data = null);;
        }

        if (type == "PresentoirAccueil") {
          this.dialog.open(ModalHallComponent, {
            data: {
              standId: dataArray[0],
              listGalleries: gallerieArray,
              listFlyers: flyerArray,
              unityComponent: this.unity
            }
          }).afterClosed().subscribe(() => data = null);;
        }

        if (type == "ComAccueil") {
          this.dialog.open(ModalHallComponent, {
            data: {
              standId: dataArray[0],
              listGalleries: gallerieArray,
              listFlyers: flyerArray,
              unityComponent: this.unity
            }
          }).afterClosed().subscribe(() => data = null);;
        }
      } 
      
      else {

        if (type == "EcranHall") {
          /* TODO:Asina lien ecran hall TSY AZO ADINO */
          window.open(environment.SERVER_URL + "/public/data/ecran-hall.pdf");
        }
      }
    }
  }

  getValuesFromUnity(): void {
    (window as any).sendToAngular = (
      id: string,
      type: string,
      url: string,
      companyName: any
    ) => {

      if (id.includes('-')) id = (id as any).replaceAll('-', '')
      this.id = id;

      if (type == 'VideoModal') {
        const selectedStand = this.assets.find(e => e.gameObjectId == id);
        // console.log('Get values again------', selectedStand);
        const newUrl = url.replace('unityvideos', `assets/${selectedStand.room.user_id}`).replace('_1.mp4', '.mp4')
        this.openVideoModal(newUrl);
      }

      if (type == 'PdfModal') {
        let splitFlyers = "-[splitFlyerUrl]-";
        let urls = url.split(splitFlyers);
        let urlArray: any[] = [];
        urls.forEach((item) => {
          urlArray.push(this._sanitizer.bypassSecurityTrustResourceUrl(item));
        });

        this.dialog.open(ModalPdfComponent, {
          data: {
            standID: id,
            urlSafe: this._sanitizer.bypassSecurityTrustResourceUrl(url),
            url: url,
            urls: urlArray,
            companyName: companyName
          },
          panelClass: 'pdfModal'

        }).afterClosed().subscribe(() => url = null);
      }

      if (type == 'GallerieModal') {
        let splitGallery = '-[splitGallery]-';
        let urls = url.split(splitGallery);
        if (urls) {
          urls = urls.sort(() => Math.random() - 0.5);
        }
        this.dialog.open(ModalGalleryComponent, {
          data: {
            standID: id,
            urls,
            companyName: companyName,
          },
          panelClass: 'galleryModal'
        }).afterClosed().subscribe(() => url = null);;
      }

      if (type == 'CommercialWoman') {
        let stand = undefined
        stand = this.assets.find(e => e.gameObjectId == id)
        if (stand) {
          const commercial = stand.commercial.find(c => c.index == url);
          console.log("commercial IN STAND", commercial)
          if (commercial) {
            this.dialog.open(ModalChatComponent, {
              data: {
                commercialId: commercial.user_id._id,
              },
              width: '40vw'
            }).afterClosed().subscribe(() => url = null);
          }
        }
      }

      if (type == 'CommercialMan') {
        let stand = undefined;
        stand = this.assets.find(e => e.gameObjectId == id)
        if (stand) {
          const commercial = stand.commercial.find(c => c.index == url);
          if (commercial) {
            console.log("CommercialID", commercial.user_id._id)

            this.dialog.open(ModalChatComponent, {
              data: {
                commercialId: commercial.user_id._id,
              },
              width: '40vw'
            }).afterClosed().subscribe(() => url = null);
          }
        }
      }

      if (type == 'Chat') {
        let selectedStand = undefined
        selectedStand = this.assets.find(e => e.gameObjectId == id)
        console.log('id', id);
        this.dialog.open(ModalCommericalComponent, {
          data: {
            commercial: (selectedStand && selectedStand.commercial) ? selectedStand.commercial : [],
          }
        }).afterClosed().subscribe(() => url = null);
      }

      if (type == 'AllStandData') {
        let allDataSplited = url.split('-[splitAllDataType]-');
        let dataArray: string[] = [];
        allDataSplited.forEach((item) => {
          dataArray.push(item);
        });

        let listGallerie = dataArray[1].split("-[splitGallery]-");
        let gallerieArray: string[] = [];
        listGallerie.forEach((item) => {
          gallerieArray.push(item);
        });
        let listFlyers = dataArray[2].split("-[splitFlyerUrl]-");
        let flyerArray: any[] = [];
        listFlyers.forEach((item) => {
          flyerArray.push(this._sanitizer.bypassSecurityTrustResourceUrl(item));
        });
        let listVideos = dataArray[0].split("-[splitVideoUrl]-");
        let videoArray: any[] = [];
        listVideos.forEach((item) => {
          videoArray.push(item);
        });
        console.log('listVideos', videoArray);

        this.dialog.open(ModalAllMediaComponent, {
          data: {
            standId: id,
            listGalleries: gallerieArray,
            listFlyers: flyerArray,
            listVideos: videoArray
          }
        }).afterClosed().subscribe(() => url = null);
      }

      if (type == 'AllStandVideo') {
        let listVideos = url.split("-[splitVideoUrl]-");
        let videoArray: any[] = [];
        listVideos.forEach((item) => {
          videoArray.push(item);
        });
        this.dialog.open(ModalAllVideoComponent, {
          data: {
            standId: id,
            listVideos: videoArray
          }
        }).afterClosed().subscribe(() => url = null);;
      }

      if (type == 'AllStandGallerie') {
        let splitGallery = '-[splitGallery]-';
        let urls = url.split(splitGallery);
        if (urls) {
          urls = urls.sort(() => Math.random() - 0.5);
        }
        this.dialog.open(ModalGalleryComponent, {
          data: {
            standID: id,
            urls,
            companyName: companyName,
          },
          panelClass: 'galleryModal'
        }).afterClosed().subscribe(() => url = null);;
      }
      
      if (type == 'AllStandFlyer') {
        let splitFlyers = "-[splitFlyerUrl]-";
        let urls = url.split(splitFlyers);
        let urlArray: any[] = [];
        urls.forEach((item) => {
          urlArray.push(this._sanitizer.bypassSecurityTrustResourceUrl(item));
        });

        if (id == "StandID1") {
          let pdflinks1: any[] = [];
          let pdflinks2: any[] = [];
          urls.forEach((item) => {
            console.log('Check ' + item, typeof item);
            if (item.toLowerCase().indexOf("home service") !== -1) pdflinks1.push(this._sanitizer.bypassSecurityTrustResourceUrl(item));
            else pdflinks2.push(this._sanitizer.bypassSecurityTrustResourceUrl(item));
          });
          this.dialog.open(ModalEngieComponent, {
            data: {
              standID: id,
              urlSafe: this._sanitizer.bypassSecurityTrustResourceUrl(url),
              url: url,
              urls: urlArray,
              engie: pdflinks2,
              engiHomeService: pdflinks1,
              companyName: companyName
            },
            panelClass: 'pdfModal'
          }).afterClosed().subscribe(() => url = null);;
        } else {
          this.dialog.open(ModalPdfComponent, {
            data: {
              standID: id,
              urlSafe: this._sanitizer.bypassSecurityTrustResourceUrl(url),
              url: url,
              urls: urlArray,
              companyName: companyName
            },
            panelClass: 'pdfModal'
          }).afterClosed().subscribe(() => url = null);;
        }
      }
    };
  }

  logout() {
    // this.unity.tellUnityToSendAllComId("StandID1");
    const dialogRef = this.dialog.open(ModalLogoutComponent);

    dialogRef.afterClosed().subscribe(res => {
      if (res && res == "yes") {
        const userID = { _id: this.auth.getUserId() }
        console.log("log user out")
        this.auth.logout(userID).subscribe((result: any) => {
          if (result && result.success) {
            this.router.navigate(['index'])
          }
        })
      }
    })
  }

  help() {
    this.dialog.open(ModalHelpComponent);
  }


  stopVideo(): void {
    this.unity.stopVideo();
  }

  openPdf(url: any): void {
    window.open(url);
  }

  returnToStandScene() {
    this.dataService.exposantAssets.next(null);
    this.dataService.inConference.next(false);
    this.assetsLoaded = false;

    if (this.unity.actualScene == "Stand") {
      this.unity.changeScene("Hall");
    } else {
      this.unity.changeScene("Stand");
    }
  }

  openCommercialListModal() {
    console.log("open commercial modal")
  }

  sendAllStandData() {
    console.log('this.standIdSelected', this.standIdSelected);
    this.unity.sendAllStandData(this.standIdSelected);
  }

  sendAllComsId() {
    this.unity.sendAllComsId(this.standIdSelected);
  }

  sendAllVideoUrls() {
    this.unity.sendAllVideoUrls(this.standIdSelected);
  }

  sendAllGallerieUrls() {
    this.unity.sendAllGallerieUrls(this.standIdSelected);
  }

  sendAllFlyerUrls() {
    this.unity.sendAllFlyerUrls(this.standIdSelected);
  }

  sendEmail() {
    if (this.standIdSelected.includes('-')) this.standIdSelected = (this.standIdSelected as any).replaceAll('-', '')
    this.dialog.open(ModalEmailComponent, {
      data: {
        standIdSelected: this.standIdSelected
      }
    });
  }

  openVideoModal(url) {
    const videoDiv: any = document.getElementById('dvideo')
    this.src = url;
    videoDiv.setAttribute('src', url)
    this.modal.nativeElement.style.display = 'block';
    const audioElement: any = document.getElementById('audioFeo')
    audioElement.pause()
  }

  closeVideoModal() {
    const videoDiv: any = document.getElementById('dvideo')
    if (videoDiv.getAttribute('src')) {
      videoDiv.pause()
    }
    videoDiv.setAttribute('src', '')
    videoDiv.load();
    console.log("videoDiv on close", videoDiv.getAttribute('src'));
    // try to close modal
    this.src = null;
    this.modal.nativeElement.style.display = 'none';
    const audioElement: any = document.getElementById('audioFeo')
    audioElement.play()
  }

  openGallerieModal(urls: any) {
    this.sources = urls;
    this.modalGallerie.nativeElement.style.display = 'block';
  }

  closeGallerieModal() {
    this.modalGallerie.nativeElement.style.display = 'none';
  }
}
