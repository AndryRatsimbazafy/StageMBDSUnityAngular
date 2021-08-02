import {Component, ElementRef, Input, OnInit, HostListener} from '@angular/core';
import {DataService} from 'src/app/services/data.service';
import { UnityService } from 'src/app/services/unity.service';
import {StandService} from '../../services/stand.service';

declare var $: any;

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
    this.loadWebGL();
    this.getSceneTransitionValues();
  }


  loadWebGL() {
    var canvas = this.elRef.nativeElement.querySelector("#gameContainer");
    var buildUrl = "assets/Build";
    var config = {
      dataUrl: buildUrl + "/SalonAlpha.data",
      frameworkUrl: buildUrl + "/SalonAlpha.framework.js",
      codeUrl: buildUrl + "/SalonAlpha.wasm",
      companyName: "DefaultCompany",
      productName: "Salon Interaction Alpha",
      productVersion: "0.1",
    };

    (window as any).createUnityInstance(canvas, config, (progress: any) => {
        console.log('progress', progress)
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
          var response = this.dataTreatmentAndSendDataToUnitySceneHall(data.body);
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
        console.log('whenSceneStandReady');
        document.getElementById("menu_imagenes").style.display = "flex";
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
    var index = 0;
    var response = "";
    var responseMarque = "";
    var responseAccueil = "";
    var splitStand = "-[splitAllStand]-";
    var splitType = "-[splitAllType]-";
    var linkHeader = "https://dashboard.w3dsalonvituelreno2021.fr/";

    var listLinkAvatarPointFort = ["/assets/hall/FLYER AVATAR - Point Fort Fichet.pdf"];
    var listLinkAvatarEngie = ["/assets/hall/FLYER AVATAR ENGIE - 1 € DIGITAL.pdf"];

    var listLogoAriston = ["/assets/hall/Ar Doc Co Lydos Hybrid 01 2018 BD_1620051238152.pdf"];
    var listLogoPointFort = ["/assets/hall/Document acceuil PDF Point Fort Fichet  (1).pdf"];
    var listLogoEngie = ["/assets/hall/Doc accueil Engie - TRAVAUX CEE DIGITAL.pdf"];
    var listLogoEscalier = ["/assets/hall/Doc acceuil Treppenmeister - Livre des escaliers design2020.pdf"];

    var listeFlyer: any = [];
    listeFlyer.push(listLogoAriston);
    listeFlyer.push(listLogoPointFort);
    listeFlyer.push(listLogoEngie);
    listeFlyer.push(listLogoEscalier);

    for (let i = 0; i < 4; i++) {
      var item = data[i];
      // var linkHeader = "";

      var company = item.companyName;

      var galleries = item.gallery;

      var galleriesUrls = this.galleriesToLongString(galleries, linkHeader);
      var flyers = this.pdfinksToString(listeFlyer[i], "");
      console.log("flyers", flyers);

      var mergedData = this.alldataMergeToLongStringSceneHall(item.gameObjectId, galleriesUrls, flyers);

      if (index == data.length - 1) responseMarque += mergedData;
      else responseMarque += mergedData + splitStand;
    }
    var item1 = data[1];
    var galleries1 = item1.gallery;
    var galleriesUrls1 = this.galleriesToLongString(galleries1, linkHeader);
    var flyers1 = this.pdfinksToString(listLinkAvatarPointFort, "");
    console.log("flyers1", flyers1);
    
    var mergedData1 = this.alldataMergeToLongStringSceneHall(item1.gameObjectId, galleriesUrls1, flyers1);

    var item2 = data[2];
    var galleries2 = item2.gallery;
    var galleriesUrls2 = this.galleriesToLongString(galleries2, linkHeader);
    var flyers2 = this.pdfinksToString(listLinkAvatarEngie, "");
    console.log("flyers2", flyers2);

    var mergedData2 = this.alldataMergeToLongStringSceneHall(item2.gameObjectId, galleriesUrls2, flyers2);

    responseAccueil = mergedData1 + splitStand + mergedData2;
    response = responseAccueil + splitType + responseMarque;
    
    this.playVideoHall("wawa");
    return response;
  }

  dataTreatmentAndSendDataToUnity(data: any, unityInstance?: any) {
    data.forEach((item: any) => {

      var linkHeader = "https://dashboard.w3dsalonvituelreno2021.fr/";

      var company = "Empty";
      if (item.companyName) company = item.companyName;

      var videoUrlsAndIndex = "Empty";
      if (item.videos && item.videos.length) {
        // public/data/assets/6058ad843d45c677279e4d41/H495 Réseaux Sociaux_1617287118289.mp4
        // const videoForUnity = item.videos.map(e => e.url=`public/data/unityvideos/${e.url.split('.mp4')[0].split('/')[e.url.split('.mp4')[0].split('/').length-1]}_1.mp4`)
        const videosV2 = []
        item.videos.forEach(e => {
          videosV2.push({
            index: e.index,
            url: `public/data/unityvideos/${e.url.split('.mp4')[0].split('/')[e.url.split('.mp4')[0].split('/').length - 1]}_1.mp4`
          })
        });

        videoUrlsAndIndex = this.videoUrlsToLongString(videosV2, linkHeader);
      }

      var galleriesUrls = "Empty";
      if (item.gallery && item.gallery.length) galleriesUrls = this.galleriesToLongString(item.gallery, linkHeader);
      var flyers = "Empty";
      if (item.flyers && item.flyers.length) flyers = this.pdfinksToString(item.flyers, linkHeader);

      var logo = "Empty";
      if (item.logo) logo = item.logo;

      var commercialIdsAndIndex = "Empty";
      if (item.commercial && item.commercial.length) commercialIdsAndIndex = this.commercialIdsToLongString(item.commercial);

      var allDataMerged = this.alldataMergeToLongString(item.gameObjectId, videoUrlsAndIndex, galleriesUrls, flyers, company, logo, commercialIdsAndIndex);

      if (!unityInstance) this.loadAllDataToUnityFromBdd(item.gameObjectId, allDataMerged);
      else unityInstance.loadAllDataToUnityFromBdd(item.gameObjectId, allDataMerged);
    });
  }

  dataTreatmentAndSendDataToUnitySceneCoaching(data: any) {
    var commercials = this.commercialIdsToLongString(data);
    this.loadAllDataToUnityFromBddCoachingScene(commercials);
  }

  loadAllDataToUnityFromBddCoachingScene(allDataMerged: any) {
    this.gameInstance.SendMessage('DataLoader', 'LoadAllDataToUnityFromBddSceneCoaching', allDataMerged);
  }

  pdfinksToString(pdfs: any, linkHeader: any) {
    var response = "";
    var splitFlyers = "-[splitFlyerUrl]-";
    if (pdfs.length > 0) {
      for (var i = 0; i < pdfs.length; i++) {
        var link = linkHeader + pdfs[i];
        if (i == pdfs.length - 1) response += "" + link;
        else response += "" + link + splitFlyers;
      }
    }
    return response;
  }

  videoUrlsToLongString(videos: any, linkHeader: any) {
    var response = "";
    var allVideoIndex = "";
    var allVideoUrls = "";
    var splitUrl = "-[splitVideoUrl]-";
    var splitNumEcran = "-[splitNumEcran]-";
    var splitFinal = "-[splitVideosNumUrls]-";
    if (videos.length > 0) {
      for (var i = 0; i < videos.length; i++) {
        var numEcran = videos[i].index;
        var videoUrl = linkHeader + videos[i].url;
        if (i == videos.length - 1) {
          allVideoIndex += "" + numEcran;
          allVideoUrls += "" + videoUrl;
        } else {
          allVideoIndex += "" + numEcran + splitNumEcran;
          allVideoUrls += "" + videoUrl + splitUrl;
        }
      }
    }
    response = allVideoIndex + splitFinal + allVideoUrls;
    return response;
  }

  commercialIdsToLongString(commercial: any) {
    var response = "";
    var allComIndex = "";
    var allComIds = "";
    var splitId = "-[splitComId]-";
    var splitNumCom = "-[splitNumCom]-";
    var splitFinal = "-[splitComsNumIds]-";
    if (commercial.length > 0) {
      for (var i = 0; i < commercial.length; i++) {
        var numCom = commercial[i].index;
        if (commercial[i].user_id) {
          var comId = commercial[i].user_id._id;
          if (i == commercial.length - 1) {
            allComIndex += "" + numCom;
            allComIds += "" + comId;
          } else {
            allComIndex += "" + numCom + splitNumCom;
            allComIds += "" + comId + splitId;
          }
        }
      }
      response = allComIndex + splitFinal + allComIds;
    }
    return response;
  }

  galleriesToLongString(galleries: any, linkHeader: any) {
    var response = "";
    var splitGallery = "-[splitGallery]-";
    for (var i = 0; i < galleries.length; i++) {
      var gallerie = linkHeader + "" + galleries[i];
      if (i == (galleries.length - 1)) {
        response += "" + gallerie;
      } else {
        response += "" + gallerie + splitGallery;
      }
    }
    return response;
  }

  alldataMergeToLongString(standID: any, videoUrlsAndIndex: any, galleriesUrls: any, flyers: any, companyName: any, logo: any, commercialIdsAndIndex) {
    var response = ""
    var splitAllData = "-[splitAllData]-";
    response = standID + splitAllData + videoUrlsAndIndex + splitAllData + galleriesUrls + splitAllData + flyers + splitAllData + companyName + splitAllData + logo + splitAllData + commercialIdsAndIndex;
    return response;
  }

  alldataMergeToLongStringSceneHall(standID: any, galleriesUrls: any, flyers: any) {
    var response = "";
    var splitAllData = "-[splitAll]-";
    response = standID + splitAllData + galleriesUrls + splitAllData + flyers;
    return response;
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
    var split = "-[split]-";
    var video = videoUrl + "" + split + "" + ecranNum;
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

}
