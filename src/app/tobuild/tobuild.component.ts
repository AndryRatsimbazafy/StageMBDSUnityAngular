import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tobuild',
  templateUrl: './tobuild.component.html',
  styleUrls: ['./tobuild.component.css'],
})
export class TobuildComponent implements OnInit, AfterViewInit {
  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // const iframe: HTMLIFrameElement = document.querySelector('iframe#myIframe')
    // console.log('iframe', $(iframe))
    // $(iframe).on('load', function() {
    //   let content = $(iframe).contents();
    //   let document = content[0];
    //   $(document).on('load')
    //   console.log('=============================', content);
    // })
    // // iframe.onload = () => {
    // //   (document.querySelector('.loading-container') as HTMLDivElement).style.display = "none";
    // //   let iframeDoc = (iframe as HTMLIFrameElement).contentDocument;
    // //   iframeDoc.onload = () => console.log('HOlaaaaa loaded');
    // // }

    // let loading: HTMLDivElement = document.querySelector('.loading-container');
    // console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh', loading);
    // if (loading) {
    //   loading.style.display = 'none';
    // }

    this.recursiveRemove();

  }

  recursiveRemove() {
   let unityLoaded = localStorage.getItem('stopLoading');

    if (unityLoaded) {
      console.log('unityLoaded')
      const loading: HTMLDivElement = document.querySelector('.loading-container');
      if (loading) {
        loading.style.display = 'none';
        localStorage.removeItem('stopLoading');
      } else {
        setTimeout(() => {
          this.recursiveRemove()

        }, 1000)
      }
    } else {
      setTimeout(() => {
        this.recursiveRemove()

      }, 1000)
    }
  }


  returnToStandScene() {
    let finish = false;

    this.router.navigate(['/home']);

    /* this.dataService.unityinstance.subscribe((unity) => {
      console.log(unity);
      if (unity && !finish) {
        unity.SendMessage(
          'HallSelectionManager',
          'VisiterNotreStand',
          'StandID1'
        );
      }
    }); */
  }
}
