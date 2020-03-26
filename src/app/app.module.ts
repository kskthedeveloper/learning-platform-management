import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NbThemeModule, NbLayoutModule, NbSidebarModule, NbCardModule, NbMenuModule, NbIconModule, NbButtonModule} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ExerciseListComponent } from './component/exercise-list/exercise-list.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFirestore} from '@angular/fire/firestore';
import { ExerciseMenuComponent } from './component/exercise-menu/exercise-menu.component';
import { NewExerciseComponent } from './component/new-exercise/new-exercise.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ExerciseComponent } from './component/exercise/exercise.component';

@NgModule({
  declarations: [
    AppComponent,
    ExerciseListComponent,
    ExerciseMenuComponent,
    NewExerciseComponent,
    ExerciseComponent
  ],
  imports: [
    NbMenuModule.forRoot(),
    NbEvaIconsModule,
    NbButtonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({name: 'default'}),
    NbLayoutModule,
    NbEvaIconsModule,
    NbSidebarModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    NbCardModule,
    NbMenuModule,
    FormsModule, ReactiveFormsModule, NbIconModule, NbButtonModule
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
