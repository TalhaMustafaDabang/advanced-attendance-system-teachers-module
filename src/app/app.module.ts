import { HomePage } from './home/home.page';
import { routes } from './routes';
import { environment } from './../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatabaseServiceService } from './services/database-service.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { ManualAttendanceComponent } from './manual-attendance/manual-attendance.component';
import { ImageAttendanceComponent } from './image-attendance/image-attendance.component';


import { AngularFireModule, FirebaseAuth } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LandingComponent } from './landing/landing.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { StorageAzureServiceService } from './services/storage-azure-service.service';




@NgModule({
  declarations: [AppComponent,HomePage,LoginComponent, ManualAttendanceComponent, ImageAttendanceComponent, LandingComponent, AttendanceComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot(routes),
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    ReactiveFormsModule,
    AngularFirestoreModule,

    
  ],
  providers: [
    StorageAzureServiceService,
    DatabaseServiceService,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
