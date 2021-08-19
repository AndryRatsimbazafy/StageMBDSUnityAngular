export class Utils {
    constructor() {
    }

    pdfinksToString(pdfs: any, linkHeader: string): string {
        let response = "";
        let splitFlyers = "-[splitFlyerUrl]-";
        if (pdfs.length > 0) {
            for (let i = 0; i < pdfs.length; i++) {
                let link = linkHeader + pdfs[i];
                if (i == pdfs.length - 1) response += "" + link;
                else response += "" + link + splitFlyers;
            }
        }
        return response;
    }

    videoUrlsToLongString(videos: any, linkHeader: string): string {
        let response = "";
        let allVideoIndex = "";
        let allVideoUrls = "";
        let splitUrl = "-[splitVideoUrl]-";
        let splitNumEcran = "-[splitNumEcran]-";
        let splitFinal = "-[splitVideosNumUrls]-";
        if (videos.length > 0) {
            for (let i = 0; i < videos.length; i++) {
                let numEcran = videos[i].index;
                let videoUrl = linkHeader + videos[i].url;
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

    commercialIdsToLongString(commercial: any): string {
        let response = "";
        let allComIndex = "";
        let allComIds = "";
        let splitId = "-[splitComId]-";
        let splitNumCom = "-[splitNumCom]-";
        let splitFinal = "-[splitComsNumIds]-";
        if (commercial.length > 0) {
          for (let i = 0; i < commercial.length; i++) {
            let numCom = commercial[i].index;
            if (commercial[i].user_id) {
              let comId = commercial[i].user_id._id;
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

      galleriesToLongString(galleries: any, linkHeader: string): string {
        let response = "";
        let splitGallery = "-[splitGallery]-";
        for (let i = 0; i < galleries.length; i++) {
          let gallerie = linkHeader + "" + galleries[i];
          if (i == (galleries.length - 1)) {
            response += "" + gallerie;
          } else {
            response += "" + gallerie + splitGallery;
          }
        }
        return response;
      }

      alldataMergeToLongString(standID: string, videoUrlsAndIndex: string, galleriesUrls: string, flyers: string, companyName: string, logo: string, commercialIdsAndIndex: string): string {
        let response = ""
        let splitAllData = "-[splitAllData]-";
        response = standID + splitAllData + videoUrlsAndIndex + splitAllData + galleriesUrls + splitAllData + flyers + splitAllData + companyName + splitAllData + logo + splitAllData + commercialIdsAndIndex;
        return response;
      }
    
      alldataMergeToLongStringSceneHall(standID: string, galleriesUrls: string, flyers: string): string {
        let response = "";
        let splitAllData = "-[splitAll]-";
        response = standID + splitAllData + galleriesUrls + splitAllData + flyers;
        return response;
      }
}