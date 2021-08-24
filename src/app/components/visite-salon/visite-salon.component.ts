import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { takeUntil } from 'rxjs/operators';
// declare const fbq: any;

@Component({
  selector: 'app-visite-salon',
  templateUrl: './visite-salon.component.html',
  styleUrls: ['./visite-salon.component.scss'],
})
export class VisiteSalonComponent implements OnInit, OnDestroy {
  unsubscribeAll: Subject<boolean>;
  errorMessage: string;
  successMessage: string;
  joinFormGroup: FormGroup;

  isSending: boolean = false;
  isConfChecked: boolean = false;
  isCoachingChecked: boolean= false;

  isLoadingHours: boolean = false;

  noDisplayHours: any[] = []

  projectsData = [
    "Travaux Rénovation, tout corps d'état",
    'Aménagement cuisine et salle de bains',
    'Isolation',
    'Energie & Chauffage',
    'Menuiserie : porte, fenêtre, escalier',
    'Toiture & Façade',
    'Sols',
    'Aménagement extérieur: terrasse, piscine, pergolas…',
    'Sécurité'
  ];

  conferenceData = [
    `Mercredi 12 mai, 12h : Rénovation énergétique, par où commencer ?`,
    `Jeudi 13 mai, 11h : Bien déchiffrer un devis`,
    `Vendredi 14 mai, 11h : Aménager un extérieur pratique et multifonctions`,
    `Samedi 15 mai, 11h : Changer sa chaudière, ce qu’il faut savoir`,
    `Dimanche 16 mai, 11h : Déco&aménagement : les clés pour optimiser l’espace`,
  ]

  coachingDataHours = [
    '10h - 10h30',
    '10h30 - 11h',
    '11h - 11h30',
    '11h30 - 12h',
    '15h - 15h30',
    '15h30 - 16h',
    '16h - 16h30',
    '16h30 - 17h',
  ]

  coachingDataDates = [
      'Mer. 12 mai',
      'Jeu. 13 mai',
      'Ven. 14 mai',
      'Sam. 15 mai',
      'Dim. 16 mai',
      'Lun. 17 mai',
      'Mar. 18 mai',
      'Mer. 19 mai',
      'Jeu. 20 mai',
      'Ven. 21 mai'
  ];

  coachings: {coachingDate: string, coachingHour: string}[] = [];
  disabledArrayValue: {coachingDate: string, coachingHour: string}[] = [
    // {coachingDate: 'Dim. 09 mai', coachingHour: '10h30 - 11h'}
  ]


  constructor(private service: AuthService) {
    this.unsubscribeAll = new Subject();

    this.joinFormGroup = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', []),
      postalCode: new FormControl('', [Validators.required]),
      conferences: new FormArray([]),
      projects: new FormArray([]),
    });

    this.addProjects();
    this.addConference();
  }

  ngOnInit(): void {
    this.getCoachings();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  get projectsFormArray() {
    return this.joinFormGroup.controls.projects as FormArray;
  }

  get conferenceFormArray() {
    return this.joinFormGroup.controls.conferences as FormArray;
  }




  private addProjects() {
    this.projectsData.forEach(() =>
      this.projectsFormArray.push(new FormControl(false))
    );
  }

  private addConference() {
    this.conferenceData.forEach(() => {
      this.conferenceFormArray.push(new FormControl(false))
    })
  }

  // private addCoaching() {
  //   this.coachingData.forEach(() => {
  //     this.coachingFormArray.push(new FormControl(false))
  //   })
  // }

  checkError(controlName: string, errorName: string) {
    return (
      this.joinFormGroup.controls[controlName].hasError(errorName) &&
      this.joinFormGroup.controls[controlName].touched
    );
  }

  checkConf() {
    return !this.isConfChecked
  }

  checkCoaching() {
    return !this.isCoachingChecked
  }

  flattenCoachingArray(array: any[]) {
    let result = []
    if (array.length <= 0) {
      return result
    }

    array.forEach(element => {
      result.push(element.coachings.coachingHour)
    });

    return result
  }

  getCoachings() {
    this.service.getCoachings().subscribe((result: any) => {

      // console.log("coaching res", result)
      if(result && result.success) {
        this.disabledArrayValue = this.flattenData(result.data)
      }
    })
  }

  flattenData(array:any[]) {
    let result = []
    if( array.length <= 0) {
      return result
    }
    array.forEach(element => {
      element.coachings.forEach(coaching => {
        result.push(coaching)
      });
    });

    return result;
  }

  // filterArrays(fromArray:any[], toArray:any[]) {
  //   if(toArray.length <= 0) {
  //     return fromArray
  //   }

  //   let result = fromArray.filter(element => {
  //     console.log(element)
  //    return	!toArray.includes(element)
  //   })

  //   return result
  // }


  // onHoureChange(hour) {
  //   this.joinFormGroup.value.coachings.coachingHour = hour
  // }

  // onDateChange(date) {
  //   this.getCoachings(date);
  // }
  onSubmit() {
    if (this.joinFormGroup.invalid) {
      this.errorMessage = "Veuillez remplir correctement tous les champs obligatoires";
      setTimeout(() => {
        this.errorMessage = "";
      }, 3000);

      return;
    }

    this.joinFormGroup.value.projects = this.joinFormGroup.value.projects
      .map((value, index) => (value ? this.projectsData[index] : null))
      .filter((value) => value !== null);

    if (this.isConfChecked) {
      this.joinFormGroup.value.conferences = this.joinFormGroup.value.conferences
        .map((value, index) => (value ? this.conferenceData[index] : null))
        .filter((value) => value !== null);
    } else {
      this.joinFormGroup.value.conferences = [];
    }

    // if (!this.isCoachingChecked) {
    //   this.joinFormGroup.value.coachings = {
    //     coachingDate: '',
    //     coachingHour: ''
    //   }
    // }



    console.log("values", this.joinFormGroup.value);
    const data = Object.assign(this.joinFormGroup.value)
    console.log("data", data);



     let firstName =this.joinFormGroup.get('firstName').value;
     let lastName = this.joinFormGroup.get('lastName').value;
     let email = this.joinFormGroup.get('email').value;
     let phoneNumber = this.joinFormGroup.get('phoneNumber').value;
     let postalCode= this.joinFormGroup.get('postalCode').value;
     let conferences= this.joinFormGroup.value.conferences
     let projects = this.joinFormGroup.value.projects;

    const body = {
      firstName,
      lastName,
      email,
      phoneNumber,
      postalCode,
      conferences,
      projects,
      coachings: this.coachings
    }


    console.log("body", body)
    //TODO: Uncomment before push
    // fbq('trackCustom', 'visit_salon', body);

    this.isSending = true;
    this.service
      .join(body)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((result) => {
        if(result && result.success) {
          this.isSending = false;
          this.successMessage = result.message;
          this.joinFormGroup.reset();
          setTimeout(() => {
            this.successMessage = ""
          }, 4000);
        }
      }, err => {
        this.isSending = false;
        this.errorMessage = err.error.error
        setTimeout(() => {
          this.errorMessage = ""
        }, 4000);
      });
  }
}
