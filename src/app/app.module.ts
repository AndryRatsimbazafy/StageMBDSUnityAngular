import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UnityComponent} from './components/unity/unity.component';
import {HomeComponent} from './components/home/home.component';
import {SalonComponent} from './components/salon/salon.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ModalVideoComponent} from './components/modals/modal-video/modal-video.component';
import {ModalPdfComponent} from './components/modals/modal-pdf/modal-pdf.component';
import {LoadDataProgressSpinnerComponent} from './components/load-data-progress-spinner/load-data-progress-spinner.component';
import {HttpClientModule} from "@angular/common/http";

import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';

import {IndexComponent} from './components/index/index.component';
import {ModalIndexComponent} from './components/modals/modal-index/modal-index.component';
import {ModalGalleryComponent} from './components/modals/modal-gallery/modal-gallery.component';
import {MatListModule} from '@angular/material/list';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {GalleriaModule} from 'primeng/galleria';
import {ModalLogoutComponent} from './components/modals/modal-logout/modal-logout.component';
import {ModalHelpComponent} from './components/modals/modal-help/modal-help.component';

import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {ModalChatComponent} from './components/modals/modal-chat/modal-chat.component';
import {ChatPanelComponent} from './components/modals/modal-chat/chat-panel/chat-panel.component';
import {ChatPanelInfoComponent} from './components/modals/modal-chat/chat-panel-info/chat-panel-info.component';
import {ChatUserComponent} from './components/modals/modal-chat/chat-user/chat-user.component';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';

import {environment} from 'src/environments/environment';
import {AvatarModule} from 'ngx-avatar';
import {ChatPanelSendComponent} from './components/modals/modal-chat/chat-panel-send/chat-panel-send.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';

import {MatInputModule} from '@angular/material/input';

import {PickerModule} from '@ctrl/ngx-emoji-mart';
import {MediaChatModule} from './components/modals/modal-chat/media-chat/media-chat.module';
import {StoreModule} from '@ngrx/store';
import {ModalHallComponent} from './components/modals/modal-hall/modal-hall.component';
import {ModalAllMediaComponent} from './components/modals/modal-all-media/modal-all-media.component';
import {DataService} from './services/data.service';
import {ModalAllVideoComponent} from './components/modals/modal-all-video/modal-all-video.component';
import {ModalChoixSceneComponent} from './components/modals/modal-choix-scene/modal-choix-scene.component';
import {PreviewCardComponent} from './shared/preview-card/preview-card.component';
import {CrystalLightboxModule} from '@crystalui/angular-lightbox';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {ModalEmailComponent} from './components/modals/modal-email/modal-email.component';
import {NotificationComponent} from './components/notification/notification.component';
import {ModalCommericalComponent} from './components/modals/modal-commerical/modal-commerical.component';
import {ModalChoixConferenceComponent} from './components/modals/modal-choix-conference/modal-choix-conference.component';
import {TimerComponent} from "./components/timer/timer.component";
import { ModalEngieComponent } from './components/modals/modal-engie/modal-engie.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ModalHallEngieComponent } from './components/modals/modal-hall-engie/modal-hall-engie.component';
import { TobuildComponent } from 'src/app/tobuild/tobuild.component';
import { ConferenceRedifComponent } from './conference-redif/conference-redif.component';
import { ModalRediffConferenceComponent } from './components/modals/modal-rediff-conference/modal-rediff-conference.component';
import { AngularEditorModule } from '@kolkov/angular-editor';


import { UnityService } from './services/unity.service';
import { ModalZoomComponent } from './components/modals/modal-zoom/modal-zoom.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// socket io config

const config: SocketIoConfig = {url: environment.CHAT_SERVER_URL, options: {autoConnect: false}}

const ChatModalComponents = [
  ChatPanelComponent,
  ChatPanelInfoComponent,
  ChatUserComponent,
  ChatPanelSendComponent
]

const MaterialModules = [
  MatFormFieldModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
  MatTabsModule,
  MatToolbarModule,
  MatExpansionModule,
  MatListModule,
  MatInputModule,
  MatIconModule,
  MatTabsModule,
  MatTooltipModule,
  MatSnackBarModule
]

@NgModule({
  declarations: [
    AppComponent,
    UnityComponent,
    HomeComponent,
    SalonComponent,
    ModalVideoComponent,
    ModalPdfComponent,
    LoadDataProgressSpinnerComponent,
    IndexComponent,
    ModalIndexComponent,
    ModalGalleryComponent,
    ModalLogoutComponent,
    ModalHelpComponent,
    ModalChatComponent,
    ...ChatModalComponents,
    ModalHallComponent,
    ModalAllMediaComponent,
    ModalAllVideoComponent,
    ModalChoixSceneComponent,
    PreviewCardComponent,
    ModalEmailComponent,
    NotificationComponent,
    ModalCommericalComponent,
    ModalChoixConferenceComponent,
    TimerComponent,
    ModalEngieComponent,
    ResetPasswordComponent,
    ModalHallEngieComponent,
    TobuildComponent,
    ConferenceRedifComponent,
    ModalRediffConferenceComponent,
    ModalZoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ...MaterialModules,
    HttpClientModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    NgbModule,
    GalleriaModule,
    SocketIoModule.forRoot(config),
    FormsModule,
    ReactiveFormsModule,
    AvatarModule,
    PickerModule,
    StoreModule.forRoot({}),
    MediaChatModule,
    NgxSkeletonLoaderModule,
    CrystalLightboxModule,
    AngularEditorModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    DataService,
    UnityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
