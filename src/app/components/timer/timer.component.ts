import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { TimerService } from 'src/app/services/timer.service';

//********** Set the local date ***********/
moment.locale('fr');

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  title = 'timerDemo';


  clockHandle: any;
  run: boolean = false;
  begin: boolean = true;
  end: boolean = false;

  countDownHour: any;
  countDownHourStr: String;

  alertHour: any;
  alertHourStr: String;

  debutDuSalon: any;
  finDuSalon: any;
  dateActuel: any;
  tempsAvantDebutSalon: any;
  tempsRestantAvantFinDuSalon: any

  formatDateTime: string = 'dddd Do MMMM YYYY, HH:mm:ss';
  formatDT: string = 'HH:mm:ss';

  // //  Mois, jour, année
  // dateDebutSalonStr = "05/05/2021 14:42:40";
  // dateFinSalonStr = "05/05/2021 14:45:00";

  dateDebutSalonStr = "";
  dateFinSalonStr = "";

  debutEvtSalon: boolean = false;

  val: any;

  periodForm = new FormGroup({
    debut: new FormControl(''),
    fin: new FormControl(''),
  });

  constructor(
    private router: Router,
    private data: DataService,
    private auth: AuthService,
    public timerService: TimerService
  ) {
  }

  ngOnInit(): void {
    this.data.timer.subscribe((timer: any) => {
      if (timer) {
        this.timerDemo(timer.start, timer.end);
      } else {
        this.timerService.get().subscribe((timer: any) => {
          if (timer && timer.body) {
            console.log('timer', timer.body);
            this.data.visitableState.next(-1);
            // data timer next wait for 1 second for avoiding stuck 
            // setTimeout(() => {
            //   this.data.timer.next(timer.body);
            // }, 1000)
            this.timerDemo(timer.body.start, timer.body.end);
          }
        })
      }
    })
  }

  timerDemo(dateDebutSalonStr: any, dateFinSalonStr: any) {

    this.dateDebutSalonStr = dateDebutSalonStr;
    this.dateFinSalonStr = dateFinSalonStr;

    // DATE ET HEURE DE DEBUT
    this.debutDuSalon = moment(this.dateDebutSalonStr).format(this.formatDateTime);

    // DATE ET HEURE DE FIN
    this.finDuSalon = moment(this.dateFinSalonStr).format(this.formatDateTime);
    var tmp = moment(this.dateFinSalonStr).format(this.formatDT)
    console.log(tmp)
    // console.log(this.finDuSalon);


    //******  NOTIF *******//
    // Déclenché 42 secondes avant la fin du salon
    this.countDownHour = moment(tmp, 'HH:mm:ss').subtract(0.7, 'm');
    this.countDownHourStr = this.countDownHour.format('HH:mm:ss');
    console.log(this.countDownHour.format('HH:mm:ss'));


    // COMPTE A REBOURS
    // Déclenché 3 secondes avant la fin du salon
    this.alertHour = moment(tmp, 'HH:mm:ss').subtract(0.05, 'm');
    this.alertHourStr = this.alertHour.format('HH:mm:ss');
    console.log(this.alertHour.format('HH:mm:ss'));

    // this.clockHandle = setInterval(() => {
    //   var dateNow = moment()
    //   this.dateActuel = dateNow.format(this.formatDateTime);

    //   //  Vérifie si la date actuel est avant la date de début du salon
    //   if (moment(dateNow).isBefore(this.dateDebutSalonStr)) {
    //     this.tempsAvantDebutSalon = moment.utc(moment(this.dateDebutSalonStr).diff(dateNow)).format("HH:mm:ss");
    //   } else {

    //     //  Vérifie si la date actuel est après la date de début du salon et avant la date de fin du salon
    //     if (moment(dateNow).isAfter(this.dateDebutSalonStr) && moment(dateNow).isBefore(this.dateFinSalonStr)) {
    //       this.debutEvtSalon = true; // entre deb - fin
    //       this.data.visitableState.next(1);
    //       this.tempsAvantDebutSalon = "00:00:00";
    //       this.tempsRestantAvantFinDuSalon = moment.utc(moment(this.dateFinSalonStr).diff(dateNow)).format("HH:mm:ss");
    //     } else {
    //       this.debutEvtSalon = false
    //       this.data.visitableState.next(-1);
    //       this.tempsRestantAvantFinDuSalon = "00:00:00";
    //     }

    //   }

    //   //******  Retardateur ******///

    //   if (dateNow.format(this.formatDT) == this.countDownHourStr) {
    //     this.begin = false;
    //     this.end = true;
    //   }
    //   if (dateNow.format(this.formatDT) == this.alertHourStr) {
    //     this.run = true
    //     setTimeout(() => {
    //       console.log('goodbye');

    //       this.auth.deleteUserInfo()
    //       this.router.navigate(['/index']);
    //     }, 3000);
    //   }
    //   if (dateNow.format(this.formatDT) == moment(this.dateFinSalonStr).format(this.formatDT)) {
    //     return;
    //   }

    // }, 1000);

  }
}
