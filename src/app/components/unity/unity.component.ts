import {Component, ElementRef, Input, OnInit, HostListener} from '@angular/core';
import {DataService} from 'src/app/services/data.service';
import { UnityService } from 'src/app/services/unity.service';
import { Utils } from 'src/app/utils/utils';
import {StandService} from '../../services/stand.service';

declare let $: any;

@Component({
  selector: 'unity',
  templateUrl: './unity.component.html',
  styleUrls: ['./unity.component.css']
})
export class UnityComponent implements OnInit {

  gameInstance: any;
  progress = 0;
  isReady = false;
  @Input() hidden: boolean = false;
  @Input() hide: boolean = true;
  @Input() hiddenStand: boolean = false;
  @Input() hiddenExterieur: boolean = false;
  @Input() hiddenHall: boolean = false;
  @Input() hiddenConference: boolean = false;
  @Input() hiddenCoaching: boolean = false;
  public isVisible: boolean;

  actualScene = "";

  constructor(private standService: StandService, private elRef: ElementRef,
              private dataService: DataService, private unityService?: UnityService) {
                console.log('Unity Component Init')
  }


  ngOnInit() {
    // this.loadWebGL();
    // this.getSceneTransitionValues();
  }


  loadWebGL() {
    let canvas = this.elRef.nativeElement.querySelector("#gameContainer");
    let buildUrl = "assets/Build";
    let config = {
      dataUrl: buildUrl + "/SalonAlpha.data",
      frameworkUrl: buildUrl + "/SalonAlpha.framework.js",
      codeUrl: buildUrl + "/SalonAlpha.wasm",
      companyName: "DefaultCompany",
      productName: "Salon Interaction Alpha",
      productVersion: "0.1",
    };

    (window as any).createUnityInstance(canvas, config, (progress: any) => {
        this.unityService.progress$.next(Math.round(progress * 100));
    }).then((unityInstance: any) => {
      this.gameInstance = unityInstance;
      this.dataService.unityinstance.next(this.gameInstance)
      this.dataService.unityinstance.subscribe(unity => {
        if (unity) console.log('ready unity', unity);
      })
      this.whenSceneExterieurReady();
    });
  }

  whenSceneStandReady() {

    (window as any).whenSceneStandReady = () => {

      this.standService.fetchDataApiServer().subscribe((data: any) => {

        if (data && data.body) {
          this.dataService.exposantAssets.next(data.body);
          this.dataTreatmentAndSendDataToUnity(data.body);
          this.hide = false;
          this.hidden = true;
          this.hiddenStand = true;
          this.hiddenExterieur = false;
          this.hiddenCoaching = false;
          this.hiddenHall = false;
          this.hiddenConference = false;
          this.actualScene = "Stand";
          this.dataService.playBackgroundAudio.next(true)
        }
      });

    };
  }

  whenSceneExterieurReady() {
    (window as any).whenSceneExterieurReady = () => {
      console.log("Exterieur ready");
      this.hidden = true;
      this.hiddenExterieur = true;
      this.hiddenCoaching = false;
      this.hiddenHall = false;
      this.hiddenConference = false;
      this.hiddenStand = false;
      this.actualScene = "Exterieur";
      this.dataService.playBackgroundAudio.next(true)
    };
  }

  whenSceneHallReady() {
    (window as any).whenSceneHallReady = () => {
      this.standService.fetchDataHall().subscribe((data: any) => {
        if (data && data.body) {
          let response = this.dataTreatmentAndSendDataToUnitySceneHall(data.body);
          console.log("Hall ready", data.body.length);
          this.loadAllDataToUnityFromBddHallScene(response);
          this.hidden = true;
          this.hiddenHall = true;
          this.hiddenExterieur = false;
          this.hiddenCoaching = false;
          this.hiddenConference = false;
          this.hiddenStand = false;
          this.actualScene = "Hall";
          this.dataService.playBackgroundAudio.next(true)
        }
      });
    };
  }

  whenSceneCoachingReady() {
    (window as any).whenSceneCoachingReady = () => {
      console.log("Coaching ready");
      this.hidden = true;
      this.hiddenCoaching = true;
      this.hiddenExterieur = false;
      this.hiddenHall = false;
      this.hiddenConference = false;
      this.hiddenStand = false;
      this.actualScene = "Coaching";
      this.dataService.playBackgroundAudio.next(undefined)
    };
  }

  whenSceneConferenceReady() {
    (window as any).whenSceneConferenceDirectReady = () => {
      console.log("Conference ready");
      this.hidden = true;
      this.hiddenConference = true;
      this.hiddenExterieur = false;
      this.hiddenCoaching = false;
      this.hiddenHall = false;
      this.hiddenStand = false;
      this.actualScene = "Conference";
      // this.dataService.playBackgroundAudio.next(undefined)
    };
    (window as any).whenSceneConferenceRediffReady = () => {
      console.log("Conference ready");
      this.hidden = true;
      this.hiddenConference = true;
      this.hiddenExterieur = false;
      this.hiddenCoaching = false;
      this.hiddenHall = false;
      this.hiddenStand = false;
      this.actualScene = "Conference";
      // this.dataService.playBackgroundAudio.next(undefined)
    };
  }

  getSceneTransitionValues(): void {
    (window as any).sendToJavascriptSceneTransition = (type: string) => {
      this.hidden = false;
      if (type == "Hall") {
        this.whenSceneHallReady();
      }
      if (type == "Stand") {
        this.whenSceneStandReady();
      }
      if (type == "Conference") {
        this.whenSceneConferenceReady();
      }
      if (type == "Coaching") {
        this.whenSceneCoachingReady();
      }
    }
  }

  dataTreatmentAndSendDataToUnitySceneHall(data: any) {
    /** TODO: ATAO STATIC DAHOLO DATA HALL PDF RAY ISAKY NY MANDEHA MIANDRY LIEN PDF */
    let utils = new Utils();
    let index = 0;
    let response = "";
    let responseMarque = "";
    let responseAccueil = "";
    let splitStand = "-[splitAllStand]-";
    let splitType = "-[splitAllType]-";
    let linkHeader = "https://dashboard.w3dsalonvituelreno2021.fr/";

    let listLinkAvatarPointFort = ["/assets/hall/FLYER AVATAR - Point Fort Fichet.pdf"];
    let listLinkAvatarEngie = ["/assets/hall/FLYER AVATAR ENGIE - 1 € DIGITAL.pdf"];

    let listLogoAriston = ["/assets/hall/Ar Doc Co Lydos Hybrid 01 2018 BD_1620051238152.pdf"];
    let listLogoPointFort = ["/assets/hall/Document acceuil PDF Point Fort Fichet  (1).pdf"];
    let listLogoEngie = ["/assets/hall/Doc accueil Engie - TRAVAUX CEE DIGITAL.pdf"];
    let listLogoEscalier = ["/assets/hall/Doc acceuil Treppenmeister - Livre des escaliers design2020.pdf"];

    let listeFlyer: any = [];
    listeFlyer.push(listLogoAriston);
    listeFlyer.push(listLogoPointFort);
    listeFlyer.push(listLogoEngie);
    listeFlyer.push(listLogoEscalier);

    for (let i = 0; i < 4; i++) {
      let item = data[i];
      // let linkHeader = "";

      let company = item.companyName;

      let galleries = item.gallery;

      let galleriesUrls = utils.galleriesToLongString(galleries, linkHeader);
      let flyers = utils.pdfinksToString(listeFlyer[i], "");
      console.log("flyers", flyers);

      let mergedData = utils.alldataMergeToLongStringSceneHall(item.gameObjectId, galleriesUrls, flyers);

      if (index == data.length - 1) responseMarque += mergedData;
      else responseMarque += mergedData + splitStand;
    }
    let item1 = data[1];
    let galleries1 = item1.gallery;
    let galleriesUrls1 = utils.galleriesToLongString(galleries1, linkHeader);
    let flyers1 = utils.pdfinksToString(listLinkAvatarPointFort, "");
    console.log("flyers1", flyers1);
    
    let mergedData1 = utils.alldataMergeToLongStringSceneHall(item1.gameObjectId, galleriesUrls1, flyers1);

    let item2 = data[2];
    let galleries2 = item2.gallery;
    let galleriesUrls2 = utils.galleriesToLongString(galleries2, linkHeader);
    let flyers2 = utils.pdfinksToString(listLinkAvatarEngie, "");
    console.log("flyers2", flyers2);

    let mergedData2 = utils.alldataMergeToLongStringSceneHall(item2.gameObjectId, galleriesUrls2, flyers2);

    responseAccueil = mergedData1 + splitStand + mergedData2;
    response = responseAccueil + splitType + responseMarque;
    
    this.playVideoHall("wawa");
    return response;
  }

  dataTreatmentAndSendDataToUnity(data: any, unityInstance?: any) {
    let utils = new Utils();
    data.forEach((item: any) => {

      let linkHeader = "https://dashboard.w3dsalonvituelreno2021.fr/";

      let company = "Empty";
      if (item.companyName) company = item.companyName;

      let videoUrlsAndIndex = "Empty";
      if (item.videos && item.videos.length) {
        const videosV2 = []
        item.videos.forEach(e => {
          videosV2.push({
            index: e.index,
            url: `public/data/unityvideos/${e.url.split('.mp4')[0].split('/')[e.url.split('.mp4')[0].split('/').length - 1]}_1.mp4`
          })
        });

        videoUrlsAndIndex = utils.videoUrlsToLongString(videosV2, linkHeader);
      }

      let galleriesUrls = "Empty";
      if (item.gallery && item.gallery.length) galleriesUrls = utils.galleriesToLongString(item.gallery, linkHeader);
      let flyers = "Empty";
      if (item.flyers && item.flyers.length) flyers = utils.pdfinksToString(item.flyers, linkHeader);

      let logo = "Empty";
      if (item.logo) logo = item.logo;

      let commercialIdsAndIndex = "Empty";
      if (item.commercial && item.commercial.length) commercialIdsAndIndex = utils.commercialIdsToLongString(item.commercial);

      let allDataMerged = utils.alldataMergeToLongString(item.gameObjectId, videoUrlsAndIndex, galleriesUrls, flyers, company, logo, commercialIdsAndIndex);

      if (!unityInstance) this.loadAllDataToUnityFromBdd(item.gameObjectId, allDataMerged);
      else unityInstance.loadAllDataToUnityFromBdd(item.gameObjectId, allDataMerged);
    });
  }

  dataTreatmentAndSendDataToUnitySceneCoaching(data: any) {
    let utils = new Utils();
    let commercials = utils.commercialIdsToLongString(data);
    this.loadAllDataToUnityFromBddCoachingScene(commercials);
  }

  loadAllDataToUnityFromBddCoachingScene(allDataMerged: any) {
    this.gameInstance.SendMessage('DataLoader', 'LoadAllDataToUnityFromBddSceneCoaching', allDataMerged);
  }

  loadAllDataToUnityFromBdd(standId: any, allDataMerged: any) {
    this.gameInstance.SendMessage(standId, 'LoadAllDataToUnityFromBdd', allDataMerged);
  }

  loadAllDataToUnityFromBddHallScene(allDataMerged: any) {
    this.gameInstance.SendMessage('HallDataLoader', 'LoadAllDataToUnityFromBddHallScene', allDataMerged);
  }

  playVideo(standId: any) {
    this.gameInstance.SendMessage(standId, 'PlayAll');
  }

  stopVideo() {
    this.gameInstance.SendMessage('VideoManager', 'StopAll');
  }

  changeVideoAndPdfLink(standId: any, videoUrlPlusScreenIndex: any) {
    this.gameInstance.SendMessage(standId, 'ChangeVideoAndPdfLink', videoUrlPlusScreenIndex);
  }

  tellUnityToSendAllComId(standId: any) {
    this.gameInstance.SendMessage(standId, 'SendAllComsId', standId);
  }

  changeVideoEcran(standId: any, videoUrl: any, ecranNum: any) {
    let split = "-[split]-";
    let video = videoUrl + "" + split + "" + ecranNum;
    this.gameInstance.SendMessage(standId, 'ChangeVideoEcran', video);
  }

  changePdfUrl(standId: any, pdfUrl: any) {
    this.gameInstance.SendMessage(standId, 'ChangePdfUrl', pdfUrl)
  }

  changeGallerieUrls(standId: any, gallerieUrls: any) {
    this.gameInstance.SendMessage(standId, 'ChangeGallerieUrls', gallerieUrls)
  }

  exitMapFromUnity() {
    this.gameInstance.SendMessage("SwitchMapController", "ExitMapFromAngular");
  }

  visiterNotreStand(standId: any) {
    this.gameInstance.SendMessage("HallSelectionManager", "VisiterNotreStand", standId);
  }

  returnToStandScene() {
    this.gameInstance.SendMessage("SwitchScene", "ReturnToStandScene", "None");
  }

  changeScene(sceneName: any) {
    this.gameInstance.SendMessage("SwitchScene", "ChangeScene", sceneName);
  }

  sendAllStandData(standId: any) {
    this.gameInstance.SendMessage(standId, "SendAllStandData", standId);
  }

  sendAllComsId(standId: any) {
    this.gameInstance.SendMessage(standId, "SendAllComsId", standId);
  }

  sendAllVideoUrls(standId: any) {
    this.gameInstance.SendMessage(standId, "SendAllVideoUrls", standId);
  }

  sendAllGallerieUrls(standId: any) {
    this.gameInstance.SendMessage(standId, "SendAllGallerieUrls", standId);
  }

  sendAllFlyerUrls(standId: any) {
    this.gameInstance.SendMessage(standId, "SendAllFlyerUrls", standId);
  }

  playVideoHall(wawa: any) {
    this.gameInstance.SendMessage("HallDataLoader", "PlayVideo", wawa);
  }

  // pdfinksToString(pdfs: any, linkHeader: any) {
  //   let response = "";
  //   let splitFlyers = "-[splitFlyerUrl]-";
  //   if (pdfs.length > 0) {
  //     for (let i = 0; i < pdfs.length; i++) {
  //       let link = linkHeader + pdfs[i];
  //       if (i == pdfs.length - 1) response += "" + link;
  //       else response += "" + link + splitFlyers;
  //     }
  //   }
  //   return response;
  // }

  // videoUrlsToLongString(videos: any, linkHeader: any) {
  //   let response = "";
  //   let allVideoIndex = "";
  //   let allVideoUrls = "";
  //   let splitUrl = "-[splitVideoUrl]-";
  //   let splitNumEcran = "-[splitNumEcran]-";
  //   let splitFinal = "-[splitVideosNumUrls]-";
  //   if (videos.length > 0) {
  //     for (let i = 0; i < videos.length; i++) {
  //       let numEcran = videos[i].index;
  //       let videoUrl = linkHeader + videos[i].url;
  //       if (i == videos.length - 1) {
  //         allVideoIndex += "" + numEcran;
  //         allVideoUrls += "" + videoUrl;
  //       } else {
  //         allVideoIndex += "" + numEcran + splitNumEcran;
  //         allVideoUrls += "" + videoUrl + splitUrl;
  //       }
  //     }
  //   }
  //   response = allVideoIndex + splitFinal + allVideoUrls;
  //   return response;
  // }

  // commercialIdsToLongString(commercial: any) {
  //   let response = "";
  //   let allComIndex = "";
  //   let allComIds = "";
  //   let splitId = "-[splitComId]-";
  //   let splitNumCom = "-[splitNumCom]-";
  //   let splitFinal = "-[splitComsNumIds]-";
  //   if (commercial.length > 0) {
  //     for (let i = 0; i < commercial.length; i++) {
  //       let numCom = commercial[i].index;
  //       if (commercial[i].user_id) {
  //         let comId = commercial[i].user_id._id;
  //         if (i == commercial.length - 1) {
  //           allComIndex += "" + numCom;
  //           allComIds += "" + comId;
  //         } else {
  //           allComIndex += "" + numCom + splitNumCom;
  //           allComIds += "" + comId + splitId;
  //         }
  //       }
  //     }
  //     response = allComIndex + splitFinal + allComIds;
  //   }
  //   return response;
  // }

  // galleriesToLongString(galleries: any, linkHeader: any) {
  //   let response = "";
  //   let splitGallery = "-[splitGallery]-";
  //   for (let i = 0; i < galleries.length; i++) {
  //     let gallerie = linkHeader + "" + galleries[i];
  //     if (i == (galleries.length - 1)) {
  //       response += "" + gallerie;
  //     } else {
  //       response += "" + gallerie + splitGallery;
  //     }
  //   }
  //   return response;
  // }

  // alldataMergeToLongString(standID: any, videoUrlsAndIndex: any, galleriesUrls: any, flyers: any, companyName: any, logo: any, commercialIdsAndIndex) {
  //   let response = ""
  //   let splitAllData = "-[splitAllData]-";
  //   response = standID + splitAllData + videoUrlsAndIndex + splitAllData + galleriesUrls + splitAllData + flyers + splitAllData + companyName + splitAllData + logo + splitAllData + commercialIdsAndIndex;
  //   return response;
  // }

  // alldataMergeToLongStringSceneHall(standID: any, galleriesUrls: any, flyers: any) {
  //   let response = "";
  //   let splitAllData = "-[splitAll]-";
  //   response = standID + splitAllData + galleriesUrls + splitAllData + flyers;
  //   return response;
  // }

}
